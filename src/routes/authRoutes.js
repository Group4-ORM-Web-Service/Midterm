const express = require('express');
const authRouter = express.Router();
const userController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

authRouter.post('/register', userController.register);
authRouter.post('/login', userController.login);
authRouter.get('/users', authMiddleware, userController.getUsersByPagination);
authRouter.delete('/users/delete', authMiddleware,  userController.deleteUser);

module.exports = authRouter;
