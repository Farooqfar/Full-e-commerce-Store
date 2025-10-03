import { connectDB } from "@/lib/dataBaseConnection";
import { jwtVerify } from "jose";
import { NextResponse } from "next/server";
import UserModel from "../../../../../models/user.model";

export async function POST(request) {
  try {
    await connectDB();
    console.log("DB connected ✅");

    const { token } = await request.json();
    console.log("Received token:", token);

    if (!token) {
      return NextResponse.json(
        { success: false, message: "No token provided" },
        { status: 400 }
      );
    }

    const secret = new TextEncoder().encode(process.env.SECRET_KEY);
    let decoded;
    try {
      decoded = await jwtVerify(token, secret);
      console.log("Decoded payload:", decoded.payload);
    } catch (err) {
      console.error("JWT verification failed ❌:", err);
      return NextResponse.json(
        { success: false, message: "Invalid or expired token" },
        { status: 401 }
      );
    }

    const userId = decoded.payload.userId;
    const user = await UserModel.findById(userId);
    console.log("User found:", user);

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    if (!user.isEmailVerified) {
      user.isEmailVerified = true;
      await user.save();
      console.log("User verified ✅");
    }

    return NextResponse.json(
      { success: true, message: "Email verified successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Verify API Error (catch):", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
