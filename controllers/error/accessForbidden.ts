import express from 'express'

export default function get(req: express.Request, res: express.Response) {
    res.status(403).send('You shall not pass!')
}