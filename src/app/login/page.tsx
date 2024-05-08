"use client";
import CredentialInputForm from "@/components/input/CredentialInputForm";
import { CredentialInput } from "@/types/user";
import { signIn } from "next-auth/react";
import { FormEvent } from "react";

export default function LoginPage() {
  const handleSubmit = async (event:FormEvent, {username, password}: CredentialInput) => {
    event.preventDefault();
    await signIn("credentials", { 
      username, 
      password, 
      callbackUrl: '/' });
  }
  return (

      <div className="flex items-center justify-center h-screen bg-white">
        <CredentialInputForm handleSubmit={handleSubmit} buttonLabel="Login"/>
      </div>

  )
}