import express from 'express';
import * as UserController from '../controllers/user.controller';
import { newUserValidator } from '../validators/user.validator';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to create a new user
router.post('', UserController.newUser);

//get all users from the firestore database
router.get('', UserController.getAllUsers);

//route to update a single user with it's id
router.put('/:_id', UserController.updateUserById)

export default router;
