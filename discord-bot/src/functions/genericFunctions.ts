import fetch from "node-fetch";
import { ResetArchiveBody } from "../typings/Request";
import { ExtendedInteraction } from "../typings/Command";
import { RoleStatus } from "../typings/User";


// import .env file
require("dotenv").config();

/** 
 * generates message list for listarchives commands
 * 
 * @param {Array} archives - Array of archives names returned from API
 * @returns {Array<string>} - array of strings to send to user
*/
export async function listIndexArchives(archives: Array<[string]>) {
    const messages = []
    let preparedMsg = ''
    var i = 0
    var total = 0
    archives.forEach(archive => {
        total += 1
        preparedMsg += `${total}. ${archive}\n`
        i += 1
        if (i === 10) {
            messages.push(preparedMsg)
            preparedMsg = ''
            i = 0
        }
    })

    if (i !== 0) {
        messages.push(preparedMsg)
    }
    return messages
}

/** 
 * generic function for send POST, GET, and DELETE requests to API endpoint
 * 
 * @param {string} endpoint - API endpoint URL
 * @param {string} request_method - request method to use for request
 * @param {string} user_id - user_id used for get requests
 * @param {ResetArchiveBody | any} content - JSON body to send in DELETE and POST requests
 * @returns {JSON | object} - API response
*/
export async function endpointQuery(endpoint: string = 'archives', request_method: string, user_id: string = null, content: ResetArchiveBody | any = {}) {
    // check request method
    if (['POST', 'DELETE'].includes(request_method)) {
        // if POST and the JSON object is empty return error
        if (request_method !== 'DELETE' && Object.keys(content).length === 0) return { 'ERROR': 500 }

        try {
            // JSON.stringify object
            const content_str = JSON.stringify(content);
            // send request using fetch to remote endpoint from .env variables
            const response = await fetch(`https://${process.env.remoteEndpoint}/v1/${endpoint}`, {
                method: request_method,
                body: content_str,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${process.env.token}`
                }
            })
            // if error return error code
            if (!response.ok) return { ERROR: response.status, body: await response.text() }
            // return API response
            return await response.json()
        } catch (error: any) {
            if (error.response) {
                console.log(error.response)
                return error.response.status
            }

            return { ERROR: error.response.status, body: await error.response.text() }
        }
    } else {
        // if get request and user_id not specified return error
        if (!user_id) return { 'ERROR': 500 }

        try {
            // send get request to endpoint using user_id
            const response = await fetch(`http://${process.env.remoteEndpoint}/v1/${endpoint}/${user_id}`, {
                method: request_method,
            })

            // return error from endpoint
            if (!response.ok) return { ERROR: response.status, body: await response.text() }
            // return API response
            return await response.json()
        } catch (error: any) {
            if (error.response) {
                console.log(error.response)
                return { ERROR: error.response.status, body: await error.response.text() }
            }

            return 502
        }
    }
}

/** 
 * generic function for send POST, GET, and DELETE requests to API endpoint
 * 
 * @param {ExtendedInteraction} interaction - Discord.js interaction object
 * @param {string} user_id - user_id of command sender 
 * @returns {RoleStatus} - Role status object with users roles in the community server
*/
export async function check_user_role(interaction: ExtendedInteraction, user_id: string) {
    // object with pre-defined role_ids from Archive Bot community server
    const supporter_role_ids = {
        "VIP": '1105221945533931710',
        "SupporterPlus": '1105220574638256229',
        "Supporter": '1105219630278131732'
    }
    // Build default object with all roles false
    const role_status: RoleStatus = {
        VIP: false,
        SupporterPlus: false,
        Supporter: false
    }

    /**
    * Create shard manager to check all shards for up-to-date role
    * information from Archive Bot community server
    * 
    */
    const shardManager = interaction.client.shard;

    // check all shards for Archive Bot community server
    const results = await shardManager.broadcastEval(async (shard: any, user_id: any) => {
        const guild = shard.guilds.cache.get(process.env.serverId.toString())
        if (guild) {
            // get up-to-date list of members from community server
            await guild.members.fetch()
            // get member object by user_id from community server 
            const member = guild.members.cache.find(user => user.id === user_id)
            if (member) {
                // return member objects roles
                return member._roles
            }
        }
        
    }, {context: user_id})

    // check to see which roles the user has and update role_status object
    results.forEach((user_roles: Array<string> | null) => {
        if (user_roles) {
            for (var stored_role in supporter_role_ids) {
                if (user_roles.includes(supporter_role_ids[stored_role])) {
                    role_status[stored_role] = true
                }
            }
        }
    })
    return role_status
}