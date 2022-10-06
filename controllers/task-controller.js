const { Task } = require("../model/task-model")

class TaskController {
    message = ""
    type = ""
    userToken = ""

    constructor(userToken) {
        this.userToken = userToken
    }

    getTasks = async (req, res) => {
        try {
            const tasksList = await Task.find({ userId: req.params.userId })
            return res.render("index", {
                tasksList,
                task: null,
                taskDelete: null,
                message: this.message,
                type: this.type,
            })
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }

    createTask = async (req, res) => {
        const task = req.body

        if (!task.task) {
            this.message = "Insira um texto, antes de adicionar a tarefa!"
            this.type = "danger"
            return res.redirect("/")
        }

        try {
            await Task.create(task)
            this.message = "Tarefa criada com sucesso!"
            this.type = "success"
            return res.redirect("/")
        } catch (err) {
            res.status(500).send({ error: err.message })
        }
    }

    getById = async (req, res) => {
        try {
            const tasksList = await Task.find()
            if (req.params.method == "update") {
                const task = await Task.findOne({ _id: req.params.taskId })
                res.render("index", {
                    task,
                    taskDelete: null,
                    tasksList,
                    message: this.message,
                    type: this.type,
                })
            } else {
                const taskDelete = await Task.findOne({ _id: req.params.taskId })
                res.render("index", {
                    task: null,
                    taskDelete,
                    tasksList,
                    message: this.message,
                    type: this.type,
                })
            }
        } catch (err) {
            res.status(500).send({ error: err.message })
        }
    }

    updateTask = async (req, res) => {
        try {
            const task = req.body
            await Task.updateOne({ _id: req.params.taskId }, task)
            message = "Tarefa atualizada com sucesso!"
            type = "success"
            res.redirect("/")
        } catch (err) {
            res.status(500).send({ error: err.message })
        }
    }

    deleteTask = async (req, res) => {
        try {
            await Task.deleteOne({ _id: req.params.taskId })
            message = "Tarefa apagada com sucesso!"
            type = "success"
            res.redirect("/")
        } catch (err) {
            res.status(500).send({ error: err.message })
        }
    }

    taskCheck = async (req, res) => {
        try {
            const task = await Task.findOne({ _id: req.params.taskId })
            task.check ? (task.check = false) : (task.check = true)
            await Task.updateOne({ _id: req.params.id }, task)
            res.redirect("/")
        } catch (err) {
            res.status(500).send({ error: err.message })
        }
    }
}

module.exports = {
    TaskController,
}
