import fs from 'fs'
import Mongo from "../db/mongo"
import settings from "../settings"

const command: string[] = process.argv
const method: string = command[2]
const username: string = command[3]
const password: string = command[4]
const filespace: number = parseInt(command[5])

const mongo: Mongo = new Mongo(settings.mongo.url, settings.mongo.db, settings.mongo.users)

async function main() {
    switch (method) {
        case 'add':
            if (await mongo.add(username, password, filespace) == true) {
                fs.mkdirSync(`../userfiles/${username}`)
                process.exit(0)
            }
            
            console.log('Username already taken!')
            process.exit(-1)
    
        case 'delete':
            if (await mongo.remove(username)) {
                fs.rmdirSync(`../userfiles/${username}`, { recursive: true })
                process.exit(0)
            }
            
            console.log('User not found!')
            process.exit(-1)

        case 'info':
            const user = await mongo.find(username)

            if(user) {
                console.log(`Username: ${user.username}\nPassword (hashed): ${user.password}\nFilespace: ${user.filespace}GB`)
                process.exit(0)
            }

            console.log('User not found!')
            process.exit(-1)
    }
}

main()