import { model, Schema, Model, Document } from 'mongoose';

interface ITodo extends Document {
  value: string;
}

const TodoSchema: Schema = new Schema({
  value: { type: String, required: true }
})

export const Todo: Model<ITodo> = model('Todo', TodoSchema);
