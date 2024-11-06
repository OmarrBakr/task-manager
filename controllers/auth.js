const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')
const ApiResponse = require('../custom-response/ApiResponse');

const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  const response = new ApiResponse({
    msg: 'User registered successfully',
    data: { user: { name: user.name, email: user.email }, token },
    statusCode: StatusCodes.CREATED,
  });
  res.status(response.statusCode).json(response);
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError('Please provide email and password');
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError('Invalid Credentials');
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid Credentials');
  }

  const token = user.createJWT();
  const response = new ApiResponse({
    msg: 'User logged in successfully',
    data: { user: { name: user.name }, token },
    statusCode: StatusCodes.OK,
  });
  res.status(response.statusCode).json(response);
};

module.exports = {
  register,
  login,
};
