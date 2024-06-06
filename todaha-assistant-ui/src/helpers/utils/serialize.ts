import { IChat } from "@/types/apps/chat";
import avatar2Img from "@/assets/images/avatars/2.png";
import avatar3Img from "@/assets/images/avatars/3.png";
import avatar4Img from "@/assets/images/avatars/4.png";
import avatar5Img from "@/assets/images/avatars/5.png";
import avatar6Img from "@/assets/images/avatars/6.png";
import avatar7Img from "@/assets/images/avatars/7.png";
import avatar8Img from "@/assets/images/avatars/8.png";

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
