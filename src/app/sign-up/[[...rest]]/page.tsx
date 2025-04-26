"use client";

import { SignUp } from "@clerk/nextjs";
const SignUpPage = () => {
  return (
    <div className="d-flex justify-content-center mt-5">
      <SignUp />
    </div>
  );
};

export default SignUpPage;
