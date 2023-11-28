import Button from "./Button";

const CheckoutForm = () => {
  return (
    <form className="w-full">
      <h2 className="my-6 text-base font-extrabold text-primary-blue-500 dark:text-primary-blue-300 md:text-xl">
        Card Details
      </h2>
      <article className="flex w-full flex-col gap-2">
        <label className="text-sm font-semibold text-primary-gray-900 dark:text-white">
          Email
        </label>
        <input
          className="h-11 w-full rounded-md bg-light-white-200 pl-3 text-xs text-primary-gray-900 dark:bg-primary-gray-800 dark:text-white"
          type="email"
          placeholder="Your email"
        />
        <label className="text-sm font-semibold text-primary-gray-900 dark:text-white">
          Name on Card
        </label>
        <input
          className="h-11 w-full rounded-md bg-light-white-200 pl-3 text-xs text-primary-gray-900 dark:bg-primary-gray-800 dark:text-white"
          type="text"
          placeholder="Full Name on card"
        />
        <label className="text-sm font-semibold text-primary-gray-900 dark:text-white">
          Card Details
        </label>
        <input
          className="h-11 w-full rounded-md bg-light-white-200 pl-3 text-xs text-primary-gray-900 dark:bg-primary-gray-800 dark:text-white"
          type="text"
          placeholder="4242 4242 4242 4242"
        />
        <div className="flex flex-row">
          <input
            className="h-11 w-full rounded-md bg-light-white-200 pl-3 text-xs text-primary-gray-900 dark:bg-primary-gray-800 dark:text-white"
            type="text"
            placeholder="MM / YY"
          />
          <input
            className="h-11 w-full rounded-md bg-light-white-200 pl-3 text-xs text-primary-gray-900 dark:bg-primary-gray-800 dark:text-white"
            type="number"
            placeholder="CVC"
          />
        </div>
        <Button
          bgColor="bg-primary-blue-500"
          textColor="text-white"
          title="Pay $133.23"
          btnType="submit"
          extraStyles="mt-3"
        />
      </article>
    </form>
  );
};

export default CheckoutForm;
