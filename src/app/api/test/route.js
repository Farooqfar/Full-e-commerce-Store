import { connectDB } from "@/lib/dataBaseConnection";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  return NextResponse.json({
    success: true,
    status: 201,
    message: "connect DB",
  });
}
