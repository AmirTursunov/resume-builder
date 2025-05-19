"use client";
import { SignIn, useUser } from "@clerk/nextjs";

const Login = () => {
  const { user } = useUser();
  return (
    <div className="flex justify-center" style={{ marginTop: "100px" }}>
      <div className="mt-5">
        <SignIn afterSignInUrl={`/dashboard/${user?.id}`} />
      </div>
    </div>
  );
};

export default Login;
