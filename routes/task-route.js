const { Router } = require("express")
const { TaskController } = require("../controllers/task-controller")
const { authMD } = require("../middlewares/auth-middleware")

const taskRoute = Router()

const TaskControlle = new TaskController()

taskRoute.use(authMD)

taskRoute.get("/:userId", TaskControlle.getTasks)

taskRoute.post("/criar", TaskControlle.createTask)

taskRoute.put("/atualizar/:taskId", TaskControlle.updateTask)

taskRoute.delete("/deletar/:taskId", TaskControlle.deleteTask)

module.exports = {
    taskRoute,
}
