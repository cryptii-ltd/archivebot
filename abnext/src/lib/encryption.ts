import crypto from 'crypto'

export function deriveKey(userId: string, serverId: string): Buffer {
    const salt = crypto.randomBytes(16)
    const keyMaterial = `${userId}${serverId}`  // Combine user_id and server_id

    const key = crypto.pbkdf2Sync(keyMaterial, salt, 100000, 32, 'sha256')
    return key
}

export function encryptMessage(plaintext: string, userId: string, serverId: string): { encryptedData: string; iv: Buffer; tag: Buffer } {
    const key = deriveKey(userId, serverId)
    const iv = crypto.randomBytes(12)  // 96-bit nonce for GCM
    const cipher = crypto.createCipheriv('aes-256-gcm', key, iv)

    let encrypted = cipher.update(plaintext, 'utf8', 'hex')
    encrypted += cipher.final('hex')

    const tag = cipher.getAuthTag()  // Authentication tag for AES-GCM

    return {
        encryptedData: encrypted,
        iv: iv,
        tag: tag
    }
}

export function decryptMessage(encryptedData: string, iv: Buffer, tag: Buffer, userId: string, serverId: string): string {
    const key = deriveKey(userId, serverId)
    const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv)
    decipher.setAuthTag(tag)

    let decrypted = decipher.update(encryptedData, 'hex', 'utf8')
    decrypted += decipher.final('utf8')

    return decrypted
}
