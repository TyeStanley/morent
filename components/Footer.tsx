import { footerLinks } from "@/constants";
import Link from "next/link";

type FooterColumnProps = {
  title: string;
  links: Array<string>;
};

const FooterColumn = ({ title, links }: FooterColumnProps) => (
  <div className="flex min-w-max flex-1 flex-col gap-3 text-sm">
    <h4 className="mb-3 text-xl font-semibold leading-5 text-primary-gray-900 dark:text-white">
      {title}
    </h4>
    <ul className="flex flex-col gap-4 text-base font-medium leading-5 text-primary-gray-400 dark:text-white">
      {links.map((link) => (
        <Link href="/" key={link}>
          {link}
        </Link>
      ))}
    </ul>
  </div>
);

const Footer = () => {
  return (
    <footer className="mx-auto flex w-full max-w-[1400px] flex-col items-center justify-start gap-8 bg-white px-6 py-12 dark:bg-primary-gray-900 md:gap-14 md:py-20 xl:px-16">
      <section className="flex w-full flex-col gap-12 md:flex-row md:justify-between">
        <div className="flex flex-col items-start">
          <Link href="/">
            <h1 className="cursor-pointer text-2xl font-bold uppercase text-primary-blue-500 md:text-[32px]">
              Morent
            </h1>
          </Link>
          <p className="mt-3 max-w-[216px] text-start text-xs font-medium leading-8 text-primary-gray-400 dark:text-white md:mt-6 md:max-w-[292px] md:text-base">
            Our vision is to provide convenience and help increase your sales
            business.
          </p>
        </div>
        <div className="flex flex-wrap gap-12 md:gap-20">
          <FooterColumn
            title={footerLinks[0].title}
            links={footerLinks[0].links}
          />
          <FooterColumn
            title={footerLinks[1].title}
            links={footerLinks[1].links}
          />
          <FooterColumn
            title={footerLinks[2].title}
            links={footerLinks[2].links}
          />
        </div>
      </section>
      <hr className="md:w-full md:border md:border-blue-50 dark:md:border-primary-gray-850" />
      <section className="flex w-full flex-col-reverse items-center justify-between gap-6 text-xs font-semibold text-primary-gray-800 dark:text-white sm:flex-row sm:text-base">
        <p className="w-full text-start font-semibold">
          @2023 MORENT. All rights reserved
        </p>
        <div className="flex w-full items-center justify-between md:justify-end md:gap-10">
          <p>Privacy & Policy</p>
          <p>Terms & Conditions</p>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
