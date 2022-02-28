require('dotenv').config();
const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()
const cors = require('cors');
//DB connection
require('./db/db.config')
const PORT = process.env.PORT || 6000
const corsOptions = {
    // origin:'http://localhost:3000', 
    credentials:true,          
    optionSuccessStatus:200
}


app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))
app.use(cors(corsOptions))

function main() {
    app.listen(PORT, () => console.log('app running at '+ PORT))
    
    // routes
    app.use('/api', require('./routes'))
}
main();
