"use client";
import Image from "next/image";
import Wrapper from "../wrapper/wrapper";
import { Button } from "../ui/button";
import Link from "next/link";
import { useState, useEffect } from "react";

interface NewsDataType {
  imageUrl: string;
  title: string;
  details: string;
}

import firebaseConfig from "../../../firebaseConfig";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, set, onValue } from "firebase/database";


const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getDatabase(app);


const NewSection = () => {
  const [newsData, setNewsData] = useState<NewsDataType[]>([]);

  useEffect(() => {
    const userUid = 'OYb1VwaGzAdADogvJkvz3GZ6l0g1';
    const pageDataRef = ref(db, `adminData/${userUid}`);

    const unsubscribe = onValue(pageDataRef, (snapshot) => {
      const data = snapshot.val();
      // console.log("data_______", data.players[0]);
      if (data) {
        setNewsData(data.news);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div id="news" className="mt-0 md:mt-0">
      <Wrapper className="py-20">
        <h2 className="text-[#131E42] text-4xl md:text-5xl font-semibold md:px-20 mb-10">
          News
        </h2>
        <div className=" grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 md:gap-14 md:px-20">
          {newsData.map((player, index) => ( 
          <div key={index} className="w-full flex flex-col items-start mb-12 md:mb-0">
            <div className="w-full h-[500px] relative rounded-xl overflow-hidden group">
              <Image
                fill
                quality={100}
                src={player.imageUrl}
                className="rounded-xl object-cover object-center group-hover:scale-110 ease-in-out duration-500 transition-all"
                alt="News"
              />
            </div>
            <h3 className=" text-2xl md:text-3xl mt-6 font-medium text-[#131E42]">
              {player.title}
            </h3>
            <Link href={{ pathname: '/all-news', query: { index } }}>
              <Button className="mt-4">Read More</Button>
            </Link>
          </div>
          ))}
        </div>
      </Wrapper>
    </div>
  );
};

export default NewSection;
