import mongoose, { Schema, Document } from 'mongoose';

export interface TodoInterface extends Document {
  id: number;
  isComplete: boolean;
  content: string;
  createdAt: number;
}

const todoSchema = new Schema({
  id: Number,
  isComplete: { type: Boolean, default: false },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Todo = mongoose.model('todo', todoSchema);

export default Todo;
