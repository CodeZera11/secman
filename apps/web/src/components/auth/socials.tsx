'use client'

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "@repo/ui/components/ui/button";
import { AUTHENTICATION_PROVIDERS_ENUM } from "@repo/types";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/constants/page-routes";

const Socials = () => {

  const handleProviderSignin = (provider: AUTHENTICATION_PROVIDERS_ENUM) => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT
    })
  }

  console.log("enum", AUTHENTICATION_PROVIDERS_ENUM?.GOOGLE)

  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => handleProviderSignin(AUTHENTICATION_PROVIDERS_ENUM.GOOGLE)}
      >
        <FcGoogle className="w-5 h-5" />
      </Button>
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => handleProviderSignin(AUTHENTICATION_PROVIDERS_ENUM.GITHUB)}
      >
        <FaGithub className="w-5 h-5" />
      </Button>
    </div>
  )
}

export default Socials