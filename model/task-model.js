const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema({
    task: { type: String, require: true },
    check: { type: Boolean, default: false },
    date: { type: Date, default: Date.now() },
    userId: { type: String, required: true },
})

const Task = mongoose.model("task", taskSchema)

module.exports = {
    taskSchema,
    Task,
}
