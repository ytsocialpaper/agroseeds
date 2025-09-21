"use client";
import { useSearchParams } from "next/navigation";
import { details } from "../components/data";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Import all crop detail components
import { SoyaEnglish, SoyaHindi, SoyaKannada, SoyaMarathi, SoyaTamil } from "../components/Soyadetails";
import { WheatEnglish, WheatHindi, WheatKannada, WheatMarathi, WheatTamil } from "../components/Wheatdetails";
import { MethiEnglish, MethiHindi, MethiKannada, MethiMarathi, MethiTamil } from "../components/Methidetails";
import { ChanaEnglish, ChanaHindi, ChanaKannada, ChanaMarathi, ChanaTamil } from "../components/Chanadetails";
import { MaizeEnglish, MaizeHindi, MaizeKannada, MaizeMarathi, MaizeTamil } from "../components/Maizedetails";
import { MoongEnglish, MoongHindi, MoongKannada, MoongMarathi, MoongTamil } from "../components/Moongdetails";
import { PaddyEnglish, PaddyHindi, PaddyKannada, PaddyMarathi, PaddyTamil } from "../components/Paddydetails";
import { SesameEnglish, SesameHindi, SesameKannada, SesameMarathi, SesameTamil } from "../components/Sesamedetails";
import { ToorEnglish, ToorHindi, ToorKannada, ToorMarathi, ToorTamil } from "../components/Toordetails";
import { UradEnglish, UradHindi, UradKannada, UradMarathi, UradTamil } from "../components/Uraddetails";

const Details = () => {
  const searchParams = useSearchParams();
  const crop = searchParams.get("crop");
  const varietyname = searchParams.get("variety");
  const variety = details.find((item) => item.name === varietyname);
  const router = useRouter();
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  // Language mapping for all crops
  const languageComponents = {
    soyabean: {
      English: SoyaEnglish,
      Hindi: SoyaHindi,
      Kannada: SoyaKannada,
      Marathi: SoyaMarathi,
      Tamil: SoyaTamil,
    },
    wheat: {
      English: WheatEnglish,
      Hindi: WheatHindi,
      Kannada: WheatKannada,
      Marathi: WheatMarathi,
      Tamil: WheatTamil,
    },
    methi: {
      English: MethiEnglish,
      Hindi: MethiHindi,
      Kannada: MethiKannada,
      Marathi: MethiMarathi,
      Tamil: MethiTamil,
    },
    chana: {
      English: ChanaEnglish,
      Hindi: ChanaHindi,
      Kannada: ChanaKannada,
      Marathi: ChanaMarathi,
      Tamil: ChanaTamil,
    },
    maize: {
      English: MaizeEnglish,
      Hindi: MaizeHindi,
      Kannada: MaizeKannada,
      Marathi: MaizeMarathi,
      Tamil: MaizeTamil,
    },
    moong: {
      English: MoongEnglish,
      Hindi: MoongHindi,
      Kannada: MoongKannada,
      Marathi: MoongMarathi,
      Tamil: MoongTamil,
    },
    paddy: {
      English: PaddyEnglish,
      Hindi: PaddyHindi,
      Kannada: PaddyKannada,
      Marathi: PaddyMarathi,
      Tamil: PaddyTamil,
    },
    sesame: {
      English: SesameEnglish,
      Hindi: SesameHindi,
      Kannada: SesameKannada,
      Marathi: SesameMarathi,
      Tamil: SesameTamil,
    },
    toor: {
      English: ToorEnglish,
      Hindi: ToorHindi,
      Kannada: ToorKannada,
      Marathi: ToorMarathi,
      Tamil: ToorTamil,
    },
    urad: {
      English: UradEnglish,
      Hindi: UradHindi,
      Kannada: UradKannada,
      Marathi: UradMarathi,
      Tamil: UradTamil,
    },
  };

  // Get the appropriate component based on crop and language
  const getLanguageComponent = () => {
    const cropType = variety?.crop;
    if (!cropType || !(cropType in languageComponents)) {
      return SoyaEnglish; // Default fallback
    }
    const cropComponents = languageComponents[cropType as keyof typeof languageComponents];
    return cropComponents[selectedLanguage as keyof typeof cropComponents] || cropComponents["English"];
  };

  const LanguageComponent = getLanguageComponent();




  
  return (
    <div className="flex flex-col gap-4 text-black px-5 py-4">
       {/* <h1>{variety?.image}</h1> */}
       <div className="flex justify-between my-2 "> 
         <button onClick={()=>{router.push("/")}}>Back</button> 
         <h1>{varietyname}</h1> 
         <div className="flex items-center gap-2">
           <h1>Language / भाषा </h1> 
           <select 
             value={selectedLanguage} 
             onChange={(e) => setSelectedLanguage(e.target.value)}
             className="px-2 py-1 border border-gray-300 rounded"
           >
             <option value="English">English</option>
             <option value="Hindi">Hindi</option>
             <option value="Kannada">Kannada</option>
             <option value="Marathi">Marathi</option>
             <option value="Tamil">Tamil</option>
           </select>
         </div>
       </div>
      
      <div className="flex flex-col gap-2  bg-[#FFF6D3] p-4 items-start">
        <div className="flex justify-center items-center min-w-full">
          <img src={variety?.image} className="w-[294px] h-[294px]"/>
        </div>
        <LanguageComponent />
      </div>
    </div>
  );
};

export default Details;
