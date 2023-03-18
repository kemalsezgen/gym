import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  try {
    if (req.body.password) {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(req.body.password, salt);

      const newUser = new User({
        name: req.body.name,
        surname: req.body.surname,
        type: req.body.type,
        email: req.body.email,
        password: hashedPassword
      })

      await newUser.save();
      res.status(201).json('New User Created');
    } else {
      res.status(403).json('please provide a password');
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
}

export const login = async (req, res) => {
   try {
    const user = await User.findOne({
      email: req.body.email
    });

    if(!user) {
      return res.status(404).json('no user found');
    }

    const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);

    if(!isPasswordCorrect) {
      return res.status(400).json('wrong password');
    }

    const payload = {
      id: user._id
    }

    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '1d'});
    res.cookie('accessToken', token, {
      httpOnly: true
    }).status(200).json({
      email: user.email
    })

   } catch(err) {
    res.status(500).json(err.message);
   }
}

export const logout = (req, res) => {
  res.clearCookie('accessToken');
  res.status(200).json('Logout success');
}