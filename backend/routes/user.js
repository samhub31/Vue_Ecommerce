import express from 'express';
import bcrypt from 'bcryptjs'
import User from '../models/user.js';
import { generateToken } from '../utils.js';

const userRouter = express.Router();

userRouter.post('/signin', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user)
    });
  } else {
    res.status(401).send({ message: 'Invalid email or password' });
  }
});

userRouter.post('/signout', (req, res) => {
  res.clearCookie('connect.sid');
  res.json({ message: 'Signed out successfully' });
});



userRouter.post(
  "/signup",
 async (req, res) => {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
    });
    const userExist = await User.findOne({ email: req.body.email });
    if(userExist){
      res.status(400).send({message: "Email already exists..."});
    }

      const user = await newUser.save();
      res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user),
      });


  }
);



export default userRouter;