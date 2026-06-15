import app from './app.js';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

dotenv.config({ path: './config.env' });
const port = process.env.PORT || 4000;

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`listening at ${port}`);
  });
});
