import React from "react";
import { UserProfile } from "@clerk/nextjs";

export default function Edit() {
  return (
    <main className="my-7 flex items-center justify-center">
      <UserProfile />
    </main>
  );
}
