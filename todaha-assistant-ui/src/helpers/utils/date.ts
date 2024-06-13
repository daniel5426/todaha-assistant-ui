"use client";
import dayjs from "dayjs";
import { DateTime } from 'luxon';

type KnownFormats = "DD MM" | "DD MM YYYY" | "DD MMM" | "MMM YYYY";

type IDateProps = {
    onlyDate?: boolean;
    format?: KnownFormats | string;
};

const defaultProps: IDateProps = { onlyDate: true };

class DateUtil2 {
    static minusHours(hours: number): Date {
        return DateTime.now().minus({ hours }).toJSDate();
    }

    static minusDays(days: number): Date {
        return DateTime.now().minus({ days }).toJSDate();
    }

    static minusMonths(months: number): Date {
        return DateTime.now().minus({ months }).toJSDate();
    }

    static minusYears(years: number): Date {
        return DateTime.now().minus({ years }).toJSDate();
    }
}


const formatted = (date: Date, props: IDateProps = defaultProps) => {
    let format = "";
    if (props.format) {
        format = props.format;
    } else {
        if (props.onlyDate) format += "DD MMM YYYY";
    }

    return dayjs(date).format(format);
};

const minusMinutes = (minutes: number = 1, date: Date = new Date()): Date => {
    return addMinutes(-minutes, date);
};

const addMinutes = (minutes: number = 1, date: Date = new Date()): Date => {
    const d = date;
    d.setMinutes(date.getMinutes() + minutes);
    return d;
};

const minusHours = (hours: number = 1, date: Date = new Date()): Date => {
    return addHours(-hours, date);
};

const addHours = (hours: number = 1, date: Date = new Date()): Date => {
    const d = new Date(date);
    d.setHours(date.getHours() + hours);
    return d;
};

const minusDays = (days: number = 1, date: Date = new Date()): Date => {
    return addDays(-days, date);
};

const addDays = (days: number = 1, date: Date = new Date()): Date => {
    const d = date;
    d.setDate(date.getDate() + days);
    return d;
};
const minusMonths = (month: number = 1, date: Date = new Date()): Date => {
    return addMonths(-month, date);
};

const addMonths = (month: number = 1, date: Date = new Date()): Date => {
    const d = date;
    d.setMonth(date.getMonth() + month);
    return d;
};

const minusYears = (year: number = 1, date: Date = new Date()): Date => {
    return addYears(-year, date);
};

const addYears = (year: number = 1, date: Date = new Date()): Date => {
    const d = date;
    d.setFullYear(date.getFullYear() + year);
    return d;
};

const DateUtil = {
    formatted,
    minusDays,
    addDays,
    addMonths,
    minusMonths,
    minusYears,
    addYears,
    addMinutes,
    minusMinutes,
    minusHours,
};
export default DateUtil;
