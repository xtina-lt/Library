// express: js framework - interface to Node Server
const express = require('express');
const app = express();
app.use( express.json() )
app.use( express.urlencoded({extended:true}) )

// cors cross-origin requests
const cors = require('cors')
// app.use( cors() )
// session cors
app.use(cors({origin: 'http://http://localhost:3000', credentials:true}))

// connect to mongooese and routes
require('./config/mongoose')
require('./routes/users.routes')(app)
require('./routes/likes.routes')(app)

// middleware for cookies
const cookieParser = require('cookie-parser')
app.use(cookieParser())

// read enviroment variables
require('dotenv').config()
// app listen to port
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Party on port: ${PORT}`) );


// LOGIN REG INSTALL
// npm i bcrypt dotenv cookie-parser jsonwebtoken