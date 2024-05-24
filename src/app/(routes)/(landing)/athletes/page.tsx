"use client";

import Wrapper from "@/components/wrapper/wrapper";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Sheet, SheetClose, SheetContent, SheetTrigger } from "../../../../components/ui/sheet";
import { NavItems } from "../../../../components/ui/nav-items";
import NavActions from "../../../../components/ui/nav-actions";
import { ArrowRight, Menu } from "lucide-react";
import Link from "next/link";

import firebaseConfig from "../../../../../firebaseConfig";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, set, onValue } from "firebase/database";


const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getDatabase(app);


import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { athletes2024 } from "@/constants/data";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface playersDataType {
  imageUrl: string;
  name: string;
  date: string;
  sport: string;
  race: string;
  country: string;
  university: string;
}

const AthletesPage = () => {
  const [playersData, setPlayersData] = useState<playersDataType[]>([]);
  const [playersTitle, setPlayersTitle] = useState<string>("");

  useEffect(() => {
    const userUid = 'OYb1VwaGzAdADogvJkvz3GZ6l0g1';
    const pageDataRef = ref(db, `adminData/${userUid}`);

    const unsubscribe = onValue(pageDataRef, (snapshot) => {
      const data = snapshot.val();
      console.log("data_______", data.players[0]);
      if (data) {
        setPlayersData(data.players);
        setPlayersTitle(data.playersTitle);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="w-full">
      <Wrapper>
        <div className="flex flex-col items-center w-full justify-center mt-12">
          <h1 className="text-[#131E42] font-medium 2xl:font-semibold text-3xl xl:text-6xl 2xl:text-4xl md:-mt-0 text-center w-full md:max-w-3xl mb-5 md:mb-10">
            {playersTitle}
          </h1>
          <Select>
            <SelectTrigger className="w-[240px]">
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Years</SelectLabel>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2022">2022</SelectItem>
                <SelectItem value="2021">2021</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 2xl:gap-8 pb-10 pt-12 md:pt-10 md:pb-5 md:px-20">
          {playersData?.map((athlete, i) => {
            return (
              <div
                className=" w-full md:w-[300px] h-[520px] md:h-[400px] rounded-xl relative"
                key={`p_${i}`}
              >
                <div className="w-full h-full relative">
                  <Image
                    quality={100}
                    className=" rounded-2xl object-cover object-center"
                    fill
                    src={athlete.imageUrl}
                    alt={athlete.name}
                  />
                </div>

                <div className="w-full h-full absolute bg-black/40 top-0 rounded-2xl" />

                <div className=" absolute bottom-0 flex flex-col items-start px-4 py-4">
                  <p className="text-white font-semibold text-lg mb-2">{`${athlete.name}`}</p>
                  <p className="text-white">{`Year: ${athlete.date}`}</p>
                  <p className="text-white">{`Sport: ${athlete.sport}`}</p>
                  <p className="text-white">{`Race: ${athlete.race}`}</p>
                  <p className="text-white">{`Country: ${athlete.country}`}</p>
                  <p className="text-white">{`University: ${athlete.university}`}</p>
                </div>
              </div>
            );
          })}
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
      </Wrapper>
    </div>
  );
};

export default AthletesPage;
