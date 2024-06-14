import { IChat } from "@/types/apps/chat";
import avatar2Img from "@/assets/images/avatars/2.png";
import avatar3Img from "@/assets/images/avatars/3.png";
import avatar4Img from "@/assets/images/avatars/4.png";
import avatar5Img from "@/assets/images/avatars/5.png";
import avatar6Img from "@/assets/images/avatars/6.png";
import avatar7Img from "@/assets/images/avatars/7.png";
import avatar8Img from "@/assets/images/avatars/8.png";
import DateUtil2 from "../../../helpers/utils/date";
import { DateTime } from "luxon";
import { DashboardChartStats, ServerStat } from "./server-models";
import { IGraphStat } from "@/types/dashboards/chat_statistics";
import DateUtil from "../../../helpers/utils/date";

const imageUrls = [
    avatar2Img.src,
    avatar3Img.src,
    avatar4Img.src,
    avatar5Img.src,
    avatar6Img.src,
    avatar7Img.src,
    avatar8Img.src,
];

export function transformChatsToIChat(chats: any[], page: number): IChat[] {
    return chats.map((chat, index) => {
        const messages = chat.data.map((message: any) => ({
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
    const last7DaysStats: DashboardChartStats[] = Array.from(
        { length: 7 },
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
            if (diffDays >= 0 && diffDays < 7) {
                last7DaysStats[diffDays].thread_count += threadCount;
                last7DaysStats[diffDays].client_message_count += messageCount;
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

    return [todayStats, last7DaysStats, last3MonthsStats];
}

export async function hourlyStats(
    stats: DashboardChartStats[]
): Promise<IGraphStat> {
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
            date: DateUtil.minusHours(- index, today_midnight),
            value1: stat.thread_count || 0,
            value2: stat.client_message_count || 0,
        };
    });

    const totalMessages = hourly_stats.reduce(
        (sum, stat) => sum + stat.value2,
        0
    );
    const percentChange =
        hourly_stats[0].value2 !== 0
            ? (hourly_stats[hourly_stats.length - 1].value2 /
                hourly_stats[0].value2) *
            100
            : 100;

    return Promise.resolve({
        total: totalMessages,
        percent: percentChange,
        series: hourly_stats,
    });
}

export async function daylyStats(
    stats: DashboardChartStats[]
): Promise<IGraphStat> {
    const dayly_stats = stats.reverse().map((stat, index) => {
        return {
            date: DateUtil.minusDays(stats.length - index - 1),
            value1: stat.thread_count || 0,
            value2: stat.client_message_count || 0,
        };
    });

    const totalMessages = dayly_stats.reduce((sum, stat) => sum + stat.value2, 0);
    const percentChange =
        dayly_stats[0].value2 !== 0
            ? (dayly_stats[dayly_stats.length - 1].value2 / dayly_stats[0].value2) *
            100
            : 100;

    return Promise.resolve({
        total: totalMessages,
        percent: percentChange,
        series: dayly_stats,
    });
}

export async function monthlyStats(
    stats: DashboardChartStats[]
): Promise<IGraphStat> {
    const month_stats = stats.reverse().map((stat, index) => {
        return {
            date: DateUtil.minusMonths(stats.length - index - 1),
            value1: stat.thread_count || 0,
            value2: stat.client_message_count || 0,
        };
    });

    const totalMessages = month_stats.reduce((sum, stat) => sum + stat.value2, 0);
    const percentChange =
        month_stats[0].value2 !== 0
            ? (month_stats[month_stats.length - 1].value2 / month_stats[0].value2) *
            100
            : 100;

    return Promise.resolve({
        total: totalMessages,
        percent: percentChange,
        series: month_stats,
    });
}
