import express from 'express'
import fs from 'fs'

export function get(req: express.Request, res: express.Response) {
    const path = `./userfiles/${req.app.get('username')}/${req.query.filename}`

    fs.readFile(path, (err, data) => {
        if (!err) {
            res.download(path)
        }
        else {
            res.redirect('/error/no-files')
        }
    })
}