import { ZodError } from 'zod';
import AppError from '../utils/appError.js';

const formatIssue = (issue) => {
  const field = issue.path.join('.') || 'value';

  switch (issue.code) {
    case 'invalid_type':
      return `${field} is required`;
    case 'too_small':
      return `${field} must be at least ${issue.minimum} ${issue.type === 'string' ? 'characters' : ''}`.trim();
    case 'too_big':
      return `${field} must be at most ${issue.maximum} ${issue.type === 'string' ? 'characters' : ''}`.trim();
    case 'invalid_format':
      return `${field} is not a valid format`;
    default:
      return issue.message;
  }
};

export const validate = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      const message = error.issues.map(formatIssue).join(', ');
      return next(new AppError(message, 400));
    }
    next(error);
  }
};
