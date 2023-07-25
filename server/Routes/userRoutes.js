const express = require('express');

const router = express.Router()

const userController = require('../controller/userController')


// post user api 
router.post('/users',userController.createUser)

//get users api 
router.get('/users',userController.getUsers)

//get user by id : 
router.get('/users/:id', userController.getUserById);


// delete user api 
router.delete('/users/:id',userController.deleteUser)

//edit user api 
router.put('/users/:id',userController.editUser)


module.exports = router;
