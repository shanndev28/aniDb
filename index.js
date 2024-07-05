import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import session from 'express-session'
import db from './library/config/Databases.js'
import sequelizeStore from 'connect-session-sequelize'

import Eps from './library/routes/Eps.js'
import Fav from './library/routes/Fav.js'
import Movies from './library/routes/Movies.js'
import History from './library/routes/History.js'
import AdminAccess from './library/routes/add.js'

dotenv.config()
const app = express()

// async function as() {
//     await db.sync();
// }

// as()

const sessionStore = sequelizeStore(session.Store)
const store = new sessionStore({ db: db })

app.set("json spaces", 3)

app.use(express.json())
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'

}))

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: 'auto',
        maxAge: 31557600000
    }
}))

app.use(Eps)
app.use(Fav)
app.use(Movies)
app.use(History)
app.use(AdminAccess)

// store.sync();
app.listen(process.env.APP_PORT, () => console.log('Server up and running on : ' + process.env.APP_PORT))