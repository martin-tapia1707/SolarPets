const express = require('express')
const server = express()
const PORT = 3000


server.use(express.json())


server.listen(PORT, () => {
    console.log("El solarpets papa");
})