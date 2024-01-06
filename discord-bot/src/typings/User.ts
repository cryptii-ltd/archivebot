
export interface RoleStatus {
    VIP: boolean;
    SupporterPlus: boolean;
    Supporter: boolean;
}

interface UserInfo {
    message_limit: number;
    archive_limit: number;
    can_change: boolean
}

/**
 * Builds User object based off of RoleStatus
 * 
 * @param {RoleStatus} - Users ab community roles
 * @returns {UserInfo} object with archive limits
 */
export class User {
    user_info: UserInfo
    constructor(role_status: RoleStatus) {
        if (role_status.VIP) {
            this.user_info = {
                message_limit: 40000,
                archive_limit: 10000000,
                can_change: true
            }
            return
        } else if (role_status.SupporterPlus) {
            this.user_info = {
                message_limit: 60000,
                archive_limit: 10,
                can_change: true
            }
            return
        } else if (role_status.Supporter) {
            this.user_info = {
                message_limit: 30000,
                archive_limit: 5,
                can_change: true
            }
            return
        } else {
            this.user_info = {
                message_limit: 20000,
                archive_limit: 3,
                can_change: false
            }
        }
    }
}