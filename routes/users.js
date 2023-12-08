import express from 'express';
import { getUsers,createUser,deleteUser,updateUser,getUserById,login } from '../controllers/users.js';
import authmiddleware from '../middleware/authmiddleware.js';



const router = express.Router();



router.post('/login', login);

router.post('/createUser', createUser);

router.delete('/deleteUser/:id', deleteUser);
router.get('/getUserById/:id', getUserById)
router.put('/updateUser/:id', updateUser);

router.use(authmiddleware);


router.get('/getUsers', getUsers);
router.delete('/deleteUser/:id', deleteUser);




router.get('/protected', authmiddleware, (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
  });

export default router;