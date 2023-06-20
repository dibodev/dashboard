export const parseUTCDate = (date: string): Date => {
    const [year, month, day] = date.split('-').map((d) => parseInt(d));
    return new Date(Date.UTC(year, month - 1, day));
}
