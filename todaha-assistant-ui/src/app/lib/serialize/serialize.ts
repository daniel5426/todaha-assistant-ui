import { IChat } from "@/types/apps/chat";
import avatar2Img from "@/assets/images/avatars/2.png";
import avatar3Img from "@/assets/images/avatars/3.png";
import avatar4Img from "@/assets/images/avatars/4.png";
import avatar5Img from "@/assets/images/avatars/5.png";
import avatar6Img from "@/assets/images/avatars/6.png";
import avatar7Img from "@/assets/images/avatars/7.png";
import avatar8Img from "@/assets/images/avatars/8.png";
import userImg from "@/assets/images/avatars/user.png";
import DateUtil2 from "../../../helpers/utils/date";
import { DateTime } from "luxon";
import { DashboardChartStats, ServerStat } from "./server-models";
import {
    CounterCard,
    IDashboardMessage,
    IGraphDuration,
    IGraphStat,
    IGraphStatSeries,
} from "@/types/dashboards/chat_statistics";
import DateUtil from "../../../helpers/utils/date";
import eraserIcon from "@iconify/icons-lucide/eraser";
import packageIcon from "@iconify/icons-lucide/package";
import usersIcon from "@iconify/icons-lucide/users";
import { IconifyIcon } from "@iconify/react/dist/iconify.js";

const imageUrls = [userImg.src];

export function transformChatsToIChat(chats: any[], page: number): IChat[] {
    return chats.map((chat, index) => {
        const messages = chat.data.reverse().map((message: any) => ({
            message: message.content[0].text.value,
            send_at: new Date(message.created_at * 1000),
            from_me: message.role === "assistant",
        }));

        // Choose a random image URL from the array
        const randomImageUrl =
            imageUrls[Math.floor(Math.random() * imageUrls.length)];

        return {
            id: index,
            image: randomImageUrl, // Assign a random image URL
            name: "Client " + (index + 1 + (page - 1) * 10),
            messages,
            unreads: 0,
        };
    });
}

