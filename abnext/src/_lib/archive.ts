import prisma from "./prisma"

export async function getArchives(userId: string) {
    const archives = await prisma.archives.findMany({
        where: {
            user_id: userId
        },
        orderBy: {
            created_at: 'desc'
        }
    })

    return archives
}

export async function getMessageCount(archiveId: number) {
    const messageCount = await prisma.messages.count({
        where: {
            archive_id: archiveId
        }
    })

    return messageCount
}
