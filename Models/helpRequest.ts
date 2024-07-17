import mongoose, { Document, Schema } from 'mongoose';

export interface IHelpRequest extends Document {
  id: number,
  title: string;
  description: string;
  location: string;
  status: string;
  priority: string;
  volunteerId: number;
}

const helpRequest: Schema = new Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  status: { type: String, required: true },
  priority: { type: String, required: true },
  volunteerId: { type: Number, required: true },
});

export default mongoose.model<IHelpRequest>('HelpRequest', helpRequest);
