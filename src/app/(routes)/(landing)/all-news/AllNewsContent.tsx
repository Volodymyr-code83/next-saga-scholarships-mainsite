// all-news/AllNewsContent.tsx

"use client";

import { Button } from "@/components/ui/button";
import Wrapper from "@/components/wrapper/wrapper";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface NewsDataType {
  imageUrl: string;
  title: string;
  details: string;
}

import firebaseConfig from "../../../../../firebaseConfig";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, onValue } from "firebase/database";

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getDatabase(app);

const AllNewsContent = () => {
  const [newsData, setNewsData] = useState<NewsDataType[]>([]);
  const [newsIndex, setNewsIndex] = useState<number>(-1);
  const [newsImageUrl, setNewsImageUrl] = useState<string>("");
  const [newsTitle, setNewsTitle] = useState<string>("");
  const [newsDetails, setNewsDetails] = useState<string>("");
  const searchParams = useSearchParams();
  const index = searchParams ? searchParams.get('index') : null;

  useEffect(() => {
    const userUid = 'OYb1VwaGzAdADogvJkvz3GZ6l0g1';
    const pageDataRef = ref(db, `adminData/${userUid}`);

    const unsubscribe = onValue(pageDataRef, (snapshot) => {
      const data = snapshot.val();
      
      if (data && index !== null) {
        setNewsIndex(parseInt(index));
        setNewsData(data.news);
        setNewsImageUrl(data.news[parseInt(index)].imageUrl);
        setNewsTitle(data.news[parseInt(index)].title);
        setNewsDetails(data.news[parseInt(index)].details);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [index]);

  return (
    <div className="w-full">
      <Wrapper>
        <div className="md:px-20 flex flex-col w-full items-start">
          <div className="flex items-center w-full justify-center mt-8 md:mt-12">
            <h1 className="text-[#131E42] font-medium text-center 2xl:font-semibold text-4xl xl:text-6xl 2xl:text-4xl md:-mt-0">
              Keep in touch with our latest news
            </h1>
          </div>

          <div className="w-full flex flex-col md:flex-row items-center justify-between gap-10 mt-8 md:mt-20">
            <div className="w-full md:w-[80%] h-[320px] md:h-[500px] relative rounded-xl overflow-hidden group">
              {newsImageUrl && (
                <Image
                  fill
                  quality={100}
                  src={newsImageUrl}
                  className="rounded-xl object-cover object-center group-hover:scale-110 ease-in-out duration-500 transition-all"
                  alt="News"
                />
              )}
            </div>
            <div className="flex flex-col items-start w-full">
              <h1 className="text-[#131E42] font-medium 2xl:font-semibold text-3xl mt-2 xl:text-6xl 2xl:text-4xl md:-mt-0">
                {newsTitle}
              </h1>
              <p className="mt-4 text-lg font-normal">{newsDetails}</p>
            </div>
          </div>

          <div className="flex flex-col items-center w-full justify-center mt-40">
            <h1 className="text-[#131E42] text-center font-medium 2xl:font-semibold text-4xl xl:text-6xl 2xl:text-4xl md:-mt-0 mb-5">
              Become a student-athlete
            </h1>
            <div className="w-full flex items-center justify-center gap-3 mt-6">
              <Link href="/#contact">
                <Button className="group">
                  Contact Us{" "}
                  <div className="h-6 w-6 ml-4 aspect-square rounded-full bg-white flex items-center justify-center">
                    <ArrowRight className="h-4 w-4 text-black group-hover:-rotate-45 transition-all ease-in-out duration-300" />
                  </div>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default AllNewsContent;
