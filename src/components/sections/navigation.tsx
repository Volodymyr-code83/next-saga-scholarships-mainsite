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
              src="/logo.png"
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
