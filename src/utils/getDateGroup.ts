import { differenceInCalendarYears, format, isThisMonth, isThisWeek, isThisYear, isToday, isYesterday } from 'date-fns';

export const getGroupByDateTitle = (date: string): string => {
  const now = new Date();

  switch (true) {
    case isToday(date):
      return 'Today';
    case isYesterday(date):
      return 'Yesterday';
    case isThisWeek(date):
      return 'This Week';
    case isThisMonth(date):
      return 'This Month';
    case isThisYear(date):
      return format(date, 'LLLL');
    case differenceInCalendarYears(now, date) === 1:
      return 'Last year';
    default:
      return ` ${format(date, 'yyyy')}`;
  }
};

export const getDateTitle = (date: string): string => {
  switch (true) {
    case isToday(date):
      return format(date, 'HH:mm');
    case isThisYear(date):
      return format(date, 'MMM d');
    default:
      return ` ${format(date, 'MMM d yyyy')}`;
  }
};
