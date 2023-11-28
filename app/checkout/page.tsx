import CheckoutForm from "@/components/CheckoutForm";

const Checkout = () => {
  return (
    <main className="mx-auto flex min-h-screen max-w-[1400px] flex-col items-center px-6 py-3 xl:px-16 xl:py-8">
      <section className="flex w-full flex-col rounded-lg bg-white px-4 py-6 dark:bg-primary-gray-850 md:w-1/3">
        <CheckoutForm />
      </section>
    </main>
  );
};

export default Checkout;
