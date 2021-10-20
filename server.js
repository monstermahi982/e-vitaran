import express from 'express'
import { PORT, DB_URL } from './config'
import errorhandler from './middlewares/errorHandler'
import routes from './routers'
import mongoose from 'mongoose'
import cors from 'cors'

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
    console.log('DB is connected');
})

const app = express()

app.use(cors({ origin: ['http://localhost:3000', 'https://e-vitaran.herokuapp.com/'] }))
app.use(express.json())
app.use('/api', routes);
app.use(errorhandler);
app.use(express.static('frontend/build'))

app.listen(PORT, () => {
    console.log(`app listening at http://localhost:${PORT}`)
})