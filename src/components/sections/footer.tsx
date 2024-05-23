import Link from "next/link";
import Wrapper from "../wrapper/wrapper";
import Image from "next/image";
import { Mail, Phone } from "lucide-react";
import AnimatedLink from "../ui/animated-link";

const FooterSection = () => {
  return (
    <div className="mt-[10rem]">
      <Wrapper className="py-10">
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-between px-20">
          <Link href="/" className="md:w-full">
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
          <div className="flex flex-col md:flex-row items-center gap-8 mt-8 w-full md:justify-end">
            <div className="flex items-center gap-2 w-fit">
              <Mail />
              <AnimatedLink link="" text="skage@sagascholarships.com" />
            </div>
            <div className="flex items-center gap-2 w-fit">
              <Phone />
              <AnimatedLink link="" text="+1 313 487 3589" />
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default FooterSection;
