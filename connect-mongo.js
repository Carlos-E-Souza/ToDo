const mongo = require("mongoose")

module.exports = async () => {
    await mongo
        .connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            console.log("Conectado com MongoDB")
        })
        .catch((err) => {
            console.log(err.message)
        })
}
