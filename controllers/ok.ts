import express from 'express'

export default function get(req: express.Request, res: express.Response) {
    res.send('Clear!')
}