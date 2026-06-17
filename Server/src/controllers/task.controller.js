import Task from '../models/task.model.js';
import AppError from '../utils/appError.js';
import { apiFeatures } from '../utils/apiFeatures.js';
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
  console.log(req.query);

  const features = new apiFeatures(
    Task.find({
      userId: req.user.id,
    }),
    req.query,
  )
    .filter()
    .search()
    .sort()
    .paginate();

  const tasks = await features.query;

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

export const updateTask = async (req, res, next) => {
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
    return next(new AppError('task not found', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      task,
    },
  });
};

export const deleteTask = async (req, res, next) => {
  const task = await Task.findOneAndDelete({
    _id: req.params.id,
    userId: req.user.id,
  });

  if (!task) {
    return next(new AppError('task not found', 404));
  }
  res.status(204).send();
};

export const getTaskStats = async (req, res) => {
  const stats = await Task.aggregate([
    {
      $match: { userId: req.user._id },
    },
    {
      $group: {
        _id: '$priority',
        count: { $sum: 1 },
      },
    },
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      stats,
    },
  });
};
