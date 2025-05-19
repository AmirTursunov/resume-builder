"use client";

import { SignUp } from "@clerk/nextjs";
const SignUpPage = () => {
  return (
    <div className="flex justify-center" style={{ marginTop: "100px" }}>
      <SignUp />
    </div>
  );
};

export default SignUpPage;
