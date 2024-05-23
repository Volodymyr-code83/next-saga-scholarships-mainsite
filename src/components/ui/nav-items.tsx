"use client";

import Link from "next/link";
import { useLayoutEffect, useState } from "react";
import { motion } from "framer-motion";

const navigation = [
  { name: "Home", link: "/#hero" },
  { name: "About Us", link: "/#about" },
  //{ name: "Overview", link: "/#overview" },
  { name: "Services", link: "/#services" },
  // { name: "Staff", link: "/#staff" },
  { name: "News", link: "/#news" },
  { name: "Contact Us", link: "/#contact" },
];

const useScrollspy = (ids: any, offset = 0) => {
  const [activeId, setActiveId] = useState("");

  useLayoutEffect(() => {
    const listener = () => {
      const scroll = window.pageYOffset;
      const positions = ids.map((id: any) => {
        const element = document.getElementById(id);
        if (!element) return { id, top: -1, bottom: -1 };
        const rect = element.getBoundingClientRect();
        const top = rect.top + scroll - offset;
        const bottom = rect.bottom + scroll - offset;
        return { id, top, bottom };
      });
      const activePosition = positions.find(
        ({ top, bottom }: { top: any; bottom: any }) =>
          scroll >= top && scroll < bottom
      );
      setActiveId(activePosition ? activePosition.id : "");
    };

    listener();

    window.addEventListener("resize", listener);
    window.addEventListener("scroll", listener);

    return () => {
      window.removeEventListener("resize", listener);
      window.removeEventListener("scroll", listener);
    };
  }, [ids, offset]);

  return activeId;
};

export const NavItems = () => {
  const ids = navigation.map((item) => item.link.slice(2)); // Extract section IDs from links
  const activeLink = useScrollspy(ids, 54); // Assuming navigation height is 54px

  return (
    <div className="flex gap-10 w-full">
      {navigation.map((item) => {
        const isSelected = item.link.slice(2) === activeLink; // Check if current link matches active section
        return (
          <Link
            key={item.name}
            href={item.link}
            className={`relative leading-6 no-underline text-base font-medium ${
              isSelected ? "font-semibold text-[#131E42]" : "text-[#131E42]/90"
            }`}
          >
            {item.name}
            {isSelected && (
              <motion.div className="absolute -bottom-[1px] left-0 right-0 h-[1px]">
                <svg width="37" height="8" viewBox="0 0 37 8" fill="none">
                  <motion.path
                    d="M1 5.39971C7.48565 -1.08593 6.44837 -0.12827 8.33643 6.47992C8.34809 6.52075 11.6019 2.72875 12.3422 2.33912C13.8991 1.5197 16.6594 2.96924 18.3734 2.96924C21.665 2.96924 23.1972 1.69759 26.745 2.78921C29.7551 3.71539 32.6954 3.7794 35.8368 3.7794"
                    stroke="#131E42"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{
                      strokeDasharray: 84.20591735839844,
                      strokeDashoffset: 84.20591735839844,
                    }}
                    animate={{
                      strokeDashoffset: 0,
                    }}
                    transition={{
                      duration: 1,
                    }}
                  />
                </svg>
              </motion.div>
            )}
          </Link>
        );
      })}
    </div>
  );
};
