const express = require('express')
const userRouter = require('./routes/user.routes')

const PORT = process.env.API_PORT || 8080

const app = express()

app.use('/api', userRouter)

app.listen(PORT, () => console.log(`server started on port ${PORT}`))