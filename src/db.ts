import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb://mongo:LWgoIXEKztAiGBjlfAIJVVoEtLZqfGdL@maglev.proxy.rlwy.net:28405'


export const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err);
  }
};
