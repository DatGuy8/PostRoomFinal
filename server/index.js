import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './config/connectDB.js';
import userRouter from './routes/user.routes.js';
import postRouter from './routes/post.routes.js';
import commentRouter from './routes/comment.routes.js';

dotenv.config();
const app = express();
app.use(cors());

app.use(express.json({ limit: '50mb' }));
app.use('/api/users',userRouter);
app.use('/api/posts',postRouter);
app.use('/api/comments',commentRouter);


const startServer = async () => {
  try {
      connectDB(process.env.MONGODB_URL);
      app.listen(8080, () => console.log('Server started on port http://localhost:8080'));
  } catch (error) {
      console.log(error);
  }
}

startServer();