import prisma from "@/lib/prisma";

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

export async function getUserDetails(accessToken: string) {
    const headers = {
        Authorization: `Bearer ${accessToken}`,
    }

    const response = await fetch('https://discord.com/api/users/@me', { headers: headers })

    if (response.status != 200) return

    const userData = await response.json()
    return userData
}