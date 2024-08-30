export const dateFilter = (unixTimestamp: number): string => {
    const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    };
    return new Date(unixTimestamp).toLocaleDateString('en-GB', options);
}