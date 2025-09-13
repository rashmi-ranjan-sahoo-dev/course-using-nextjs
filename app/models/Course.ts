import mongoose, { Schema, Document, models } from "mongoose";

export interface IVideo {
  title: string;
  url: string;
  duration?: number;
  isPreview?: boolean;
}

export interface ICourse extends Document {
  title: string;
  description: string;
  price: number;
  imageUrl?: string;
  creatorId?: mongoose.Types.ObjectId;   // ✅ optional
  videos: IVideo[];
}


const videoSchema = new Schema<IVideo>({
  title: { type: String, required: true },
  url: { type: String, required: true },
  duration: { type: Number },
  isPreview: { type: Boolean, default: false },
});

const courseSchema = new Schema<ICourse>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String },
  // ❌ remove this line if you don’t want creatorId
  // creatorId: { type: Schema.Types.ObjectId, required: true },
  videos: [videoSchema],
});


export const CourseModel =
  models.Course || mongoose.model<ICourse>("Course", courseSchema);
