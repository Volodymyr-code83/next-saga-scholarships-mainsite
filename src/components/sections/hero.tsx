"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import Wrapper from "../wrapper/wrapper";

import firebaseConfig from "../../../firebaseConfig";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, set, onValue } from "firebase/database";


const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getDatabase(app);


interface heroSectionDataType {
  imageUrl1: string,
  imageUrl2: string,
  imageUrl3: string,
  subHeading: string,
  imageUrl4: string,
  imageUrl5: string,
  imageUrl6: string,
}

interface MainHeadingType {
  heading: string,
}



const HeroSection = () => {
  const sectionRef = useRef(null);
  const controls = useAnimation();

  const [heroSectionData, setHeroSectionData] = useState<heroSectionDataType>({
    imageUrl1: "",
    imageUrl2: "",
    imageUrl3: "",
    subHeading: "",
    imageUrl4: "",
    imageUrl5: "",
    imageUrl6: "",
  });

  useEffect(() => {
    const userUid = 'OYb1VwaGzAdADogvJkvz3GZ6l0g1';
    const pageDataRef = ref(db, `adminData/${userUid}`);

    const unsubscribe = onValue(pageDataRef, (snapshot) => {
      const data = snapshot.val();
      console.log("data_______", data);
      if (data) {
        setHeroSectionData({
          ...heroSectionData,
          imageUrl1: data.homepage_teamData[0].imageUrl,
          imageUrl2: data.homepage_teamData[1].imageUrl,
          imageUrl3: data.homepage_teamData[2].imageUrl,
          subHeading: data.homepage_title.subHeading,
          imageUrl4: data.homepage_storyData[0].imageUrl,
          imageUrl5: data.homepage_storyData[1].imageUrl,
          imageUrl6: data.homepage_storyData[2].imageUrl,
        });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);


  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observer = new IntersectionObserver(handleIntersection, options);

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  });

  const handleIntersection = (entries: any) => {
    entries.forEach((entry: any) => {
      if (entry.isIntersecting) {
        controls.start({
          x: 0,
          opacity: 1,
          transition: {
            duration: 1.5,
            delay: 0.2,
          },
        });
      }
    });
  };

  return (
    <div ref={sectionRef} id="hero" className="w-full relative">
      <Wrapper className="flex flex-col items-center pt-10 md:pt-20 relative">
        <motion.div className="absolute left-[30%] top-48 h-[1px] hidden lg:block">
          <svg
            width="187"
            height="106"
            viewBox="0 0 207 126"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path
              d="M4.71119 9.30451C30.8013 29.4877 58.0397 39.7087 89.7601 26.4986C100.438 22.0518 111.64 10.1308 93.6044 5.03506C76.8503 0.30147 55.7712 15.5957 52.2585 32.1729C46.9872 57.0496 69.5967 73.8288 90.74 81.3389C123.451 92.9577 157.185 101.786 191.813 104.054C198.867 104.515 166.862 73.4785 176.426 85.4227C183.177 93.8533 190.939 99.1597 199.767 105.161C206.123 109.483 200.608 108.851 194.772 109.505C185.286 110.567 173.754 114.856 166.558 121.279"
              stroke="#F1EBEA"
              stroke-width="6"
              stroke-linecap="round"
              initial={{
                strokeDasharray: 500,
                strokeDashoffset: 500,
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
        {heroSectionData?.imageUrl1 && (
          <Image
            id="reviews"
            width={50}
            height={50}
            src={heroSectionData?.imageUrl1}
            quality={100}
            className=" left-10 md:left-[20%] top-4 md:top-14 object-contain object-center absolute hidden md:block"
            alt="Happy students"
          />
        )}
        {heroSectionData?.imageUrl2 && (
          <Image
            id="reviews"
            width={50}
            height={50}
            src={heroSectionData?.imageUrl2}
            quality={100}
            className=" left-10 md:left-80 top-72 md:top-48 object-contain object-center absolute hidden md:block"
            alt="Happy students"
          />
        )}
        {heroSectionData?.imageUrl3 && (
          <Image
            id="reviews"
            width={50}
            height={50}
            src={heroSectionData?.imageUrl3}
            quality={100}
            className=" left-[25%] top-[25%] object-contain object-center absolute hidden md:block"
            alt="Happy students"
          />
        )}
        {/* Right */}
        {heroSectionData?.imageUrl1 && (
          <Image
            id="reviews"
            width={50}
            height={50}
            src={heroSectionData?.imageUrl1}
            quality={100}
            className=" right-[20%] top-14 object-contain object-center absolute hidden md:block"
            alt="Happy students"
          />
        )}
        {heroSectionData?.imageUrl2 && (
          <Image
            id="reviews"
            width={50}
            height={50}
            src={heroSectionData?.imageUrl2}
            quality={100}
            className=" right-4 md:right-80 top-48 object-contain object-center absolute hidden md:block"
            alt="Happy students"
          />
        )}
        {heroSectionData?.imageUrl3 && (
          <Image
            id="reviews"
            width={50}
            height={50}
            src={heroSectionData?.imageUrl3}
            quality={100}
            className=" right-[25%] top-[25%] object-contain object-center absolute hidden md:block"
            alt="Happy students"
          />
        )}
        <MaskText />
        <p className="text-lg font-normal text-[#131E42]/90 max-w-full w-full md:max-w-lg text-center mt-2 md:mt-4 bg-white grainy">
          {heroSectionData?.subHeading}
        </p>
        <div className="flex items-center gap-4 mt-8">
          <Link href="/#contact">
            <Button className=" hover:-translate-y-2 ease-in-out transition-all duration-300">
              Contact Us
            </Button>
          </Link>
          <Link href="/about-us">
            <Button
              className=" hover:-translate-y-2 ease-in-out transition-all duration-300"
              variant="outline"
            >
              Learn More
            </Button>
          </Link>
        </div>

        <div className="md:hidden w-full">
          <div className="w-full px-4 flex items-center gap-1 justify-center mt-10">
            {heroSectionData?.imageUrl1 && (
              <Image
                width={50}
                height={50}
                src={heroSectionData?.imageUrl1}
                quality={100}
                className="object-contain object-center"
                alt="Happy students"
              />
            )}
            {heroSectionData?.imageUrl2 && (
              <Image
                width={50}
                height={50}
                src={heroSectionData?.imageUrl2}
                quality={100}
                className="object-contain object-center"
                alt="Happy students"
              />
            )}
            {heroSectionData?.imageUrl3 && (
              <Image
                width={50}
                height={50}
                src={heroSectionData?.imageUrl3}
                quality={100}
                className="object-contain object-center"
                alt="Happy students"
              />
            )}
            </div>
        </div>

        <div className=" hidden md:block w-full">
          <div className="flex flex-col md:flex-row items-center justify-center md:justify-between w-full gap-4 md:gap-14 py-12 md:py-20 md:px-20">
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={controls}
              className="w-full rounded-xl h-[35rem] md:h-[37rem] relative group"
            >
            {heroSectionData?.imageUrl4 && (
              <Image
                fill
                src={heroSectionData?.imageUrl4}
                quality={100}
                className=" left-[35%] top-56 object-cover object-center absolute rounded-xl"
                alt="Basketball athelete"
              />
            )}
              <div className="w-full h-full absolute bg-black/50 backdrop-blur-sm rounded-xl hidden group-hover:block ease-in-out duration-500 transition-all">
                <div className="h-full w-full items-end flex flex-col">
                  <div className="bg-white w-52 h-12 rounded-tr-xl rounded-bl-xl flex items-center justify-center">
                    <p className="text-black font-normal text-lg">
                      Get a scholarship
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
            <div className="w-full border border-[#131E42] text-[#131E42] flex flex-col items-start rounded-xl h-[35rem] md:h-[37rem]">
              <div className="flex flex-col px-10 mt-20">
                <h3 className="text-5xl font-semibold">34K+</h3>
                <h4 className=" text-3xl mt-2 font-medium">
                  Success <br /> Stories
                </h4>
              </div>
              <div className=" w-full h-60 relative">
              {heroSectionData?.imageUrl5 && (
                <Image
                  fill
                  src={heroSectionData?.imageUrl5}
                  quality={100}
                  className="object-contain object-center rounded-xl animate-pulse"
                  alt="Gradient pattern"
                />
              )}
              </div>
              <div className="flex flex-col px-10">
                <Link href="/about-us">
                  <Button
                    className="hover:scale-110 ease-in-out transition-all duration-500"
                    variant="outline"
                  >
                    Learn more
                  </Button>
                </Link>
              </div>
            </div>
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={controls}
              className="w-full rounded-xl h-[35rem] md:h-[37rem] relative group"
            >
            {heroSectionData?.imageUrl6 && (
              <Image
                fill
                src={heroSectionData?.imageUrl6}
                quality={100}
                className=" left-[35%] top-56 object-cover object-center absolute rounded-xl"
                alt="Track athelete"
              />
            )}
              <div className="w-full h-full absolute bg-black/50 backdrop-blur-sm rounded-xl hidden group-hover:block ease-in-out duration-500 transition-all">
                <div className="h-full w-full items-end flex flex-col">
                  <div className="bg-white w-52 h-12 rounded-tr-xl rounded-bl-xl flex items-center justify-center">
                    <p className="text-black font-normal text-lg">
                      Play a sport
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="  md:hidden w-full">
          <div className="w-full rounded-xl h-[35rem] md:h-[37rem] relative group mt-20 mb-4">
          {heroSectionData?.imageUrl4 && (
            <Image
              fill
              src={heroSectionData?.imageUrl4}
              quality={100}
              className=" left-[35%] top-56 object-cover object-center absolute rounded-xl"
              alt="Basketball athelete"
            />
          )}
            <div className="w-full h-full absolute bg-black/50 backdrop-blur-sm rounded-xl hidden group-hover:block ease-in-out duration-500 transition-all">
              <div className="h-full w-full items-end flex flex-col">
                <div className="bg-white w-52 h-12 rounded-tr-xl rounded-bl-xl flex items-center justify-center">
                  <p className="text-black font-normal text-lg">
                    Get a scholarship
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full border border-[#131E42] text-[#131E42] flex flex-col items-start rounded-xl h-[35rem] md:h-[37rem]">
            <div className="flex flex-col px-10 mt-20">
              <h3 className="text-5xl font-semibold">34K+</h3>
              <h4 className=" text-3xl mt-2 font-medium">
                Success <br /> Stories
              </h4>
            </div>
            <div className=" w-full h-60 relative">
            {heroSectionData?.imageUrl5 && (
              <Image
                fill
                src={heroSectionData?.imageUrl5}
                quality={100}
                className="object-contain object-center rounded-xl animate-pulse"
                alt="Gradient pattern"
              />
            )}
            </div>
            <div className="flex flex-col px-10">
              <Button
                className="hover:scale-110 ease-in-out transition-all duration-500"
                variant="outline"
              >
                Learn more
              </Button>
            </div>
          </div>
          <div className="w-full rounded-xl h-[35rem] md:h-[37rem] relative group mt-4">
          {heroSectionData?.imageUrl6 && (
            <Image
              fill
              src={heroSectionData?.imageUrl6}
              quality={100}
              className=" left-[35%] top-56 object-cover object-center absolute rounded-xl"
              alt="Track athelete"
            />
          )}
            <div className="w-full h-full absolute bg-black/50 backdrop-blur-sm rounded-xl hidden group-hover:block ease-in-out duration-500 transition-all">
              <div className="h-full w-full items-end flex flex-col">
                <div className="bg-white w-52 h-12 rounded-tr-xl rounded-bl-xl flex items-center justify-center">
                  <p className="text-black font-normal text-lg">Play a sport</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default HeroSection;

export function MaskText() {
  const body = useRef(null);

  useEffect(() => {
    const adminUid = 'OYb1VwaGzAdADogvJkvz3GZ6l0g1';
    const pageDataRef = ref(db, `adminData/${adminUid}`);

    const unsubscribe = onValue(pageDataRef, (snapshot) => {
      const data = snapshot.val();
      console.log("data_______", data);
      if (data) {
        setMainHeading({
          ...mainHeading,
          heading: data.homepage_title.heading,
        });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const [mainHeading, setMainHeading] = useState<MainHeadingType>({
    heading: "",
  });

  const isInView = useInView(body, { once: true, margin: "75%" });

  const animation = {
    initial: { y: "100%" },

    enter: (i: number) => ({
      y: "0",
      transition: {
        duration: 0.75,
        ease: [0.33, 1, 0.68, 1],
        delay: 1,
      },
    }),
  };

  return (
    <div ref={body}>
      <div className="lineMask pb-1 z-50">
        <motion.h1
          className="text-[#131E42] font-semibold 2xl:font-semibold text-5xl xl:text-6xl 2xl:text-[4.8rem] md:-mt-0 text-center"
          variants={animation}
          initial="initial"
          animate={isInView ? "enter" : ""}
        >
          {mainHeading?.heading}
        </motion.h1>
      </div>
    </div>
  );
}
