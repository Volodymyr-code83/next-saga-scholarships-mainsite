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
                  <Image width={52} height={52} src={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAG4AAABuCAYAAADGWyb7AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAQSSURBVHgB7Z3PThNRFIfPnTZGY9QJsGABWHbuhDeY1o3bvgHu3IlPYHkC9AmUnTvWbtq6c8kb0BRMTKRNcaGG2LneWzBBMu10TufPPcPvS0jJdLgD/TpzPpIhEAEAAAAAAAAAAAAsgr8WBEsbjTdUQipUUpY2glee8j4qouD+w03/54/jT1QiFJWQFXOWaaLW9W2K1NGfi3Fz9K3boxJQKnG+H/iVB96++al2puzSG1+E9TLIK404fzWoVe9UDjXprZhde944bH7/2j0iwZRixllplTtex3z6ZJ7dtade3nu0ef7r/PgLCUW8OFuOlepE2mqSrzOXmudGHhl5n0kgosX9K0fz6V1iILk4xc64qHLkIrE4xYmboxy5iCpOUeISlCMXMcUpZsYlLEf2YaQUpwhx3HLkIqE4nRe3aDlycb04nZ5xaZYjF1eL00lxGZYjF+eK0zlxOZQjF6eK06kZl1M5cnGqOJ0Rl3c5cnGlOJ0QV1Q5cnGhOAufcS6UI5cii7MwcQ6WI5dCirMQcQ6XI5fcizP3Ged4OXLJvThzFSelHLnkWZy5iZNWjlzyKs5cZpzkcuSSdXFmKq5E5cgls+LMTFwJy5FLJsWZyYwraTlyyaQ4UxdX9nLkknZxpirutpQjlzSLM7UZdxvLkUsaxbmwOJQjm4WKcyFxKMeFYRcne8ahHFOBXZwscSjHdOEUZ2JxKMdsSFqciWYcyjF75i3OucShHHMntjhjxaEcC2Nmcc6ccSjHQplZnFPFJSpHrbukVI3A3NhZZq5iv82jP3u/6OL0ona25VjxJtJmLmpCZaTCsG6WPyCQCK3DUejpupEX+8u3kddaWW/sX98WKU5pOqe4A5PuhV64fXba7RJgMep1e1aesRj7xtf6/x6JFDc46X4we+3RtEXMu8QccNsemMBCmNdwNDjp7Mx6ve0oGpy2d69v8qbte9Zvt8zDu4hFDob9jpU2Igexl2/z0Iv6uHrOSezrbb6/1ze32yvbuKKbN7dXZy026Ld3lx8/e2pkBZeL0N7wpNMih1FaH5l3cD3queX1xo654LwnRxn2229X1gJzNfMOla3KyTjS9aiTxItbbKzGTbsA6fDF8PIsBBlim8G2w9U4ak4bR9W4ha5sbxLIDSvLrwX1WeMo9owDxRDXEBAnFIgTCsQJBeKEAnFCgTihQJxQIE4oECcUiBMKxAkF4oQCcUKBOKFAnFAgTigQJxSIE0rsPSfiUGpraaMRfSeXVrXJvWoloHziiHxFU/4cTJVDmgWXSqFAnFAgTigQJxSIEwrECQXihAJxQoE4oUCcUCBOKBAnFIgTCsQJBeKEAnFCgTihQJxQIE4oECeUlG4WCkekKl0Cc6M05faPcAEAAAAAAAAAAMDkLxWtBwPfgG+UAAAAAElFTkSuQmCC"} alt="Home" />
                </div>
                <h3 className="text-2xl px-5 font-medium text-center mt-4 text-[#131E42]">
                  Admission to college/ High School
                </h3>
              </div>
              <div className="w-full h-fit py-16 md:py-0 md:h-full border border-[#131E42] rounded-xl flex flex-col items-center">
                <div className=" flex items-center justify-center bg-[#E9E9E9] rounded-full aspect-square md:mt-20 h-24 md:h-28 w-24 md:w-28">
                  <Image width={52} height={52} src={"data:image/png;base64,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"} alt="Books" />
                </div>
                <h3 className="text-2xl px-5 font-medium text-center mt-4 text-[#131E42]">
                  Preparation for SAT/TOFL
                </h3>
              </div>
              <div className="w-full py-16 md:py-0 h-fit md:h-full border border-[#131E42] rounded-xl flex flex-col items-center">
                <div className=" flex items-center justify-center bg-[#E9E9E9] rounded-full aspect-square md:mt-20 h-24 md:h-28 w-24 md:w-28">
                  <Image width={36} height={36} src={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE4AAABiCAYAAAD+xOVQAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAUeSURBVHgB7Z1vbtRGFMDfGy98qAp1SytVglLnBF2+9RtOLlBuQDlBuEHICSAnYPcEWS6QOCdIOAFWAhISCVgI8QHiGd5zdgMBgseTsT225ycl2exOlNnfzv83HiOUEIZxGFwRdxTCbQE4VqBCejqCZkgRMFNKpfT/d+QHOcteJik4AJ73QngjjgPENUCMwSFI5B6J3Dg62JpAi3wjjkuYuCrW6IX74DIKJvlHud5WCTwjLvwzjoLLYhuaq4oXJc0/yOU25J2KK9qyq2IXuiNtQSZyufzqRbIHDSIWD6gDeAjdk8aEMhDbf1yPx9AgRYkLo3gcyKK0dZlGS15R4oJcrEL3abTk4bxDeAb9oZGSNwouiVg3saJMUd2eopSz4xGkWWqvN6PmIqLmwsYHuCh5tcob0Yh8jBoJacaQSqGWbcqqAg98JciQfkYayWuXJxDxn7JEbUsr8qBkxnngvGj+Ccvb5KYIakBQjqKyRPQpJ21KW8B5qCivGNDXIY971agsUS7lFBzBFXlCK9U7aHRUXoYL8rTEZVmSgWO0LU+vxDlKm/I6LY5pS17nxTFtyOuFOKZpeb0RxzQpr1fimKbk9U4c04S8Xopj6pbXW3FMnfJ6LY6pS17vxTGf5YHu1LFU3iDEMSfypDV5gxHHkLw9W/IGJY4xlkcB+y+fHJw4xkjeFdz88olBimMqy0OMf7u58mDx62DFMVXlUTRwbRHw7ow4CmOGUANV5UmBvMemO+Io0jaua3tDJXlUZbmjGIE7lGaa4qS71/5amVHpewq2kewEEgoi3ylLylt78drNFVWW8Gh/SyfYf2EoL7wFIgLHIWETp6oqzSd3oBOosVPihFQT6ADU3oZOiTt8niTU0CTgPm6JY3LM71UY0beFe+Lmqxi3KqyftYKT4ziW93p/e4l6Cyp9yql9KwucGo6cRxjRgPMYxiezB1HLDOIMCI9Lk3RBXNPoOBn0JP8ieHGGeHGGeHGGeHGGeHGGeHGGeHGGeHGGeHGGWI85nJwewde/qvrnlFrgtI4TI6yKo0DK/58nyM5MbzmQHL7e33oEFrFbVQXeBQdBpf4Dy9gVJ5WTK7d1BLNtdw5PwEGoxG2AZay2cdwIUztHn7Ba5UgQOAC1tBuHB8kELGO9V533YBPoOX4cZ4gXZ4gXZ4gXZ4gXZ4gXZ4gXZ4gXZ4j9ZaXr8XgkxF1Z02bnKggF2bGU06yG85WsiiuOVAvELu8fcGFRiSb3QPm5T2uEyxnvvbOI1aoaXCqOi3SO4lheywyijXN+WYlPhwYHQYnW82VVHC9PU7Oy7spW1CIfEjaOnm9ZPwza74/7Dn5/XI14cYZ4cYZ4cYZ4cYZ4cYZoifv6BIQ+w9dU6KTTK3E/Q6NH/rcJX4iik47FpaWJhIhhICgUOvtfUlqywtLpEU0bVus6+toliveIEJcmVCqlEid1rm8PR5eDzT7L4/fG7xF0Lm1X+BTP7mkrJaWZc5IrOQXLtyVoA74VAhxDRE3R7fldofQ6QSXvIfcigRRvwKNNLuSSoFKTdeRybkdQT7imFcMRzPN18GiRS1VsiQ342/u3afrTL0u/0sN/wfMjJm8OtotNiqcDYKq3D1y/Dr5N2A05Oq2Zp+K4rat4COdg+N6tZ85MueaHcN6ipM7cMaR1EGbs5Ouh17mxhN9vxLEKxKrOIU29RKkElVo/PCeQXRqEKe6XlYsYUNGX+Ht+c6AI+kVK1ZGmnriHCnbyQM6KYdoP+ASGQIkvay0uJQAAAABJRU5ErkJggg=="} alt="Document" />
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
                    src={"data:image/png;base64,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"}
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
                  <Image width={52} height={52} src={"data:image/png;base64,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"} alt="Money" />
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
                    src={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABUCAYAAAACoiByAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAh+SURBVHgB7Z3PUttGHMd/uyKZaTMFNU5nOpMExBNAbr1FJpfeYp4AeALIrT0BTxA49hTzBMCxh2Jx6w3zBCiknemhMEqmbdKCdvv7rWViQLuWLVmWjT6ZBJBkJfn6p9/+/uyuGZQkxn7iuhOMvwTGXAnSoUN0nAFrSil9/Hb/7N1BPe61DEq6QgJbjK2TwAku90HC5k3BLSgx8mh6YZ0xVkeRnYQvsdF8aw8mZ+1/Ppz83D5YCm2ARJYAG9APDL77cnLW+fjhZJ9+LIXWYH/rOsxie5AGBvNfTM2+//j+5NfSR2uozLxogJQupCcIP4jZUugY7MfuvGXxI8gKCSscSq6hIgyL75quwdCuCVIshhwtVYgqugiji5EMnpcWHZE0hEORfcHls8D3gs7jXVyNPwF3nB5jZIRtB34juHVYwDZatqt5kXNnhe5d4BZMQhB/PAwk03viOyd0vwKn5U4IbduuzSf5Kg5IaxDVJ/JmrIUelvXGMXZCtytsGFItw5CsN46xELpD3Br+6EjoD3xdgMPZNn5dovtAhoyk0ORzra94LUoESFy7X3E7qAsuNs99z69MLyxBxoyE0C1hLZeBfI4Jw3zb56bNtsiC8R47mOFtYQLiwwApnNAkKjwAh1vcxR/nUAj66qicTF2RPpltu4hI4AByoC+hlRj060IVufsecCxm2ZJJh0uYkSQmlhUhY994DSk9/Pv2BYf6eU4Ct0kkdBSHLmNW9PxKDAEZVLOlsk85wIpL2z1g8Wfvz988D4aEUehbceiIlKCUuBIrbMC3hRV6Qc7WG0es0NRdsO6xN0UI9JOixGXg4ZO2LyyxVwRxO7kldFT0pnqsAwWH6sLY6j8ktxBOQLNo4nZyTWhlyRZvQIEyqk7awmLR3QstKIRLSMqV0Erk+8UQmdwA/unjoIB+VhxjlODhYX+UhL3JldDWPb4OPbqLaERP8p93DDfZw0H2LX4lUQO01Oagk4dhoIQma4ZWEcbM5zjUg4QWZjv4pAh+ojuPvnUtODl4C2OOEjqyZi3UJ+NCrgwzDh11JtDibAyJlnUXRM3I6vnp+D3OecKt0HJNF2DgvzmOPjNvOPpcV3eSrPnsnVeHktRwxtic7iTGrB6UZALHSMLRncTw7RhKMoEmIji6k0KIJpRkQjn3LidKoXOiFDonSqFzohQ6J0qhc6IUOidKoXOCS0Ph3mLFbGmNItzUIZGMO1CSCbzVQtIyByWZgGVS0LaRaKammv5VkhrOhTCtkaOpYGtQkhp+OQFN04CIVr36zWN3HkpSwaNO9o7hGltYvPFweqG07BSoLrjgYssSfNVwnY2W/boyvbDKJOxJYIehCH34G/wgGN1JLXmihA5aywm28dvVLtc7OHiiZcs1y8JcZxKgMrlgfoUwn7YuZb3ydCHA+x4zyZqhDAP4C5rj9gZezVQKudjggr3EPqEDefJ5mUSNlqVa7OoN9LHN5kvGDtUbcBE2gz9Gtxt/JTT5attxq1xAI3ex43Foex21tILegPsc8Kmj/YqaaP2HIhRe8Ls3Mq22a7NJyYUUTOyb0NQ1Er9GrisS3sPjh+EFCl9gi79VVCKxaZsE/HYbik9rziCDN2jxJ5WnVRUdqbmEBSO2ekdu5Oz0YI02/sCBb0cmmzE6fNDfU3REoj+afnGEg+xyUUQ3lknJus9OG8uCBJdiEcjKGfNGQfjWesS2pS/sVp6+qMEQSbQqK0pq9qLf8OiJ60quJq3HXs5DUb241/3N4MLaZSTIoFFLl2WNfDrmAFviv3A/b3/e1zpDmr77cLrqawZMO7R4LfAPNrrdB+9xjCrECo1PzSZTm/WxOSnlPMtmJQIOpHILrXwLrbyOA+hmXoL33WHhwLRpO9VHklX9pCk8U+PE2dtfquenB1/TJlESxKvMXBcOopFbeZOHH+9b6EtM2w3/4URVPxGq0EzHtVo4PUXnp95Wp/CgdiKQ6WLpnATvW2jy29wQAiay6nvg60+afTcJTxZ/ftp4pqIjCStk7dAvHYLLASyYStWcTWvV0SDrx51jGt+tuY9Pu9uStZPo5GKkWtXVByg4K5rQ3UqsrLXBiBEU5FB3DrPUniMSEp1cDFp6a/O/guQBqacbUInVcNqhpAGM6H2sFfJUoV/LvbTzAFjp28ozILXQan2LwTcyxoylV6yr6AczCZnE2CrTRddyZeUs/5UMmUygYWG4qTtHGRrtkqA7T6000N5YZt6FV1Ye+XJyK5ATmQit1h8arERtRaHBNCDiPQeWNbbLCz0LrnnKusyBCTKbEmayair2mKzaMCDa9uzCDAyQngXnsHSzWR2tPNYvipW0WUCGYEp9pA3LpPTO3jWq8a9z1xjw1/GvgxXdJ0EMAop0sNO027UeT71TphZTzbR3KtNeK2A740mOBoswWHUeA2JS0MKbVI/vGhJioQoFXsffy9Al7g5B7GUqNG0KZZ40Ge+r8x4Qu9Et6+0JfJIDHMMyFbrrP1Bj1cMaEE20st50cTcZXWjJFfo+8/nRXdJy6nIvaf5VOqvOPB1OAr356EIW02SVTIpX7XX0mQvd3aohvr3EmVbQQUceOlr+Wjzr1bLVhjGYGHWuox/IjP9Lc1oOE/et3U6xK9PukumjOIa5cUqrdtJIVKiKduTZpJT/5t4mmYZ3nVSmq3W8vbmohAMFY9yWhpIo1ZupFAoFgdp4OOhjx4c7KOxU66g4psjp0rBT2cCEpi1+uOBHGZQc61h3XoERZ2Af4fQp8IMvpmb/RaG/hxRgxrZI94IRZ6CrsrDltJWmUkYN2nHZ/Wbgy99CFi721deTcgffqA0YEwb+6W/42H/6+N7/6cGU+lwut9v10d7OP2Jd5AcYIwY2GMbRGiCxRsCslzfmamDzAJpSikNK40d5x0Yd/wNRV+s1VrbrewAAAABJRU5ErkJggg=="}
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
