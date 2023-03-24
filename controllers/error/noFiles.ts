import express from 'express'

export default function get(req: express.Request, res: express.Response) {
    res.status(450).send('I return with empty hands!')
}