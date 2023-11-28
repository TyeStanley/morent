import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <main className="mt-20 flex h-screen justify-center">
      <SignIn />
    </main>
  );
}
