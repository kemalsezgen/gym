import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

import { handleError } from '../error.js';

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

      const token = jwt.sign({ id: newUser._id }, process.env.SECRET);

      const {password, ...otherData } = newUser._doc;

      res.cookie('accessToken', token, { httpOnly: true })
      .status(200)
      .json(otherData);

    } else {
      res.status(403).json('please provide a password');
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
}

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({
      email: req.body.email
    });

    if (!user) {return next(handleError(404, 'User not found'))}

    const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);

    if (!isPasswordCorrect) {return next(handleError(400, 'Password incorrect'))}

    const payload = {id: user._id}

    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '1d' });

    const {password, ...otherData} = user._doc;

    res.cookie('accessToken', token, {
      httpOnly: true
    }).status(200).json({otherData})

  } catch (err) {
    res.status(500).json(err.message);
  }
}

export const logout = (req, res) => {
  res.clearCookie('accessToken');
  res.status(200).json('Logout success');
}