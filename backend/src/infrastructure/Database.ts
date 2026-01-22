import mongoose from 'mongoose';

export class Database {
  static async connect(uri: string): Promise<void> {
    try {
      await mongoose.connect(uri);
      console.log('✓ MongoDB connected successfully');
    } catch (error) {
      console.error('✗ MongoDB connection failed:', error);
      throw error;
    }
  }

  static async disconnect(): Promise<void> {
    try {
      await mongoose.disconnect();
      console.log('✓ MongoDB disconnected');
    } catch (error) {
      console.error('✗ MongoDB disconnection failed:', error);
      throw error;
    }
  }
}
