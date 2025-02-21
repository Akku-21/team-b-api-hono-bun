import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb://localhost:27017/myapp';

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err);
  }
};
