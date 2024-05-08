'use client';

import CredentialInputForm from "../../components/input/CredentialInputForm"; // Import the missing component
import { useRouter } from "next/navigation";
import { CredentialInput } from "@/types/user";
import { FormEvent } from "react";

export default function RegisterPage() {
  const router = useRouter();

  const fetchPostUser = async (registerInput: CredentialInput) => {
    try {
      const response = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerInput), // Include other registration data here
      });

      if (response.ok) {
        //debug
        console.log("response: ", await response.json());
        router.push('/login');
      } else {
        console.error('Registration error.');
      }
    } catch (error) {
      console.error('Registration error:', error);
    };
  };

  const handleSubmit = async (e: FormEvent, registerInput: CredentialInput) => {
    e.preventDefault();
    await fetchPostUser(registerInput);
  }

    return (
      <div className="flex items-center justify-center h-screen">
        <CredentialInputForm handleSubmit={handleSubmit} buttonLabel="Registrieren"/>
      </div>
    );
}