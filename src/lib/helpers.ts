import { WeekdayEntryGraphProps } from "./interfaces";

export function chunkArray<T>(array: T[], size: number): T[][] {
    const result: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
}

export function getDayOfWeek(date: string){
  const day = new Date(date).getDay();
  return day;
}

export function sortByDayOfWeek(weekdayEntries: any){
  const dayOrder = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  weekdayEntries.sort((a: { dayOfWeek: string; }, b: { dayOfWeek: string; }) => {
      return dayOrder.indexOf(a.dayOfWeek) - dayOrder.indexOf(b.dayOfWeek);
  });

}

export function sortByEntriesCount(weekdayEntries: any) {
  weekdayEntries.sort((a: { entryCount: number; }, b: { entryCount: number; }) => {
    return b.entryCount - a.entryCount;
  });
}



