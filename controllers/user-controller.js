const bc = require("bcrypt")
const { User } = require("../model/user-model")

class UserController {
    userPage = async (req, res) => {
        return res.render("login")
    }

    userExiste = async (email) => {
        return await User.findOne({ email })
    }

    criarUser = async (req, res) => {
        const userExiste = await this.userExiste(req.body.email)

        if (userExiste) {
            return res.status(400).json("Usuário já existe")
        }

        try {
            const crypted = await bc.hash(req.body.senha, 10)

            const user = new User({
                ...req.body,
                senha: crypted,
            })

            await user.save()

            const userToken = user.gerarAuthToken()
            const { _id, email } = user

            return res.header("auth-token", userToken).json({ _id, email })
        } catch (err) {
            return res.status(500).json({ error: err.message })
        }
    }

    checkUserInfo = async (userInfo) => {
        const user = await this.userExiste(userInfo.email)

        if (!user) throw new Error("Email incorreto")

        const senhaValida = await bc.compare(userInfo.senha, user.senha)

        if (!senhaValida) throw new Error("Senha incorreta")

        return user
    }

    authUser = async (req, res) => {
        try {
            const user = await this.checkUserInfo(req.body)
            const userToken = user.gerarAuthToken()
            return res.json(userToken)
        } catch (err) {
            return res.status(404).json({ error: err.message })
        }
    }

    loginUser = async (req, res) => {
        try {
            const user = await this.checkUserInfo(req.body)
            return res.redirect(process.env.BASE_URL + `/task/${user._id}`)
        } catch (err) {
            return res.status(404).json({ error: err.message })
        }
    }
}

module.exports = {
    UserController,
}
