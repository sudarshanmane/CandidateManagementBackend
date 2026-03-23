import mongoose, { Document, Schema } from "mongoose";

export interface IOrganization extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  domain: string;
  industry: string;
}

const OrgSchema = new Schema<IOrganization>(
  {
    name: { type: String, required: true, trim: true },
    domain: { type: String, required: true, trim: true, unique: true },
    industry: { type: String },
  },
  { timestamps: true },
);

export const Organization = mongoose.model<IOrganization>(
  "Organization",
  OrgSchema,
);
