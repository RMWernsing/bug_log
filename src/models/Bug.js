import { Schema } from "mongoose";

export const BugSchema = new Schema(
  {
    title: { type: String, minLength: 10, maxLength: 50, required: true },
    description: { type: String, minLength: 10, maxLength: 500, required: true },
    priority: { type: Number, min: 1, max: 5, required: true },
    // NOTE default might need to be change
    closed: { type: Boolean, default: false, required: true },
    // TODO make sure this is the proper date time stamp for when bug is closed
    closedDate: { type: Date },
    creatorId: { type: Schema.ObjectId, required: true, ref: 'Account' }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }
  }
)
BugSchema.virtual('creator', {
  ref: 'Account',
  justOne: true,
  localField: 'creatorId',
  foreignField: '_id'
})