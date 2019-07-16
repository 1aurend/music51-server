import express from 'express'
import bodyParser from 'body-parser'
import logger from 'morgan'
import atFetch from './routes/atfetch'
import cors from 'cors'
const app = express()

require('dotenv').config()


const API_PORT = process.env.API_PORT || 4000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(logger('dev'))


app.use('/', cors({origin: 'http://localhost:3000'}), atFetch)

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`))
