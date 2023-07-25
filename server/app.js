const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const userRoutes = require('./Routes/userRoutes')
const sequelize = require('./database/database')



const app = express()
const PORT = 3000 

//middleware 
app.use(bodyParser.json())
app.use(cors())

//routes
app.use('/api',userRoutes)

//connect to the database
sequelize
.sync()
.then(() => {
    console.log('connected to the database')
    app.listen(PORT,() => {
        console.log(`server is running on http://localhost:${PORT}`)
    })
})
.catch((err) => console.log('error connecting to database:', err))











