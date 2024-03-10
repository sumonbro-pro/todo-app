const express = require('express');
const router = express.Router();
const profileController = require('../controller/profileController');
const todoController = require('../controller/todoController');
const authMiddleware = require('../middleware/authMiddleware');

// ROUTING STARTED
// users
router.post('/user/create', profileController.create);
router.get('/user/login', profileController.login);
router.get('/user/profile', authMiddleware, profileController.profile);
router.put('/user/update',authMiddleware, profileController.update)
router.delete('/user/delete', authMiddleware, profileController.delete);

// todos
router.post('/todo/create', authMiddleware, todoController.create);
router.get('/todo/read', authMiddleware, todoController.read);
router.get('/todos', authMiddleware, todoController.findAllTodos);
router.put('/todo/update', authMiddleware, todoController.update);
router.delete('/todo/delete', authMiddleware, todoController.delete);
router.put('/todo/status', authMiddleware, todoController.status);

// ROUTING ENDED

module.exports = router;