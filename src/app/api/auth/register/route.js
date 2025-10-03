import { connectDB } from "@/lib/dataBaseConnection";
import { response } from "@/lib/helperFunction";
import { loginSchema } from "@/lib/zodSchema";

import { SignJWT } from "jose";
import { sendMail } from "@/lib/sendMailer";
import { emailVerificationLink } from "../../../../../email/page";
import UserModel from "../../../../../models/user.model";

export async function POST(request) {
  try {
    await connectDB();
    const validationSchema = loginSchema.pick({
      Fname: true,
      Lname: true,
      email: true,
      password: true,
    });

    const payload = await request.json();
    const validationData = validationSchema.safeParse(payload);

    if (!validationData.success) {
      return response(
        false,
        401,
        "invalid or missing input",
        validationData.error
      );
    }

    const { Fname, Lname, email, password } = validationData.data;

    const register_user = new UserModel({
      name: `${Fname} ${Lname}`, // ✅ merge full name
      email,
      password,
    });

    await register_user.save();

    console.log("User saved:", register_user);

    const secret = new TextEncoder().encode(process.env.SECRET_KEY);
    const token = await new SignJWT({ userId: register_user._id.toString() }) // 👈 critical fix
      .setIssuedAt()
      .setExpirationTime("1h")
      .setProtectedHeader({ alg: "HS256" })
      .sign(secret);

    await sendMail(
      "email verification from ecom",
      email,
      emailVerificationLink(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/mailverify/${token}`
      )
    );

    return response(true, 200, "register successfully", register_user);
  } catch (error) {
    console.error("Error in register API:", error);
    return response(false, 500, "server error", error.message);
  }
}
