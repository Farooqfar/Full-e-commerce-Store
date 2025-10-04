"use client";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ZodSchema } from "zod/v3";
import z, { email } from "zod";
import { loginSchema } from "@/lib/zodSchema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ButtonLoading } from "@/components/Application/ButtonLoading";
import Link from "next/link";
import {
  WEBSITE_FORGET_PASSWORD,
  WEBSITE_REGISTER,
} from "../../../../../routes/website";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../../../../../store/reducer/authReducer";
export default function ForgetPassword() {
  const dispatch = useDispatch();
  const formSchema = loginSchema
    .pick({
      email: true,
    })
    .extend({
      password: z.string().min("3", "Password must be required"),
    });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (value) => {
    let { data } = await axios.post("/api/auth/login", value);
    console.log(data.data);
    dispatch(login(data.data));
  };
  return (
    <div>
      <Card className="w-[400px]">
        <CardContent>
          <div className="text-center">
            <h1 className="font-bold">Forget Password</h1>
          </div>
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <div>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Enter Your Email"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>Enter a Email</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Password****"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>Enter a password</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <ButtonLoading
                    type="submit"
                    text="login"
                    className="w-full cursor-pointer"
                  />
                </div>
                <div className="flex flex-col">
                  <Link
                    href={WEBSITE_REGISTER}
                    className="text-primary underline"
                  >
                    Regsiter
                  </Link>
                  <Link
                    href={WEBSITE_FORGET_PASSWORD}
                    className="text-primary underline"
                  >
                    Froget password
                  </Link>
                </div>
              </form>
            </Form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
