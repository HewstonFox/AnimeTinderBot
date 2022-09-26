import mongoose from 'mongoose';

export const connectDB = () => mongoose.connect(process.env.MONGODB_URL, {
  dbName: 'AnimeTinderDB'
});
