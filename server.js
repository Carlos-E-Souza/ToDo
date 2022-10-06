const express = require("express")
const cors = require("cors")
const path = require("path")
const { userRoute } = require("./routes/user-route")
const { taskRoute } = require("./routes/task-route")

require("./connect-mongo")()

const app = express()

app.set("view engine", "ejs")
app.set("views", "./view")
app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, "public")))
app.use(express.urlencoded({ extended: true }))

app.use("/user", userRoute)
app.use("/task", taskRoute)

const port = process.env.PORT || 9000

app.listen(port, () => {
    console.log(`Server rodando na porta:${port}`)
})
