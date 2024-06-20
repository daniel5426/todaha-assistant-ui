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

const imageUrls = [
    userImg.src,
];

export function transformChatsToIChat(chats: any[], page: number): IChat[] {
    return chats.map((chat, index) => {
        console.log("chat", chat);
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
    return chats.map((chat, index) => {
        var lastQ = ""
        var date = new Date();
        for (const msg of chat.data) {
            if (msg.role !== "assistant")
            {
                lastQ = msg.content[0].text.value;
                date = new Date(msg.created_at * 1000);
                break;
            }
        }

        // Choose a random image URL from the array

        return {
            message: lastQ,
            date: date,
            image: userImg,
        };
    });
}


export function processStatistics(
    data: ServerStat[]
): [DashboardChartStats[], DashboardChartStats[], DashboardChartStats[]] {
    const today = new Date();
    const todayString = today.toISOString().slice(0, 10); // Get today's date in "YYYY-MM-DD" format

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

    // Process each entry in the statistics data
    data.forEach((entry) => {
        const [datePart, hourPart] = entry.date.split(" "); // Split into date and hour parts
        const [year, month, day] = datePart.split("-").map(Number); // Parse year, month, day
        const hour = parseInt(hourPart); // Parse hour

        const entryDateTime = new Date(year, month - 1, day, hour); // Create a Date object
        const entryDate = datePart; // Extract the date part only

        if (
            entry.thread_count !== undefined &&
            entry.client_message_count !== undefined
        ) {
            const threadCount = entry.thread_count;
            const messageCount = entry.client_message_count;
            console.log("entryDate", entryDate);

            // Check if the entry is today
            if (entryDate === todayString) {
                const hourOfDay = parseInt(entry.date.split(" ")[1]); // Extract the hour part
                todayStats[hourOfDay].thread_count += threadCount;
                todayStats[hourOfDay].client_message_count += messageCount;
            }

            // Check if the entry is within the last 7 days
            const diffDays = Math.floor(
                (today.getTime() - entryDateTime.getTime()) / (1000 * 3600 * 24)
            );
            console.log("diffDays", diffDays);
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

    return [todayStats, last30DaysStats, last3MonthsStats];
}

export function hourlyStats(
    stats: DashboardChartStats[],
    dayly_stats: IGraphStatSeries[]
): IGraphStat {
    console.log("stats", stats);
    const hourly_stats = stats.map((stat, index) => {
        const today = new Date();
        const today_midnight = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate(),
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
    console.log("today_t", today_t, "yesterday_t", yesterday_t)
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
    console.log("kkkkkkkk", threadPercent)

    return {
        total1: totalThread,
        total2: totalMessages,
        percent1: threadPercent,
        percent2: messagePercent,
        series: hourly_stats,
    };
}

export function daylyStats(stats: DashboardChartStats[]): IGraphStat {
    const dayly_stats = stats.reverse().map((stat, index) => {
        return {
            date: DateUtil.minusDays(stats.length - index - 1),
            value1: stat.thread_count || 0,
            value2: stat.client_message_count || 0,
        };
    });

    const totalMessages = dayly_stats.reduce((sum, stat) => sum + stat.value2, 0);
    const totalThread = dayly_stats.reduce((sum, stat) => sum + stat.value1, 0);
    const messagePercent =
        dayly_stats[dayly_stats.length - 2].value2 !== 0
            ? (dayly_stats[dayly_stats.length - 1].value2 / dayly_stats[dayly_stats.length - 2].value2) *
            100
            : dayly_stats[dayly_stats.length - 1].value2 !== 0 ? 100:0;
    const threadPercent =
        dayly_stats[dayly_stats.length - 2].value1 !== 0
            ? (dayly_stats[dayly_stats.length - 1].value1 / dayly_stats[dayly_stats.length - 2].value1) *
            100
            : dayly_stats[dayly_stats.length - 1].value1 !== 0 ? 100:0;

    return {
        total1: totalThread,
        total2: totalMessages,
        percent1: threadPercent,
        percent2: messagePercent,
        series: dayly_stats,
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
    const messagePercent =
        month_stats[0].value2 !== 0
            ? (month_stats[month_stats.length - 1].value2 / month_stats[month_stats.length - 2].value2) *
            100
            : month_stats[month_stats.length - 1].value2 !== 0 ? 100:0;
    const threadPercent =
        month_stats[0].value1 !== 0
            ? (month_stats[month_stats.length - 1].value1 / month_stats[month_stats.length - 2].value1) *
            100
            : month_stats[month_stats.length - 1].value1 !== 0 ? 100:0;

    console.log("month_stats", month_stats);

    return {
        total1: totalThread,
        total2: totalMessages,
        percent1: threadPercent,
        percent2: messagePercent,
        series: month_stats,
    };
}

export function statsToChartData(stats: ServerStat[]): any {
    const [todayStats, last30DaysStats, last3MonthsStats] =
        processStatistics(stats);
    console.log("last7DaysStats", last30DaysStats);

    // Process the data to calculate hourly, daily, monthly, and yearly stats
    const dailyData = daylyStats(last30DaysStats.slice(0, 7));
    const hourlyData = hourlyStats(todayStats, dailyData.series);
    const monthlyData = monthlyStats(last3MonthsStats);
    const monthly_thread = daylyStats(last30DaysStats);

    // Construct the final result
    const result: Record<IGraphDuration, IGraphStat> = {
        hour: hourlyData,
        day: dailyData,
        month: monthlyData,

    };

    return [result, monthly_thread];
}

export function StatsToCounterData(
    stats: Record<IGraphDuration, IGraphStat>
): CounterCard[] {
    const threadsTodayCounter = {
        icon: usersIcon,
        amount: stats.day.total1,
        title: "Clients helped this week",
        changes: stats.day.percent1,
        changesAmount: stats.day.percent1!==0?(stats.day.total1 * 100) / stats.day.percent1:0,
        inMoney: false,
        subTitle: "than past week",
    };
    const thisMonth = stats.month.series.length - 1;
    const messagesThisMonthCounter = {
        icon: packageIcon,
        amount: stats.month.series[thisMonth].value2,
        title: "AI Messages this month",
        changes:
        stats.month.series[thisMonth - 1].value2!==0?(stats.month.series[thisMonth].value2 * 100) /
            stats.month.series[thisMonth - 1].value2:(stats.month.series[thisMonth].value2!==0?100:0),
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
        changes: stats.day.percent1,
        changesAmount: stats.day.percent1!==0?(stats.day.total1 * 100) / stats.day.percent1:0,
        inMoney: false,
        subTitle: "than past week",
    };
    const daylyAvgThreads = {
        icon: usersIcon,
        amount: Number((stats.day.total1/7).toFixed(3)),
        title: "avg conversation per day - this week",
        changes: Number(stats.day.percent1.toFixed(1)),
        changesAmount: Number(((stats.day.percent1!==0?(stats.day.total1 * 100) / stats.day.percent1:0)/7).toFixed(1)),
        inMoney: false,
        subTitle: "than past week",
    };
    const daylyAvgmessages = {
        icon: usersIcon,
        amount: Number(((stats.day.total2)/7).toFixed(3)),
        title: "avg messages per day - this week",
        changes: Number(stats.day.percent2.toFixed(1)),
        changesAmount: Number(((stats.day.percent2!==0?(stats.day.total2 * 100) / stats.day.percent2:0)/7).toFixed(1)),
        inMoney: false,
        subTitle: "than past week",
    };

    const thisMonth = stats.month.series.length - 1;
    const messagesThisMonthCounter = {
        icon: packageIcon,
        amount: stats.month.series[thisMonth].value2,
        title: "AI Messages this month",
        changes:
        stats.month.series[thisMonth - 1].value2!==0?(stats.month.series[thisMonth].value2 * 100) /
            stats.month.series[thisMonth - 1].value2:(stats.month.series[thisMonth].value2!==0?100:0),
        changesAmount:
            stats.month.series[thisMonth].value2 -
            stats.month.series[thisMonth - 1].value2,
        inMoney: false,
        subTitle: "than past month",
    };
    return [daylyAvgThreads, daylyAvgmessages, threadsTodayCounter, messagesThisMonthCounter];
}
