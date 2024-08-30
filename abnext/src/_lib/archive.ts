import { Message } from "@/app/types/archive"
import prisma from "./prisma"
import { encryptMessageAsync } from "./encryption"

export async function createArchive(messages: Message[], userID: string, serverID: string, archiveName: string) {
    // Create archive
    const archive = await prisma.archives.create({
        data: {
            name: archiveName,
            user_id: userID,
            server_id: serverID
        }
    })

    messages.map(async message => {
        const encryptedMessage = await encryptMessageAsync(message.content, userID, serverID)

        await prisma.messages.create({
            data: {
                archive_id: archive.id,
                user_id: userID,
                server_id: serverID,
                content: encryptedMessage.encryptedData,
                iv: encryptedMessage.iv,
                tag: encryptedMessage.tag
            }
        })
    })

    return archive.id
}

export async function getArchives(userID: string) {
    const archives = await prisma.archives.findMany({
        where: {
            user_id: userID
        },
        orderBy: {
            created_at: 'desc'
        }
    })

    return archives
}

export async function getMessageCount(archiveID: number) {
    const messageCount = await prisma.messages.count({
        where: {
            archive_id: archiveID
        }
    })

    return messageCount
}