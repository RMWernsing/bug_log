import { Schema } from "mongoose";

export const TrackedBugSchema = new Schema(
  {
    accountId: { type: Schema.ObjectId, ref: 'Account', required: true },
    bugId: { type: Schema.ObjectId, ref: 'Bug', required: true },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true }
  }
)