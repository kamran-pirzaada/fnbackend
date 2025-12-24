import mongoose from "mongoose";

const annualSchema = new mongoose.Schema(
  {
    sno: Number,
    fileNo: String,
    clientName: String,
    companyName: String,
    cnic: String,
    password: String,
    documentsReceivedDate: String,
    status: String,
    mode: String,
    draftDate: String,
    submissionDate: String,
  },
  { timestamps: true }
);

export default mongoose.model("AnnualClient", annualSchema);
