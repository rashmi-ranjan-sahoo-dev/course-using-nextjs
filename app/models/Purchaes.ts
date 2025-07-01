import mongoose, { Schema, Document, models } from "mongoose";

export interface IPurchase extends Document {
  userId: mongoose.Types.ObjectId;
  courseId: mongoose.Types.ObjectId;
}


const purchaseSchema = new Schema<IPurchase>({
    userId: {type: Schema.Types.ObjectId, ref: "User", required: true},
    courseId: {type: Schema.Types.ObjectId, ref: "Course", required: true}
})

export const Purchase = models.Purchase || mongoose.model<IPurchase>("Purchase",purchaseSchema);