import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const RedirectDashbaord = () => {
  return (
    <div className="h-screen max-h-screen w-full flex flex-col items-center justify-center">
      <div className="relative w-[180px] h-[65px] md:w-[220px] md:h-[72px] hover:scale-110 transition-all ease-in-out -mt-20">
        <Image
          quality={100}
          className=" object-contain"
          fill
          src="/logo.png"
          alt="Logo"
        />
      </div>
      <h2 className="text-base px-4 md:px-0 md:text-xl text-[#131E42] font-normal text-center max-w-xl mt-2">
        Thank you for submitting your documents, you will receive an email to
        confirm the status of your application.
      </h2>
      <Link href="/" className="mt-4">
        <Button className=" hover:-translate-y-1 ease-in-out transition-all duration-300">
          Continue to homepage
        </Button>
      </Link>
    </div>
  );
};

export default RedirectDashbaord;
