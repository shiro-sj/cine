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
    id: number,
    name: string,
    count: number,
}

export type WeekdayEntry = {
    dayOfWeek: string,
    count: number,
}

