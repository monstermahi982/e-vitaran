import express from 'express'
import { APP_PORT, DB_URL } from './config'
import errorhandler from './middlewares/errorHandler'
import routes from './routers'
import mongoose from 'mongoose'

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
    console.log('DB is connected');
})

const app = express()
app.use(express.json())
app.use('/api', routes);
app.use(errorhandler);



app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(APP_PORT, () => {
    console.log(`Example app listening at http://localhost:${APP_PORT}`)
})