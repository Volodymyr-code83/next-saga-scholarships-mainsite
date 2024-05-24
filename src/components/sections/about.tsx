"use client";

import Image from "next/image";
import Wrapper from "../wrapper/wrapper";
import { Button } from "../ui/button";
import Marquee from "react-fast-marquee";
import Link from "next/link";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import firebaseConfig from "../../../firebaseConfig";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, set, onValue } from "firebase/database";


const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getDatabase(app);


interface aboutSectionDataType {
  imageUrl: string,
  text: string,
}

interface playersDataType {
  imageUrl: string;
  name: string;
  date: string;
  sport: string;
  race: string;
  country: string;
  university: string;
}

const AboutSection = () => {
  const sectionRef = useRef(null);
  const controls = useAnimation();

  const [aboutSectionData, setAboutSectionData] = useState<aboutSectionDataType>({
    imageUrl: "",
    text: "",
  })

  const [playersData, setPlayersData] = useState<playersDataType[]>([]);

  useEffect(() => {
    const userUid = 'OYb1VwaGzAdADogvJkvz3GZ6l0g1';
    const pageDataRef = ref(db, `adminData/${userUid}`);

    const unsubscribe = onValue(pageDataRef, (snapshot) => {
      const data = snapshot.val();
      console.log("data_______", data.players[0]);
      if (data) {
        setAboutSectionData({
          ...aboutSectionData,
          imageUrl: data.aboutus.imageUrl,
          text: data.aboutus.text,
        });
        setPlayersData(data.players);
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
    <div className="w-full">
      <div id="about" className="mb-0 md:mb-20">
        <div className="pt-10 md:pt-20"/>
        <Wrapper>
          <div
            ref={sectionRef}
            className="flex flex-col-reverse md:flex-row items-start justify-between w-full gap-0 md:gap-20 md:px-20"
          >
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={controls}
              className="w-full h-[400px] md:h-[500px] rounded-xl relative"
            >
            {aboutSectionData?.imageUrl && (
              <Image
                fill
                className=" object-cover object-center rounded-xl"
                src={aboutSectionData?.imageUrl}
                alt="About"
                quality={100}
              />
            )}
            </motion.div>
            <div className="w-full flex flex-col items-start py-10">
              <h2 className="text-[#131E42] text-4xl md:text-5xl font-semibold">
                About Us
              </h2>
              <p className=" font-normal text-lg text-[#131E42]/90 mt-4">
                {aboutSectionData?.text}
              </p>
              <Link href="/about-us">
                <Button
                  className="mt-6 hover:scale-110 ease-in-out transition-all duration-500"
                  variant="outline"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </Wrapper>
        <Wrapper className="mt-20 md:mt-40 px-0 2xl:px-0">
          <div className="flex flex-col items-start w-full">
            <div className="w-full flex-col md:flex-row items-center justify-between px-3 md:px-20 xl:px-10 2xl:px-40">
              <h2 className="text-[#131E42] text-4xl md:text-5xl font-semibold mb-4 md:mb-0">
                Our Student-Athletes
              </h2>
            </div>

            <Marquee pauseOnHover autoFill speed={200}>
              <div className="grid grid-cols-10 sm:grid-cols-10 md:grid-cols-10 lg:grid-cols-10 xl:grid-cols-8 2xl:grid-cols-10 gap-4 2xl:gap-8 pb-10 pt-5 md:pt-10 md:pb-5">
              {playersData.map((player, index) => ( 
                <div key={index} className=" w-[300px] h-[400px] rounded-xl ml-4">
                  <div className="w-full h-full relative">    
                    <Image
                      fill
                      src={player.imageUrl}
                      alt="Athlete"
                      className=" object-cover object-center rounded-xl"
                    />
                    <div className=" absolute bottom-0 p-5">
                      <h3 className=" text-white text-2xl font-medium">
                        {player.name}
                      </h3>
                      {/* <Button
                        className="mt-4 bg-transparent border border-white text-white"
                        variant="outline"
                      >
                        Learn More
                      </Button> */}
                    </div>
                  </div>
                </div>
              ))}
              </div>
            </Marquee>

            <Marquee pauseOnHover autoFill speed={150}>
              <div className="grid grid-cols-10 sm:grid-cols-10 md:grid-cols-10 lg:grid-cols-10 xl:grid-cols-10 2xl:grid-cols-10 gap-4 2xl:gap-8 pb-10 pt-5 md:pt-0 md:pb-5">
              {playersData.map((player, index) => (  
                <div key={index} className=" w-[300px] h-[400px] rounded-xl ml-4">
                  <div className="w-full h-full relative">
                    <Image
                      fill
                      src={player.imageUrl}
                      alt="Athlete"
                      className=" object-cover object-center rounded-xl"
                    />
                    <div className=" absolute bottom-0 p-5">
                      <h3 className=" text-white text-2xl font-medium">
                        {player.name}
                      </h3>
                      {/* <Button
                        className="mt-4 bg-transparent border border-white text-white"
                        variant="outline"
                      >
                        Learn More
                      </Button> */}
                    </div>
                  </div>
                </div>
              ))}
              </div>
            </Marquee>

            <div className="w-full px-4 md:px-40 md:mt-10 flex items-center justify-start">
              <Link href="/athletes">
                <Button variant="outline">See our athletes</Button>
              </Link>
            </div>
          </div>
        </Wrapper>
      </div>
    </div>
  );
};

export default AboutSection;
