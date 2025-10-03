import { NextResponse } from "next/server";
import { success } from "zod";

export const response = (success, status, message, data = {}) => {
  return NextResponse.json({
    success,
    status,
    data,
    message,
  });
};
