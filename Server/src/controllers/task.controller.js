import Task from '../models/task.model.js';

export const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        task,
      },
    });
  } catch (error) {
    console.log(error.message);

    res.status(500).json({
      status: 'fail',
      message: error.message,
    });
  }
};

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();

    res.status(200).json({
      status: 'success',
      results: tasks.length,
      data: {
        tasks,
      },
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      status: 'fail',
      message: error.message,
    });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

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
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      status: 'fail',
      message: error.message,
    });
  }
};

export const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

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
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      status: 'fail',
      message: error.message,
    });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({
        status: 'fail',
        message: 'Task not found',
      });
    }
    res.status(204).send();
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      status: 'fail',
      message: error.message,
    });
  }
};
