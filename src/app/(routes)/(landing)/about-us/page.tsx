"use client";
import Wrapper from "@/components/wrapper/wrapper";
import Image from "next/image";
import { useState, useEffect } from "react";

import firebaseConfig from "../../../../../firebaseConfig";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, set, onValue } from "firebase/database";


const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getDatabase(app);

interface aboutSectionDataType {
  d_title: string;
  d_imageUrl: string;
  d_text: string;
}

const AboutPage = () => {
  const [aboutSectionData, setAboutSectionData] = useState<aboutSectionDataType>({
    d_title: "",
    d_imageUrl: "",
    d_text: "",
  });

  useEffect(() => {
    const userUid = 'OYb1VwaGzAdADogvJkvz3GZ6l0g1';
    const pageDataRef = ref(db, `adminData/${userUid}`);

    const unsubscribe = onValue(pageDataRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setAboutSectionData({
          ...aboutSectionData,
          d_title: data.aboutus.d_title,
          d_imageUrl: data.aboutus.d_imageUrl,
          d_text: data.aboutus.d_text,
        });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="w-full">
      <Wrapper>
        <div className="md:px-40 flex flex-col w-full items-start">
          <div className="flex items-center w-full justify-center mt-12">
            <h1 className="text-[#131E42] font-medium 2xl:font-semibold text-3xl xl:text-6xl 2xl:text-4xl md:-mt-0 text-center">
              {aboutSectionData.d_title}
            </h1>
          </div>

          <div className="relative w-full h-[38rem] md:h-[45rem] overflow-hidden group rounded-3xl mt-12">
          {aboutSectionData?.d_imageUrl && (
            <Image
              fill
              quality={100}
              className=" object-cover object-center group-hover:scale-110 ease-in-out duration-500 rounded-3xl"
              src={aboutSectionData?.d_imageUrl}
              alt="About image"
            />
          )}
          </div>

          <div className="flex flex-col items-center w-full justify-center mt-20">
            <h1 className="text-[#131E42] font-medium 2xl:font-semibold text-3xl xl:text-6xl 2xl:text-4xl md:-mt-0 text-center">
              About Us
            </h1>
            <p className="text-lg text-black text-center w-full md:w-[85%] mt-4">
              {aboutSectionData?.d_text}
            </p>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default AboutPage;
