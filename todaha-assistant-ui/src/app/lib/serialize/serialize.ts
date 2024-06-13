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
import { ServerStat } from "./server-models";
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
            from_me: message.role === 'assistant',
        }));

        // Choose a random image URL from the array
        const randomImageUrl = imageUrls[Math.floor(Math.random() * imageUrls.length)];

        return {
            id: index,
            image: randomImageUrl, // Assign a random image URL
            name: 'Client ' + (index + 1 + (page - 1) * 10),
            messages,
            unreads: 0,
        };
    });
}

export async function calculateHourlyStats(stats: ServerStat[]): Promise<IGraphStat> {
    const hourlyStats = stats.map((daily_stat, index) => {
        return {
            date: DateUtil.minusHours(24 - index),
            value1: daily_stat.message_count || 0,
            value2: daily_stat.thread_count || 0,
        };
    });


    const totalMessages = hourlyStats.reduce((sum, stat) => sum + stat.value1, 0);
    const percentChange = (hourlyStats[hourlyStats.length - 1].value1 / hourlyStats[0].value1) * 100;

    return Promise.resolve({
        total: totalMessages,
        percent: percentChange,
        series: hourlyStats
    });
}

export async function calculateDailyStats(stats: ServerStat[]): Promise<IGraphStat> {
    const dailyStats = stats.map((daily_stat, index) => {
        return {
            date: DateUtil.minusDays(10 - index),
            value1: daily_stat.message_count || 0,
            value2: daily_stat.thread_count || 0,
        };
    });

    const totalMessages = dailyStats.reduce((sum, stat) => sum + stat.value1, 0);
    const percentChange = (dailyStats[dailyStats.length - 1].value1 / dailyStats[0].value1) * 100;

    return Promise.resolve({
        total: totalMessages,
        percent: percentChange,
        series: dailyStats
    });
}

export async function calculateMonthlyStats(stats: ServerStat[]): Promise<IGraphStat> {
    const monthlyStats = stats.map((daily_stat, index) => {
        return {
            date: DateUtil.minusMonths(10 - index),
            value1: daily_stat.message_count || 0,
            value2: daily_stat.thread_count || 0,
        };
    });

    const totalMessages = monthlyStats.reduce((sum, stat) => sum + stat.value1, 0);
    const percentChange = (monthlyStats[monthlyStats.length - 1].value1 / monthlyStats[0].value1) * 100;

    return Promise.resolve({
        total: totalMessages,
        percent: percentChange,
        series: monthlyStats
    });
}
