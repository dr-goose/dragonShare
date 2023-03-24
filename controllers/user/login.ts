import settings from '../../settings'
import express from 'express'
import * as mongo from 'mongodb'
import { sha512 } from 'js-sha512'
import Mongo from '../../db/mongo'

function compare(user:string, db:string): Boolean {
    for (let i: number = 0; i < settings.hash.pepper.length; i++) {
        let password: string = user + settings.hash.salt + settings.hash.pepper[i]

        if (db == sha512(password)) {
            return true
        }
    }
    return false
}

function generate(): string {
    var token: string = ''
    while (token.length < settings.token.size) {
        token += settings.token.characters[Math.floor(Math.random() * settings.token.characters.length)]
    }
    return token
}

export async function get(req: express.Request, res: express.Response) {
    res.render('login.ejs')
}

export async function post(req: express.Request, res: express.Response) {
    if (req.body.username && req.body.password) {
        // Connect to database and get user
        const mongo = new Mongo(settings.mongo.url, settings.mongo.db, settings.mongo.users)
        const user = await mongo.find(req.body.username)

        if (!user) {
            res.redirect('/error/access-forbidden')
            return
        }

        // Compare passwords of users and create session
        if (compare(req.body.password, user.password)) {
            res.app.set('username', req.body.username)
            res.app.set('password', req.body.password)

            const token: string = generate()
            res.app.set('token', token)
            res.cookie('token', token)

            res.redirect('/ok')
        }
        else {
            res.redirect('/error/access-forbidden')
        }
    }
    else {
        res.redirect('/error/access-forbidden')
    }
}