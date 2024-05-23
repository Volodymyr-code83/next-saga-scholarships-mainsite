"use client";

import Image from "next/image";
import Link from "next/link";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "../ui/sheet";
import Wrapper from "../wrapper/wrapper";

import { useEffect, useState } from "react";
import { NavItems } from "../ui/nav-items";
import NavActions from "../ui/nav-actions";
import { ArrowRight, Menu } from "lucide-react";
import { Button } from "../ui/button";

const NavigationSection = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // You can adjust the scroll threshold as needed
      const scrollThreshold = 10;

      if (scrollY >= scrollThreshold) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div
      className={`w-full py-2 sticky top-0 z-[999999] ${
        isScrolled ? " bg-white/30 backdrop-blur-lg" : " bg-transparent "
      }`}
      id="home"
    >
      <Wrapper className="flex flex-row justify-between items-center 2xl:px-40">
        <Link href="/" className="">
          <div className="relative w-[135px] h-[55px] md:w-[135px] md:h-[55px] hover:scale-110 transition-all ease-in-out">
            <Image
              quality={100}
              className=" object-contain"
              fill
              src={"data:image/png;base64,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"}
              alt="Logo"
            />
          </div>
        </Link>

        <div className="hidden lg:block">
          <div className="flex flex-row items-center ml-10 gap-10 2xl:gap-16 w-full">
            <NavItems />
          </div>
        </div>

        <div className="hidden lg:block ">
          <NavActions />
        </div>

        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger>
              <div className="primary-button-small-backdrop px-5 xl:p-[3px] rounded-[14px] ">
                <div className="primary-button-small aspect-square   font-medium rounded-[12px] px-2.5 py-2.5">
                  <Menu />
                </div>
              </div>
            </SheetTrigger>
            <SheetContent side="left" className="z-[999999]">
              <SheetClose asChild>
                <Link href="/">
                  <div className="relative w-[135px] h-[55px] md:w-[135px] md:h-[55px] hover:scale-110 transition-all ease-in-out">
                    <Image
                      fill
                      src="/logo.png"
                      className=" object-contain object-center"
                      quality={100}
                      alt="Fashva logo"
                    />
                  </div>
                </Link>
              </SheetClose>
              <div className="w-full flex flex-col items-start justify-start mt-10">
                <div className="text-black font-normal text-lg flex flex-col items-start">
                  <SheetClose asChild>
                    <Link href="/">
                      <h4 className="mt-4">Home</h4>
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href="/#about-us">
                      <h4 className="mt-4">About Us</h4>
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href="/#services">
                      <h4 className="mt-4">Services</h4>
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href="/#news">
                      <h4 className="mt-4">News</h4>
                    </Link>
                  </SheetClose>

                  <div className="w-full flex items-start gap-3 mt-6">
                    <SheetClose asChild>
                      <Link href="/#contact">
                        <Button className=" group">
                          Contact Us{" "}
                          <div className="h-6 w-6 ml-4 aspect-square rounded-full bg-white flex items-center justify-center">
                            <ArrowRight className="h-4 w-4 text-black group-hover:-rotate-45 transition-all ease-in-out duration-300" />
                          </div>
                        </Button>
                      </Link>
                    </SheetClose>
                    {/* <SheetClose asChild>
                      <Link href="/login">
                        <Button className=" bg-transparent" variant="outline">
                          Login
                        </Button>
                      </Link>
                    </SheetClose> */}
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </Wrapper>
    </div>
  );
};

export default NavigationSection;