export function chatsToQuickChat(chats: any[]): IDashboardMessage[] {
    return chats
        .map((chat, index) => {
            let lastQ = "";
            let date = new Date(0); // Start with a very old date to compare
            let lastMsgTime = 0;

            // Find the most recent message from the user
            for (const msg of chat.data) {
                if (msg.role !== "assistant" && msg.created_at > lastMsgTime) {
                    lastQ = msg.content[0].text.value;
                    date = new Date(msg.created_at * 1000);
                    lastMsgTime = msg.created_at;
                }
            }

            // Return the mapped object
            return {
                message: lastQ,
                date: date,
                image: userImg,
            };
        })
        .sort((a, b) => {
            // Compare dates by their timestamp in milliseconds (most recent first)
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
}

export function processStatistics(
    data: ServerStat[]
): [DashboardChartStats[], DashboardChartStats[], DashboardChartStats[], number] {
    const today = new Date();
    const todayString = today.toISOString().slice(0, 10); // Get today's date in "YYYY-MM-DD" format
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    // Initialize arrays for storing stats by hour, day, and month
    const todayStats: DashboardChartStats[] = Array.from({ length: 24 }, () => ({
        thread_count: 0,
        client_message_count: 0,
    }));
    const last30DaysStats: DashboardChartStats[] = Array.from(
        { length: 30 },
        () => ({ thread_count: 0, client_message_count: 0 })
    );
    const last3MonthsStats: DashboardChartStats[] = Array.from(
        { length: 5 },
        () => ({ thread_count: 0, client_message_count: 0 })
    );
    var tokenThisMonth = 0;

    // Process each entry in the statistics data
    data.forEach((entry) => {
        const [datePart, hourPart] = entry.date.split(" "); // Split into date and hour parts
        const [year, month, day] = datePart.split("-").map(Number); // Parse year, month, day
        const hour = parseInt(hourPart); // Parse hour

        const entryDateTime = new Date(year, month - 1, day, hour); // Create a Date object
        const entryDate = datePart; // Extract the date part only


        if (entryDateTime >= firstDayOfMonth && entryDateTime <= today) {
            tokenThisMonth += entry.token_count || 0;
        }

        if (
            entry.thread_count !== undefined &&
            entry.client_message_count !== undefined
        ) {
            const threadCount = entry.thread_count;
            const messageCount = entry.client_message_count;

            // Check if the entry is today
            if (entryDate === todayString) {
                const hourOfDay = parseInt(entry.date.split(" ")[1]); // Extract the hour part
                todayStats[hourOfDay].thread_count += threadCount;
                todayStats[hourOfDay].client_message_count += messageCount;
            }

            // Check if the entry is within the last 30 days
            const diffDays = Math.floor(
                (today.getTime() - entryDateTime.getTime()) / (1000 * 3600 * 24)
            );
            if (diffDays >= 0 && diffDays < 30) {
                last30DaysStats[diffDays].thread_count += threadCount;
                last30DaysStats[diffDays].client_message_count += messageCount;
            }

            // Check if the entry is within the last 3 months
            const diffMonths =
                (today.getFullYear() - entryDateTime.getFullYear()) * 12 +
                (today.getMonth() - entryDateTime.getMonth());
            if (diffMonths >= 0 && diffMonths < 5) {
                last3MonthsStats[diffMonths].thread_count += threadCount;
                last3MonthsStats[diffMonths].client_message_count += messageCount;
            }
        }
    });

    return [todayStats, last30DaysStats, last3MonthsStats, tokenThisMonth];
}

export function hourlyStats(
    stats: DashboardChartStats[],
    dayly_stats: IGraphStatSeries[]
): IGraphStat {
    const hourly_stats = stats.map((stat, index) => {
        const today = new Date();

        // Get the timezone offset in minutes and convert it to milliseconds
        const timezoneOffset = today.getTimezoneOffset() * 60 * 1000;

        // Get the current time in UTC by subtracting the timezone offset
        const utcTime = today.getTime() + timezoneOffset;

        // Create a new Date object for the user's local time
        const userTime = new Date(utcTime);

        // Set the time to midnight for the user's timezone
        const today_midnight = new Date(
            userTime.getFullYear(),
            userTime.getMonth(),
            userTime.getDate(),
            0,
            0,
            0,
            0
        );

        return {
            date: DateUtil.minusHours(-index, today_midnight),
            value1: stat.thread_count || 0,
            value2: stat.client_message_count || 0,
        };
    });

    const totalMessages = hourly_stats.reduce(
        (sum, stat) => sum + stat.value2,
        0
    );
    const totalThread = hourly_stats.reduce((sum, stat) => sum + stat.value1, 0);

    const today_index = dayly_stats.length - 1;
    var today_message = dayly_stats[today_index].value2;
    var yesterday_message = dayly_stats[today_index - 1].value2;
    var messagePercent = 34;
    if (yesterday_message < today_message) {
        yesterday_message = yesterday_message === 0 ? 1 : yesterday_message;

        messagePercent = (today_message / yesterday_message - 1) * 100;
    } else if (yesterday_message > today_message) {
        today_message = today_message === 0 ? 1 : today_message;
        messagePercent = -(yesterday_message / today_message - 1) * 100;
    } else {
        messagePercent = 100;
    }
    var today_t = dayly_stats[today_index].value1;
    var yesterday_t = dayly_stats[today_index - 1].value1;
    var threadPercent = 34;
    if (yesterday_t < today_t) {
        yesterday_t = yesterday_t === 0 ? 1 : yesterday_t;

        threadPercent = (today_t / yesterday_t - 1) * 100;
    } else if (yesterday_t > today_t) {
        today_t = today_t === 0 ? 1 : today_t;
        threadPercent = -(yesterday_t / today_t - 1) * 100;
    } else {
        threadPercent = 0;
    }

    return {
        total1: totalThread,
        total2: totalMessages,
        change1: today_t - yesterday_t,
        change2: today_message - yesterday_message,
        percent1: threadPercent,
        percent2: messagePercent,
        series: hourly_stats,
    };
}

export function daylyStats(dayly_stats: IGraphStatSeries[]): IGraphStat {
    const currentStats = dayly_stats.slice(0, 10);
    const lastStats = dayly_stats.slice(10, 20);

    const totalMessages = currentStats.reduce(
        (sum, stat) => sum + stat.value2,
        0
    );
    const lastTotalMessages = lastStats.reduce(
        (sum, stat) => sum + stat.value2 || 0,
        0
    );
    const totalThread = currentStats.reduce((sum, stat) => sum + stat.value1, 0);
    const lastTotalThread = lastStats.reduce(
        (sum, stat) => sum + stat.value1 || 0,
        0
    );
    let messagePercent =
        lastTotalMessages !== 0
            ? (totalMessages / lastTotalMessages) * 100
            : totalMessages !== 0
                ? 100
                : 0;
    let threadPercent =
        lastTotalThread !== 0
            ? (totalThread / lastTotalThread) * 100
            : totalThread !== 0
                ? 100
                : 0;

    if (lastTotalMessages > totalMessages) {
        messagePercent = messagePercent;
    }
    if (lastTotalThread > totalThread) {
        threadPercent = threadPercent;
    }
    return {
        total1: totalThread,
        total2: totalMessages,
        change1: totalThread - lastTotalThread,
        change2: totalMessages - lastTotalMessages,
        percent1: threadPercent,
        percent2: messagePercent,
        series: currentStats.reverse(),
    };
}

export function last30daysStats(dayly_stats: IGraphStatSeries[]): IGraphStat {
    const currentStats = dayly_stats;

    const totalMessages = currentStats.reduce(
        (sum, stat) => sum + stat.value2,
        0
    );

    const totalThread = currentStats.reduce((sum, stat) => sum + stat.value1, 0);

    return {
        total1: totalThread,
        total2: totalMessages,
        change1: 0,
        change2: 0,
        percent1: 0,
        percent2: 0,
        series: currentStats.reverse(),
    };
}


export function monthlyStats(stats: DashboardChartStats[]): IGraphStat {
    const month_stats = stats.reverse().map((stat, index) => {
        return {
            date: DateUtil.minusMonths(stats.length - index - 1),
            value1: stat.thread_count || 0,
            value2: stat.client_message_count || 0,
        };
    });

    const totalMessages = month_stats.reduce((sum, stat) => sum + stat.value2, 0);
    const totalThread = month_stats.reduce((sum, stat) => sum + stat.value1, 0);

    const last7DaysThreadCount = month_stats
        .slice(-7)
        .reduce((sum, stat) => sum + stat.value1, 0);
    const previous7DaysThreadCount = month_stats
        .slice(-14, -7)
        .reduce((sum, stat) => sum + stat.value1, 0);

    const threadPercent =
        previous7DaysThreadCount === 0
            ? last7DaysThreadCount > 0
                ? 100
                : 0
            : ((last7DaysThreadCount - previous7DaysThreadCount) /
                previous7DaysThreadCount) *
            100;

    // Assuming a similar calculation is needed for messagePercent
    const last7DaysMessageCount = month_stats
        .slice(-7)
        .reduce((sum, stat) => sum + stat.value2, 0);
    const previous7DaysMessageCount = month_stats
        .slice(-14, -7)
        .reduce((sum, stat) => sum + stat.value2, 0);

    const messagePercent =
        previous7DaysMessageCount === 0
            ? last7DaysMessageCount > 0
                ? 100
                : 0
            : ((last7DaysMessageCount - previous7DaysMessageCount) /
                previous7DaysMessageCount) *
            100;

    return {
        total1: totalThread,
        total2: totalMessages,
        change1: last7DaysThreadCount - previous7DaysThreadCount,
        change2: last7DaysMessageCount - previous7DaysMessageCount,
        percent1: threadPercent,
        percent2: messagePercent,
        series: month_stats,
    };
}

export function statsToChartData(stats: ServerStat[]): any {
    const [todayStats, last30DaysStats, last3MonthsStats, tokenThisMonth] =
        processStatistics(stats);

    const dayly_stats = last30DaysStats.map((stat, index) => {
        return {
            date: DateUtil.minusDays(index),
            value1: stat.thread_count || 0,
            value2: stat.client_message_count || 0,
        };
    });

    // Process the data to calculate hourly, daily, monthly, and yearly stats
    const dailyData = daylyStats(dayly_stats);
    const hourlyData = hourlyStats(todayStats, dailyData.series);
    const monthlyData = monthlyStats(last3MonthsStats);
    const monthly_thread = last30daysStats(dayly_stats);

    // Construct the final result
    const result: Record<IGraphDuration, IGraphStat> = {
        hour: hourlyData,
        day: dailyData,
        month: monthlyData,
    };

    return [result, monthly_thread, tokenThisMonth];
}

export function StatsToCounterData(
    stats: Record<IGraphDuration, IGraphStat>
): CounterCard[] {
    const threadsTodayCounter = {
        icon: usersIcon,
        amount: stats.day.total1,
        title: "Clients helped this week",
        changes: Number(stats.day.percent1.toFixed(1)),
        changesAmount: Number(stats.day.change1.toFixed(1)),
        inMoney: false,
        subTitle: "than past week",
    };
    const thisMonth = stats.month.series.length - 1;
    const messagesThisMonthCounter = {
        icon: packageIcon,
        amount: stats.month.series[thisMonth].value2,
        title: "AI Messages this month",
        changes: Number(
            (stats.month.series[thisMonth - 1].value2 !== 0
                ? (stats.month.series[thisMonth].value2 /
                    stats.month.series[thisMonth - 1].value2) *
                100
                : stats.month.series[thisMonth].value2 !== 0
                    ? 100
                    : 0
            ).toFixed(1)
        ),
        changesAmount:
            stats.month.series[thisMonth].value2 -
            stats.month.series[thisMonth - 1].value2,
        inMoney: false,
        subTitle: "than past month",
    };
    return [threadsTodayCounter, messagesThisMonthCounter];
}

export function StatsToCounterData2(
    stats: Record<IGraphDuration, IGraphStat>
): CounterCard[] {
    const threadsTodayCounter = {
        icon: usersIcon,
        amount: stats.day.total1,
        title: "Clients helped this week",
        changes: Number(stats.day.percent1.toFixed(1)),
        changesAmount: Number(stats.day.change1.toFixed(1)),
        inMoney: false,
        subTitle: "than past week",
    };

    const thisMonth = stats.month.series.length - 1;
    const messagesThisMonthCounter = {
        icon: packageIcon,
        amount: stats.month.series[thisMonth].value2,
        title: "AI Messages this month",
        changes: Number(
            (stats.month.series[thisMonth - 1].value2 !== 0
                ? (stats.month.series[thisMonth].value2 /
                    stats.month.series[thisMonth - 1].value2) *
                100
                : stats.month.series[thisMonth].value2 !== 0
                    ? 100
                    : 0
            ).toFixed(1)
        ),
        changesAmount:
            stats.month.series[thisMonth].value2 -
            stats.month.series[thisMonth - 1].value2,
        inMoney: false,
        subTitle: "than past month",
    };
    return [
        threadsTodayCounter,
        messagesThisMonthCounter,
    ];
}
