import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      require: true,
    },
    otp: {
      type: String,
      require: true,
    },
    expireAt: {
      type: Date,
      require: true,
      default: () => new Date(Date.now() + 10 * 60 * 1000),
    },
  },
  { timestamps: true }
);

otpSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

const optModel = mongoose.models.Otp || mongoose.model("Otp", otpSchema);
export default optModel;
