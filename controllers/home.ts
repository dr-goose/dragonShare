import express from 'express'
import fs from 'fs'
import { filesize } from 'filesize'

export function get(req: express.Request, res: express.Response) {
    const path: string = `./userfiles/${req.app.get('username')}/`
    const filenames: string[] = fs.readdirSync(path)
    const files: any[] = []

    filenames.forEach(file => {
        const info: fs.Stats = fs.statSync(path + file)
        const date: Date = new Date(info.mtimeMs)

        files.push({
            name: file,
            date: `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`,
            size: filesize(info.size)
        })
    })

    res.render('home.ejs', {username: req.app.get('username'), files: files})
}

export function post(req: express.Request, res: express.Response) {
    if (req.body.file) {
        fs.rm(`./userfiles/${req.app.get('username')}/${req.body.file}`, () => {})
        res.redirect('/ok')
    }
    else {
        res.redirect('/error/no-files')
    }
}