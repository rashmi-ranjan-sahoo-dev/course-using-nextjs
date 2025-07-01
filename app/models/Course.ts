import mongoose, { Schema , Document, models} from "mongoose";

export interface IVdieo {
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
    creatorId: mongoose.Types.ObjectId;
    videos:IVdieo[]
}

const videoSchema = new Schema<IVdieo>({
    title: { type: String, required: true},
    url: { type: String, required: true},
    duration: Number,
    isPreview: { type: Boolean, default: false },
});

const courseSchema = new Schema<ICourse>({
    title: {title: String, required: true},
    description: String,
    price: Number,
    imageUrl: String,
    creatorId: { type: Schema.Types.ObjectId, ref: "Admin", required: true},
    videos: [videoSchema],
});

export const Course = models.Course || mongoose.model<ICourse>("Course", courseSchema);

