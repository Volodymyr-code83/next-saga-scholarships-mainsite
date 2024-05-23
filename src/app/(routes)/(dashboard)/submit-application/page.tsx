import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";

const ApplicationPage = () => {
  return (
    <div className="w-full h-screen max-h-screen flex flex-col md:flex-row md:justify-between">
      <div className="w-full flex flex-col items-center justify-center pt-10 md:pt-0">
        <div className="relative w-[180px] h-[65px] md:w-[180px] md:h-[65px] hover:scale-110 transition-all ease-in-out md:-mt-20">
          <Image
            quality={100}
            className=" object-contain"
            fill
            src={"/logo.png"}
            alt="Logo"
          />
        </div>
        <h2 className=" text-base md:text-xl text-[#131E42] font-normal text-center w-full px-2 md:px-0 md:max-w-3xl mt-4">
          Welcome to Saga Scholarships. A place made easier for students from
          across the United States of America to get scholarships for becoming
          at Athlete. We help students with the vision of becoming football
          stars achieve their dreams by helping them gain admission to top
          colleges and universities. Gain admission by applying and submitting
          documents needed by us. Scholarships made easier with Saga
          Scholarhips.
        </h2>
      </div>
      <div className="w-full bg-[#131E42] flex flex-col items-center justify-center mt-10 md:mt-0 h-screen md:h-screen py-16 md:py-0">
        <h1 className=" text-white font-semibold text-3xl">
          Submit your application
        </h1>
        <div className="md:max-w-2xl w-full flex flex-col px-4 md:px-0 gap-3 mt-8">
          <Input type="text" placeholder="NCAA ID Number" />
          <div className="w-full flex items-center gap-3">
            <Input type="number" placeholder="Age" />
            <Input type="text" placeholder="Height" />
            <Input type="text" placeholder="GPA" />
          </div>

          <Input type="text" placeholder="High School transcript" />
          <Input type="text" placeholder="Middle School transcript" />
          <Input type="text" placeholder="Duolingo Certificate" />
          <Input type="text" placeholder="Letter of Intent" />
          <Input type="text" placeholder="Scholarship Letter" />
          <Input type="text" placeholder="WES Reference Number" />
          <Input type="text" placeholder="Highlight Video Link" />
        </div>
        <div className="w-full flex items-center justify-end px-4 md:px-0 md:max-w-2xl mt-6">
          <Link href="/submit-application/redirect">
            <Button variant="secondary">Submit</Button>
          </Link>
        </div>

        <Link href="/login">
          <p className="text-white/70 hover:underline underline-offset-[6px] hover:text-white transition-all ease-in-out duration-200 text-base md:text-lg mt-10">
            Already have an account? Click here to Login
          </p>
        </Link>
      </div>
    </div>
  );
};

export default ApplicationPage;
