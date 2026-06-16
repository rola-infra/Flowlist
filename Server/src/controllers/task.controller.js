import Task from '../models/task.model.js';
import AppError from '../utils/appError.js';
export const createTask = async (req, res) => {
  const task = await Task.create({ ...req.body, userId: req.user.id });
  res.status(201).json({
    status: 'success',
    data: {
      task,
    },
  });
};

export const getTasks = async (req, res) => {
  const tasks = await Task.find({
    userId: req.user.id,
  });

  res.status(200).json({
    status: 'success',
    results: tasks.length,
    data: {
      tasks,
    },
  });
};

export const getTaskById = async (req, res, next) => {
  const task = await Task.findOne({
    _id: req.params.id,
    userId: req.user.id,
  });

  if (!task) {
    return next(new AppError('task not found', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      task,
    },
  });
};

export const updateTask = async (req, res) => {
  const task = await Task.findOneAndUpdate(
    {
      _id: req.params.id,
      userId: req.user.id,
    },
    req.body,
    {
      new: true,
      runValidators: true,
    },
  );

  if (!task) {
    return res.status(404).json({
      status: 'fail',
      message: 'Task not found',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      task,
    },
  });
};

export const deleteTask = async (req, res) => {
  const task = await Task.findOneAndDelete({
    _id: req.params.id,
    userId: req.user.id,
  });

  if (!task) {
    return res.status(404).json({
      status: 'fail',
      message: 'Task not found',
    });
  }
  res.status(204).send();
};
