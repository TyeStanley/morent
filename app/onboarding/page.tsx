import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { fetchUser } from "@/lib/actions/user.actions";
import OnboardingForm from "@/components/OnboardingForm";

async function Page() {
  // get user from clerk
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (userInfo?.onboarded) redirect("/");

  const fullName = `${user.firstName} ${user.lastName}`;

  const userData = {
    id: user.id,
    objectId: userInfo?._id,
    name: userInfo?.name || fullName || "",
    image: userInfo?.image || user.imageUrl,
    coverImage: "",
  };

  return (
    <main className="flex min-h-screen flex-col items-center px-6 py-3 sm:px-16 sm:py-8">
      <section className="flex w-full flex-col rounded-lg bg-white px-4 py-6 dark:bg-primary-gray-850 lg:w-4/5 xl:w-3/5">
        <div className="inline-flex flex-col justify-start gap-2">
          <h1 className="text-base font-bold text-primary-gray-900 dark:text-white md:text-xl">
            Complete your profile now to use Morent
          </h1>
        </div>
        <OnboardingForm user={userData} />
      </section>
    </main>
  );
}

export default Page;
