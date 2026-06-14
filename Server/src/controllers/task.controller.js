import Task from '../models/task.model.js';

export const createTask = (req, res) => {
  try {
    console.log(req.body);
    res.status(200).json({
      status: 'success',
      message: 'this is createtask router',
    });
  } catch (error) {
    console.log(error.messgae);
  }
};

export const getTasks = (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'this is gettasks router',
  });
};

export const updateTask = (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'this is updatetask router',
  });
};

export const deleteTask = (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'this is deletetask router',
  });
};
