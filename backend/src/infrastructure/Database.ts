import mongoose from 'mongoose';

export class Database {
  static async connect(): Promise<void> {
    const uri = process.env.MONGO_URI;

    if (!uri) {
      throw new Error('MONGO_URI is not defined');
    }

    try {
      await mongoose.connect(uri);
      console.log('✓ MongoDB connected successfully');
    } catch (error) {
      console.error('✗ MongoDB connection failed:', error);
      throw error;
    }
  }
}
