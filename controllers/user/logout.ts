import express from 'express'

export function get(req: express.Request, res: express.Response) {
    req.app.set('token', undefined)
    req.app.set('username', undefined)
    req.app.set('password', undefined)
    res.cookie('token', undefined)
    res.redirect('/user/login') 
}