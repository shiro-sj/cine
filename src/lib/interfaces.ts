export interface ActivityGridProps{
    avatarSrc: string
    username: string | null
}

export interface GenrePieChartProps {
    topGenres: Genre[]
}

export interface WeekdayEntryGraphProps {
    weekdayEntries: WeekdayEntry[]
}

export type Genre = {
    genreId: number,
    type: string,
    name: string,
    count: number,
}

export type WeekdayEntry = {
    dayOfWeek: string,
    count: number,
}

export type recentEntries = {
    tmdbId: number,
    title: string,
    date: Date,
    type: string,
    poster: string,
    backdrop: string,
}

export interface RecentMainProps {
    recentEntries:recentEntries[]
}

export type Friend = {
    id: number,
    username: string,
    imageUrl: string
}

export interface FriendsBarProps {
    friends: Friend[]
}

export interface User {
    bio: string,
    createdAt: Date,
    email: string,
    id: number,
    imageUrl: string,
    username: string,
}

export interface FriendsProfileProps {
    username: string
}




