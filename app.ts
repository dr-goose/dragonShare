import express from 'express'
import cookieParser from 'cookie-parser'
import fileUpload from 'express-fileupload'
import bodyParser from 'body-parser'

import settings from './settings'
import routes from './router'

const app: express.Application = express()
app.set('view engine', 'ejs')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())
app.use(fileUpload())
app.use(express.static('./public'))
app.use(routes)

app.listen(settings.port, () => {
    console.log(`Dragonsharing online on port ${settings.port}`)
})
