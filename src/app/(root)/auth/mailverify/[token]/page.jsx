"use client";
import axios from "axios";
import React, { use, useEffect } from "react";

const MailVerification = ({ params }) => {
  let { token } = use(params);
  console.log(params);
  useEffect(() => {
    const getData = async () => {
      let data = axios.post("/api/auth/verify-email", { token });
    };
    getData();
  }, [token]);
  return <div>MailVerification</div>;
};

export default MailVerification;
