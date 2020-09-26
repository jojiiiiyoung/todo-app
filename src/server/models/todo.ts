import mongoose, { Schema, Document } from 'mongoose';

export interface TodoPopulatedInterface {
  id: number;
  isComplete: boolean;
  content: string;
  related: TodoInterface[];
}

export interface TodoInterface extends Document {
  id: number;
  isComplete: boolean;
  content: string;
  related: string[];
}

const todoSchema = new Schema(
  {
    id: Number,
    isComplete: { type: Boolean, default: false },
    content: { type: String, required: true },
    related: { type: [Schema.Types.ObjectId], default: [] },
  },
  { timestamps: true }
);

const Todo = mongoose.model('todo', todoSchema);

export default Todo;
