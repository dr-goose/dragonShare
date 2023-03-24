import express from 'express'

export default function get(req: express.Request, res: express.Response) {
    res.status(451).send('There is no place for you!')
}