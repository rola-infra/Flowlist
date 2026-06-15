import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
      minlength:1,
      maxlength: 200,
    },

    description: {
      type: String,
      trim: true,
      maxlength: 2000,
    
    },

    status: {
      type: String,
      enum: ['todo', 'progress', 'done'],
      default: 'todo',
    },

    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },

    dueDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

taskSchema.index({
  userId: 1,
  status: 1,
});

const Task = mongoose.model('Task', taskSchema);

export default Task;
