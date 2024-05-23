"use client";
import Image from "next/image";
import Wrapper from "../wrapper/wrapper";
import { useState, useEffect } from "react";

import firebaseConfig from "../../../firebaseConfig";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, set, onValue } from "firebase/database";


const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getDatabase(app);


interface ServiceDescriptionDataType {
  imageUrl: string,
  text: string,
}

const ServiceSection = () => {

  const [serviceDescriptionData, setServiceDescriptionData] = useState<ServiceDescriptionDataType>({
    imageUrl: "",
    text: "",
  });

  const [s0, setS0] = useState<string>("");
  const [s1, setS1] = useState<string>("");
  const [s2, setS2] = useState<string>("");
  const [s3, setS3] = useState<string>("");
  const [s4, setS4] = useState<string>("");
  const [s5, setS5] = useState<string>("");


  useEffect(() => {
    const userUid = 'OYb1VwaGzAdADogvJkvz3GZ6l0g1';
    const pageDataRef = ref(db, `adminData/${userUid}`);

    const unsubscribe = onValue(pageDataRef, (snapshot) => {
      const data = snapshot.val();
      // console.log("data_______", data.players[0]);
      if (data) {
        setServiceDescriptionData({
          ...serviceDescriptionData,
          imageUrl: data.services.service_description.imageUrl,
          text: data.services.service_description.text,
        });
        setS0(data.services.service_information[0].imageUrl);
        setS1(data.services.service_information[1].imageUrl);
        setS2(data.services.service_information[2].imageUrl);
        setS3(data.services.service_information[3].imageUrl);
        setS4(data.services.service_information[4].imageUrl);
        setS5(data.services.service_information[5].imageUrl);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div id="services" className="mt-20 md:mt-20">
      <Wrapper className="md:py-20">
        <div className="flex flex-col md:flex-row items-center justify-between w-full md:h-[45rem] gap-4 md:gap-10 md:px-20">
          <div className=" w-full md:w-[50%] h-[40rem] md:h-full">
            <div className="w-full h-full relative rounded-2xl">
            {serviceDescriptionData?.imageUrl && (
              <Image
                fill
                quality={100}
                className=" object-cover object-top rounded-2xl"
                src={serviceDescriptionData?.imageUrl}
                alt="Services"
              />
            )}
              <div className="w-full h-fit absolute bottom-10 px-4 md:px-10">
                <div className=" h-12 w-fit px-4 rounded-full border border-white flex items-center justify-center">
                  <p className="text-white text-lg md:text-xl font-normal">
                    Our Services
                  </p>
                </div>
                <h4 className=" font-semibold text-3xl md:text-4xl text-white mt-2">
                  Services
                </h4>
                <p className="text-white text-lg md:text-xl font-normal mt-2 md:mt-4">
                  {serviceDescriptionData?.text}
                </p>
              </div>
            </div>
          </div>
          <div className="w-full h-full flex flex-col justify-between gap-4 md:gap-6">
            <div className="w-full flex flex-col md:flex-row items-center justify-between h-fit md:h-full gap-4 md:gap-6">
              <div className="w-full h-fit md:h-full py-16 md:py-0 border border-[#131E42] rounded-xl flex flex-col items-center">
                <div className=" flex items-center justify-center bg-[#E9E9E9] rounded-full aspect-square h-24 md:h-28 w-24 md:w-28 md:mt-20">
                  <Image width={52} height={52} src={s0} alt="Home" />
                </div>
                <h3 className="text-2xl px-5 font-medium text-center mt-4 text-[#131E42]">
                  Admission to college/ High School
                </h3>
              </div>
              <div className="w-full h-fit py-16 md:py-0 md:h-full border border-[#131E42] rounded-xl flex flex-col items-center">
                <div className=" flex items-center justify-center bg-[#E9E9E9] rounded-full aspect-square md:mt-20 h-24 md:h-28 w-24 md:w-28">
                  <Image width={52} height={52} src={s1} alt="Books" />
                </div>
                <h3 className="text-2xl px-5 font-medium text-center mt-4 text-[#131E42]">
                  Preparation for SAT/TOFL
                </h3>
              </div>
              <div className="w-full py-16 md:py-0 h-fit md:h-full border border-[#131E42] rounded-xl flex flex-col items-center">
                <div className=" flex items-center justify-center bg-[#E9E9E9] rounded-full aspect-square md:mt-20 h-24 md:h-28 w-24 md:w-28">
                  <Image width={36} height={36} src={s2} alt="Document" />
                </div>
                <h3 className="text-2xl px-5 font-medium text-center mt-4 text-[#131E42]">
                  Visa Application
                </h3>
              </div>
            </div>
            <div className="w-full flex flex-col md:flex-row items-center h-full gap-4 md:gap-6">
              <div className="w-full h-fit md:h-full py-16 md:py-0 border border-[#131E42] rounded-xl flex flex-col items-center">
                <div className=" flex items-center justify-center bg-[#E9E9E9] rounded-full aspect-square h-24 md:h-28 w-24 md:w-28 md:mt-20">
                  <Image
                    width={52}
                    height={52}
                    src={s3}
                    alt="Registration"
                  />
                </div>
                <h3 className="text-2xl px-5 font-medium text-center mt-4 text-[#131E42]">
                  NCAA/NAIA <br />
                  Registration and Guidance
                </h3>
              </div>
              <div className="w-full py-16 md:py-0 h-fit md:h-full border border-[#131E42] rounded-xl flex flex-col items-center">
                <div className=" flex items-center justify-center bg-[#E9E9E9] rounded-full aspect-square md:mt-20 h-24 md:h-28 w-24 md:w-28">
                  <Image width={52} height={52} src={s4} alt="Money" />
                </div>
                <h3 className="text-2xl px-5 font-medium text-center mt-4 text-[#131E42]">
                  Scholarship <br /> Negotiation
                </h3>
              </div>
              <div className="w-full py-16 md:py-0 h-fit md:h-full border border-[#131E42] rounded-xl flex flex-col items-center">
                <div className=" flex items-center justify-center bg-[#E9E9E9] rounded-full aspect-square md:mt-20 h-24 md:h-28 w-24 md:w-28">
                  <Image
                    width={36}
                    height={36}
                    src={s5}
                    alt="Promotion"
                  />
                </div>
                <h3 className="text-2xl px-5 font-medium text-center mt-4 text-[#131E42]">
                  Promotion
                </h3>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default ServiceSection;
