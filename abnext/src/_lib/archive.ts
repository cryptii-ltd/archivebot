'use server'

import { revalidatePath } from "next/cache"
import prisma from "./prisma"

/**
 * Fetches all non-deleted archives associated with the given user id.
 *
 * @param {string} userId - The id of the user to fetch archives for
 * @returns {Promise<Archive[]>} - A promise that resolves to an array of Archive objects
 */
export async function getArchives(userId: string) {
    const archives = await prisma.archives.findMany({
        where: {
            user_id: userId,
            deleted: false
        },
        orderBy: {
            created_at: 'desc'
        }
    })

    return archives
}

/**
 * Fetches a single non-deleted archive associated with the given user id and uuid.
 *
 * @param {string} userId - The id of the user to fetch archives for
 * @param {string} uuid - The uuid of the archive
 * @returns {Promise<Archive | null>} - A promise that resolves to an Archive object if found, or null if not found
 */
export async function getArchive(userId: string, uuid: string) {
    const archive = await prisma.archives.findFirst({
        where: {
            user_id: userId,
            uuid: uuid,
            deleted: false
        }
    })

    return archive
}

/**
 * Deletes an archive and invalidates the /archives page.
 *
 * @param {number} archiveId - The id of the archive to delete
 * @returns {Promise<void>} - A promise that resolves when the archive has been deleted and the page invalidated
 */
export async function deleteArchive(archiveId: number) {
    await prisma.archives.delete({
        where: {
            id: archiveId
        }
    })

    revalidatePath('/archives')
}

/**
 * Fetches messages from an archive.
 *
 * @param {number} archiveId - The id of the archive to fetch messages from
 * @param {string} [order=desc] - Order of messages to fetch. 'desc' or 'asc'
 * @param {number} [offset=0] - Offset of messages to fetch
 * @returns {Promise<Message[]>} - A promise that resolves to an array of Message objects
 */
export default async function getMessages(archiveId: number, order: string = 'desc', offset: number = 0) {
    const messages = await prisma.messages.findMany({
        where: {
            archive_id: archiveId
        },
        orderBy: {
            created_at: order === 'desc' ? 'desc' : 'asc'
        }
    })

    return messages
}

/**
 * Fetches the number of messages in an archive.
 *
 * @param {number} archiveId - The id of the archive to fetch messages from
 * @returns {Promise<number>} - A promise that resolves to the number of messages in the archive
 */
export async function getMessageCount(archiveId: number) {
    const messageCount = await prisma.messages.count({
        where: {
            archive_id: archiveId
        }
    })

    return messageCount
}
