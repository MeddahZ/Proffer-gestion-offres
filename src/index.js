const express = require('express')
require('./db/mongoose')
const lotRouter = require('./routers/lot')
const offerRouter = require('./routers/offer')
const adminRouter = require('./routers/Admin')
const barremRouter = require('./routers/barrem')


const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(offerRouter)
app.use(lotRouter)
app.use(adminRouter)
app.use(barremRouter)


app.listen(port , () => {
    console.log('server is up on port '+ port)
})
