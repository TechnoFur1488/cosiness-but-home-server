require("dotenv").config()
const express = require("express")
const sequelize = require("./db.js")
const model = require("./model/model.js")
const router = require("./routes/routes.js")

const PORT = process.env.PORT || 5000

const app = express()


app.use(express.json())

app.use("/api", router)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync({ alter: true })
        app.listen(PORT, () => console.log(`Сервер работает на порту ${PORT}`))
    } catch (e) {
        console.error(e)
    }
}

start()
