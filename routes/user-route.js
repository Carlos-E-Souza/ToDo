const { Router } = require("express")
const { UserController } = require("../controllers/user-controller")

const userRoute = Router()

const userController = new UserController()

userRoute.get("/", userController.userPage)

userRoute.post("/registrar", userController.criarUser)

userRoute.post("/auth", userController.authUser)

userRoute.post("/login", userController.loginUser)

module.exports = {
    userRoute,
}
