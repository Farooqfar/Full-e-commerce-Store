import { connectDB } from "@/lib/dataBaseConnection";
import { loginSchema } from "@/lib/zodSchema";
import z, { success } from "zod";
import UserModel from "../../../../../models/user.model";
import optModel from "../../../../../models/otp.model";
import { NextResponse } from "next/server";
import { sendMail } from "@/lib/sendMailer";
import { otpEmail } from "@/opt-temp/otpEmail";
import { cookies } from "next/headers";
import { SignJWT } from "jose";

export async function POST(request) {
  try{
    await connectDB();
  const payload = await request.json();
  const validationSchema = loginSchema
    .pick({
      email: true,
    })
    .extend({
      password: z.string(),
    });

  const validationData = validationSchema.safeParse(payload);
  const { email, password } = validationData.data;
  const getuser = await UserModel.findOne({ deletedAt: null, email }).select(
    "+password"
  );
  const secret = new TextEncoder().encode(process.env.SECRET_KEY);
  const token = await new SignJWT({ userId: getuser._id })
    .setIssuedAt()
    .setExpirationTime("1d")
    .setProtectedHeader({ alg: "HS256" })
    .sign(secret);
  const ispassword = await getuser.comparePassword(password);
  if (ispassword) {
    let saveCookies = cookies();
    saveCookies.set("login_token", secret);
    const data = {
      id: getuser._id,
      name: getuser.name,
      role: getuser.role,
      email: getuser.email,
    };
    return NextResponse.json({
      success: true,
      status: 201,
      data: data,
    });
  }

  await optModel.deleteMany({ email });

  const optGenerate = () => {
    let opt = Math.floor(100000 + Math.random() * 900000).toString();
    return opt;
  };

  const otp = optGenerate();

  console.log(otp);

  const newOtp = await optModel({
    email,
    otp,
  });

  await newOtp.save();
  const otpmail = await sendMail("your otp", email, otpEmail(otp));
}}catch(error){
  return NextResponse({
    status:400,
    success:false
  })
}
