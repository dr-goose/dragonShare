import * as mongo from 'mongodb'
import settings from '../settings'
import { sha512 } from 'js-sha512'

export default class Mongo {
    private client: mongo.MongoClient
    private database: mongo.Db
    private collection: mongo.Collection

    constructor (url: string, database: string, collection: string) {
        this.client = new mongo.MongoClient(url)
        this.connect()
        this.database = this.client.db(database)
        this.collection = this.database.collection(collection)
    }

    private async connect() {
        this.client = await this.client.connect()
    }

    async add(username: string, password: string, filespace: number) {
        if (await this.collection.countDocuments({username: username}) == 1) {
            return false
        }

        var pepper: string = settings.hash.pepper[Math.floor(Math.random() * settings.hash.pepper.length)]
        var password: string = sha512(password + settings.hash.salt + pepper)

        await this.collection.insertOne({username: username, password: password, filespace: filespace})
        return true
    }

    async remove(username: string) {
        if (await this.collection.countDocuments({username: username}) != 1) {
            return false
        }

        await this.collection.deleteOne({username: username})
        return true
    }

    async find(username: string) {
        if (await this.collection.countDocuments({username: username}) == 1) {
            return this.collection.findOne({username: username})
        }
        else {
            return false
        }
    }
}