import { Form } from "@/components";

const NewCar = async () => {
  return (
    <main className="mx-auto flex min-h-screen max-w-[1400px] flex-col items-center px-6 py-3 xl:px-16 xl:py-8">
      <section className="flex w-full flex-col rounded-lg bg-white px-4 py-6 dark:bg-primary-gray-850">
        <div className="inline-flex flex-col justify-start gap-2">
          <h1 className="text-base font-bold text-primary-gray-900 dark:text-white md:text-xl">
            Add a Car for Rent
          </h1>
          <p className="text-xs font-medium text-primary-gray-400 md:text-sm">
            Please enter your car info
          </p>
        </div>
        <Form />
      </section>
    </main>
  );
};

export default NewCar;
