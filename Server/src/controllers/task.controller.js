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

export const getTaskStats = async (req, res, next) => {
  const stats = await Task.aggregate([
    {
      $match: {
        userId: req.user._id,
      },
    },
    {
      $group: {
        _id: null,

        totalTasks: {
          $sum: 1,
        },

        completedTasks: {
          $sum: {
            $cond: [
              {
                $eq: ['$status', 'done'],
              },
              1,
              0,
            ],
          },
        },

        progressTasks: {
          $sum: {
            $cond: [
              {
                $eq: ['$status', 'progress'],
              },
              1,
              0,
            ],
          },
        },

        todoTasks: {
          $sum: {
            $cond: [
              {
                $eq: ['$status', 'todo'],
              },
              1,
              0,
            ],
          },
        },
      },
    },
  ]);

  const taskStats = stats[0] || {
    totalTasks: 0,
    completedTasks: 0,
    progressTasks: 0,
    todoTasks: 0,
  };

  // JS calculations (cleaner than Mongo)
  const completionRate =
    taskStats.totalTasks > 0
      ? Number(
          ((taskStats.completedTasks / taskStats.totalTasks) * 100).toFixed(2),
        )
      : 0;

  const pendingTasks = taskStats.todoTasks + taskStats.progressTasks;

  res.status(200).json({
    status: 'success',
    data: {
      totalTasks: taskStats.totalTasks,

      completedTasks: taskStats.completedTasks,

      progressTasks: taskStats.progressTasks,

      todoTasks: taskStats.todoTasks,

      pendingTasks,

      completionRate,
    },
  });
};
