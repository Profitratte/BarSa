"use client";

import { SessionUser } from "@/types/user";
import { signOut } from "next-auth/react";

type UserInfoProps = {
  user: SessionUser;
}

export default function UserInfo({ user }: UserInfoProps) {
  const handleLogout = async () => {
    await signOut();
  }

  return(
   <div className="rounded-lg border shadow-lg p-10">
      <div>
        Id : {user.id}
      </div>
      <button className="font-medium mt-2 text-blue-600 hover:underline" onClick={handleLogout}>
        Log out
      </button>
    </div>
  );
}