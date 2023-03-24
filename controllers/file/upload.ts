import express from 'express'
import fileUpload from 'express-fileupload'
import fs from 'fs'
import Mongo from '../../db/mongo'
import settings from '../../settings'

export function get(req: express.Request, res: express.Response) {
    res.render('upload.ejs', {username: req.app.get('username')})
}

function folderSize(path: string) {
    const folder: string[] = fs.readdirSync(path)
    var size: number = 0
    
    folder.forEach((file: string) => {
        size += fs.statSync(path + file).size
    })

    return size
}

async function enoughSpace(username: string, folderSize: number, fileSize: number) {
    const mongo: Mongo = new Mongo(settings.mongo.url, settings.mongo.db, settings.mongo.users)
    const user = await mongo.find(username)

    if (user) {
        const combinedSize = (folderSize + fileSize) / 1073741824

        if (combinedSize <= user.filespace) {
            return true
        }
    }

    return false
}

export async function post(req: express.Request, res: express.Response) {
    if (req.files) {
        const folder_size: number = folderSize(`userfiles/${req.app.get('username')}/`)
        var upload_size: number = 0

        if (Array.isArray(req.files.file)) {
            const upload: fileUpload.UploadedFile[] = req.files.file as fileUpload.UploadedFile[]

            upload.forEach((file: fileUpload.UploadedFile) => {
                upload_size += file.size
            })

            if (await enoughSpace(req.app.get('username'), folder_size, upload_size)) {
                upload.forEach((file: fileUpload.UploadedFile) => {
                    file.mv(`userfiles/${req.app.get('username')}/${file.name}`)
                })
                res.redirect('/ok')
            }
            else {
                res.redirect('/error/no-space')
            }
        }
        else {
            const file: fileUpload.UploadedFile = req.files.file
            upload_size += file.size

            if (await enoughSpace(req.app.get('username'), folder_size, upload_size)) {
                file.mv(`userfiles/${req.app.get('username')}/${file.name}`)
                res.redirect('/ok')
            }
            else {
                res.redirect('/error/no-space')
            }
        }
    }
    else {
        res.redirect('/error/no-files')
    }
}