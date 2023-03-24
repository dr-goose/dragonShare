import express from 'express'

export default function validate(req: express.Request, res: express.Response, next: express.NextFunction) {
    if (req.path != '/user/login') {
        const server_token: string = req.app.get('token')
        const client_token: string = req.cookies.token

        if (server_token) {
            if (server_token == client_token) {
                res.cookie('token', client_token)
                next()
            }
        }
        
        else {
            res.redirect('/user/login')
        }
    }

    else {
        next()
    }
}