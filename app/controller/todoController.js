const todoModel = require('../model/todoModel');
exports.create = async (req, res) => {
    try {
        const email = req.headers.token.data;
        const reqBody = req.body;
        const todoContent = {email, ...reqBody};
        const newTodo = await todoModel.create(todoContent);
        if (newTodo.createdAt) {
            res.status(201).json({status: 'Created', todo: newTodo});
        } else {
            res.status(500).json({status: 'Error', message: 'Failed to create new todo'});
        }
    } catch (err) {
        res.status(500).json({status: 'error', message: err});
    }
}

// READ TODOS
exports.read = async (req, res) => {
    try {
        const email = req.headers.token.data;
        const id = req.body.id;
        const todo = await todoModel.findOne({_id: id, email: email});
        if (todo) {
            res.status(200).json({status: 'Success', todo: todo});
        }
    } catch (err) {
        res.status(500).json({status: 'Error', message: err});
    }
}

// LIST ALL TODOS
exports.findAllTodos = async (req, res) => {
    try {
        const email = req.headers.token.data;
        const todos = await todoModel.find({email: email});
        if (todos.length > 0) {
            res.status(200).json({status: 'Success', todos: todos});
        } else {
            res.status(200).json({status: 'Not found', message: 'No todos found'});
        }
    } catch (err) {
        res.status(500).json({status: 'error', message: err});
    }
}

// UPDATE TODOS
exports.update = async (req, res) => {
    try {
        const {id, title, desc} = req.body;
        const email = req.headers.token.data;
        const updatedTodo = await todoModel.updateOne({_id: id, email: email}, {title: title, desc: desc});
        if (updatedTodo.modifiedCount === 1) {
            res.status(201).json({status: 'Updated', data: updatedTodo});
        } else {
            res.status(500).json({status: 'Failed', message: 'Failed to update todo'});
        }
    } catch (err) {
        res.status(500).json({status: 'Error', message: err});
    }
}

// DELETE TODOS
exports.delete = async (req, res) => {
    try {
        const email = req.headers.token.data;
        const id = req.body.id;
        const deletedTodo = await todoModel.deleteOne({_id: id, email: email});
        if (deletedTodo.deletedCount === 1) {
            res.status(200).json({status: 'Deleted', data: deletedTodo});
        } else {
            res.status(500).json({status: 'Failed', message: 'Failed to delete todo'});
        }
    } catch (err) {
        res.status(500).json({status: 'Error', message: err});
    }
}

// MARK TODOS AS COMPLETE/CANCELL
exports.status = async (req, res) => {
    try {
        const email = req.headers.token.data;
        const {id, status} = req.body;
        const updatedStat = await todoModel.updateOne({_id: id, email: email}, {status: status});
        if (updatedStat.modifiedCount === 1) {
            res.status(200).json({status: 'Updated', data: updatedStat});
        } else {
            res.statsu(500).json({status: 'Error', message: 'Status can\'t be updated.'});
        }
    } catch (err) {
        res.status(500).json({status: 'Error', message: err});
    }
}
