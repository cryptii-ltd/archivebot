import prisma from "./prisma"

export async function createArchive(messages: string[] = [], userID: string, serverID: string, archiveName: string) {
    // Create archive
    const archive = await prisma.archives.create({
        data: {
            name: archiveName,
            user_id: userID,
            server_id: serverID
        }
    })

    return archive.id
}