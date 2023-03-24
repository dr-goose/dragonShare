import express, { Router } from 'express'

import validate from './middleware/validate'

import * as home from './controllers/home'
import * as upload from './controllers/file/upload'
import * as download from './controllers/file/download'
import * as login from './controllers/user/login'
import * as logout from './controllers/user/logout'

import ok from './controllers/ok'
import accessForbidden from './controllers/error/accessForbidden'
import noFiles from './controllers/error/noFiles'
import noSpace from './controllers/error/noSpace'

const routes: Router = express.Router()

routes.use(validate)

routes.get('/', home.get)
routes.post('/', home.post)

routes.get('/file/upload', upload.get)
routes.post('/file/upload', upload.post)

routes.get('/file/download', download.get)

routes.get('/user/login', login.get)
routes.post('/user/login', login.post)

routes.get('/user/logout', logout.get)

routes.get('/ok', ok)
routes.get('/error/access-forbidden', accessForbidden)
routes.get('/error/no-files', noFiles)
routes.get('/error/no-space', noSpace)

routes.use((req, res) => {
    res.redirect('/')
})

export default routes