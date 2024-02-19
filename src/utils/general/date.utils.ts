import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import dayOfYear from 'dayjs/plugin/dayOfYear'
import isBetween from 'dayjs/plugin/isBetween'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

dayjs.extend(dayOfYear)
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)
dayjs.extend(isBetween)

enum TIMEZONES {
  INDIA = 'Asia/Kolkata',
}

export class DateUtils {
  public static getIndianDate(date: Date | number | string = new Date()) {
    return dayjs.tz(date, TIMEZONES.INDIA)
  }

  public static convertToAMPM(hour: number): string {
    if (hour < 12) {
      return `${hour} AM`
    }
    return `${hour} PM`
  }

  public static isToday(date: Dayjs): boolean {
    const today = this.getIndianDate()
    return date.isSame(today, 'day')
  }

  public static isTomorrow(date: Dayjs): boolean {
    const today = this.getIndianDate()
    return date.isAfter(today, 'day') && date.isSame(today.add(1, 'day'), 'day')
  }

  public static isBetweenBothDates(currentDate: Dayjs, startDate: Dayjs, endDate: Dayjs): boolean {
    return currentDate.isBetween(startDate, endDate, null, '[]')
  }

  public static isAfterBothDates(currentDate: Dayjs, startDate: Dayjs, endDate: Dayjs): boolean {
    return currentDate.isAfter(startDate) && currentDate.isAfter(endDate)
  }

  public static isBeforeBothDates(currentDate: Dayjs, startDate: Dayjs, endDate: Dayjs): boolean {
    return currentDate.isBefore(startDate) && currentDate.isBefore(endDate)
  }

  public static toWeekDay(dayInWeek: number): string {
    switch (dayInWeek) {
      case 0:
        return 'Sunday'
      case 1:
        return 'Monday'
      case 2:
        return 'Tuesday'
      case 3:
        return 'Wednesday'
      case 4:
        return 'Thursday'
      case 5:
        return 'Friday'
      case 6:
        return 'Saturday'
      default:
        return 'Sunday'
    }
  }
}
