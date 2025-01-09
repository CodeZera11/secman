"use client";
import { login } from "@/actions/auth";
import { Button } from "@repo/ui/components/ui/button";
import React from "react";

const LoginGithub = () => {

  const [loading, setLoading] = React.useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      await login("github");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      onClick={handleLogin}
      disabled={loading}
    >
      <p className="text-white">
        {loading ? "Loading..." : "Login with Github"}
      </p>
    </Button>
  );
};

export default LoginGithub;