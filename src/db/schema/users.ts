import {pgTable,
        serial,
        text, 
        varchar, 
        vector,
        integer, 
        date, 
        timestamp,
        primaryKey,
        decimal,
        boolean,
        } 
from "drizzle-orm/pg-core";

import { relations } from "drizzle-orm";

export const users = pgTable("users",{
    id: serial().primaryKey(), //This will be the external id from clerk ex: '53447' => user.external_id
    clerkId: varchar({length: 256}).unique(),
    username: varchar().unique(), //This will be pulled from clerk => user.username
    email: text().unique(), //This will be pulled from clerk => user.email_addresses[0].email[0]
    bio: text(),
    imageUrl: text(), //This will be pulled from clerk user.image_url
    createdAt: date({ mode: "date" }),
    updatedAt: date({ mode: "date"}),
    embedding: vector('embedding', {dimensions:1536}), //This will be from a called function
})


export const usersRelations = relations(users, ({many})=>({
    entries: many(entries),
}))

export const friendsOfUser = pgTable("friendsOfUser", {
    id: serial().unique(),
    senderId: integer('senderId').notNull().references(()=>users.id),
    senderImage: varchar({length:256}),
    senderUsername: varchar({length: 256}),
    receiverId: integer('receiverId').notNull().references(()=>users.id),
    status: varchar({length: 256}),
}, (t)=>({
    pk: primaryKey({columns: [t.senderId, t.receiverId]})
}))

export const friendsOfUserRelations = relations(friendsOfUser, ({one})=>({
    sender: one(users, {
        fields: [friendsOfUser.senderId],
        references: [users.id]
    }),
    receiver: one(users, {
        fields: [friendsOfUser.receiverId],
        references: [users.id]
    })
}))



export const entries = pgTable("entries", {
    id: serial().primaryKey(),
    tmdbId: integer(),
    title: varchar({length: 256}),  //from csv or from tmdb
    season: varchar({length:256}),
    episode: varchar({length: 256}),
    date: date({mode: "date"}).defaultNow(), 
    userId: integer().notNull().references(()=>users.id),
    genres: integer().array(), //populated from tmdb
    type: varchar({length: 256}),
    runtime: integer(),

    review: text(),
    rating: decimal(),
    seen: boolean(),
})

export const entriesRelations = relations(entries, ({one, many})=>({
    user: one(users, {
        fields: [entries.userId],
        references: [users.id],
    }),

    entriesOnGenre: many(entriesOnGenre),

}))

export const genres = pgTable("genres", {
    id: serial().primaryKey(),
    genreID: integer().notNull(),
    name: varchar({length: 256}),
    type: varchar({length: 256}),
})

export const genresRelations = relations(genres, ({many})=>({
    entriesOnGenre: many(entriesOnGenre)
}))

/************************JOIN TABLE******************************/

export const entriesOnGenre = pgTable('entries_genre', {
    id: serial().unique(),
    entryId: integer().notNull().references(()=> entries.id),
    genreId: integer().notNull().references(()=> genres.id),
    userId: integer().notNull().references(() => users.id),
    type: varchar({length: 256}),
    date: date({mode: "date"}).defaultNow(),
    
},
(t)=>({
    pk: primaryKey({columns: [t.entryId, t.genreId] }),
})
)

export const entriesOnGenreRelations = relations(entriesOnGenre, ({one})=>({
    entries: one(entries,{
        fields: [entriesOnGenre.entryId], 
        references: [entries.id]}),

    genres: one(genres, {
        fields: [entriesOnGenre.genreId],
        references: [genres.id],
    }),
}))

/************************END JOIN TABLE**************************/


//Store existing embeddings so we dont have to keep calling the openai api
export const embeddings = pgTable('embeddings',{
    id: serial().primaryKey(),
    tmdbId: integer().notNull().unique(),
    type: varchar({length: 256}),
    embedding: vector('embedding', {dimensions:1536}),
    createdAt: timestamp().defaultNow(),
})

