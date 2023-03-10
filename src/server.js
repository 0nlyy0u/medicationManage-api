import express from 'express'
import cors from 'cors'
import { corsOptions } from '*/config/cors'
import { connectDB } from '*/config/mongodb'
import { env } from '*/config/environtment'
import { apiV1 } from '*/routes/v1'
import cookieParser from 'cookie-parser'
import http from 'http'
import path from 'path'
import socket from 'socket.io'
import { inviteUserToBoardSocket } from '*/sockets/inviteUserToBoardSocket'

connectDB()
    .then(() => console.log('Connected successfully to database server!'))
    .then(() => bootServer())
    .catch(error => {
        console.error(error)
        process.exit(1)
    })

const bootServer = () => {
    const app = express()
    // Fix cái vụ Cache from disk của ExpressJS
    app.use((req, res, next) => {
        res.set('Cache-Control', 'no-store')
        next()
    })

    app.use(cookieParser())

    app.use(cors(corsOptions))

    // Enable req.body data
    app.use(express.json())

    // Use APIs v1
    app.use('/v1', apiV1)
    app.use('/uploads', express.static('uploads'))
    app.use('/', function (req, res) {
        res.sendFile(path.join(__dirname + '/frontend/index.html'))
        //__dirname : It will resolve to your project folder.
    })
    // For real-time
    const server = http.createServer(app)
    const io = socket(server, { cors: corsOptions })
    io.on('connection', (socket) => {
        //console.log('New client: ', socket.id)
        inviteUserToBoardSocket(socket)

        socket.on('disconnect', () => {
            console.log('Client disconnected: ', socket.id);
        })
    })

    // app.listen(env.APP_PORT, env.APP_HOST, () => {
    //   console.log(`Hello trungquandev, I'm running at ${env.APP_HOST}:${env.APP_PORT}/`)
    // })
    // Function to serve all static files
    // inside public directory.
    //console.log(__dirname)
    //Support heroku deploy
    server.listen(process.env.PORT || env.APP_PORT, () => {
        console.log(`Hello KhaNV, I'm running at port: ${process.env.PORT || env.APP_PORT}/`)
    })
}
