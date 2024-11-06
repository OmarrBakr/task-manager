const Task = require('../models/Task');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');
const ApiResponse = require('../custom-response/ApiResponse');

const getAllTasks = async (req, res) => {
  const { status } = req.query;

  let filter = { createdBy: req.user.userId };

  if (status) {
    if (status === 'completed') {
      filter.completed = true;
    } else if (status === 'incomplete') {
      filter.completed = false;
    } else if (status === 'all') {
    } else {
      throw new BadRequestError(`Invalid status. Use 'completed', 'incomplete', or 'all'`);
    }
  }

  const tasks = await Task.find(filter).sort('createdAt');

  const response = new ApiResponse({
    msg: 'Tasks retrieved successfully',
    data: { tasks, count: tasks.length },
    statusCode: StatusCodes.OK,
  });
  
  res.status(response.statusCode).json(response);
};

  
const getTask = async (req, res) => {
  const {
    user: { userId },
    params: { id: taskId },
  } = req;

  const task = await Task.findOne({
    _id: taskId,
    createdBy: userId,
  });
  if (!task) {
    throw new NotFoundError(`No task with id ${taskId}`);
  }
  const response = new ApiResponse({
    msg: 'Task retrieved successfully',
    data: task,
    statusCode: StatusCodes.OK,
  });
  res.status(response.statusCode).json(response);
};
  
const createTask = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const task = await Task.create(req.body);
  const response = new ApiResponse({
    msg: 'Task created successfully',
    data: task,
    statusCode: StatusCodes.CREATED,
  });
  res.status(response.statusCode).json(response);
};
  
const updateTask = async (req, res) => {
  const {
    body: { name, completed },
    user: { userId },
    params: { id: taskId },
  } = req;

  if (name === '') {
    throw new BadRequestError('Name field cannot be empty');
  }
  
  const task = await Task.findOneAndUpdate(
    { _id: taskId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!task) {
    throw new NotFoundError(`No task with id ${taskId}`);
  }
  const response = new ApiResponse({
    msg: 'Task updated successfully',
    data: task,
    statusCode: StatusCodes.OK,
  });
  res.status(response.statusCode).json(response);
};
  
const deleteTask = async (req, res) => {
  const {
    user: { userId },
    params: { id: taskId },
  } = req;

  const task = await Task.findOneAndRemove({
    _id: taskId,
    createdBy: userId,
  });
  if (!task) {
    throw new NotFoundError(`No task with id ${taskId}`);
  }
  const response = new ApiResponse({
    msg: 'Task deleted successfully',
    statusCode: StatusCodes.OK,
  });
  res.status(response.statusCode).json(response);
};
  
module.exports = {
  createTask,
  deleteTask,
  getAllTasks,
  updateTask,
  getTask
};