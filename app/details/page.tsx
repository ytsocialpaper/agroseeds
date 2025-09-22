"use client";
import { useSearchParams } from "next/navigation";
import { details, crops } from "../components/data";
import { useRouter } from "next/navigation";
import { useState, Suspense } from "react";
import {IoArrowBack} from "react-icons/io5"
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

const DetailsContent = () => {
  const searchParams = useSearchParams();
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
    <div className="flex flex-col text-black">
       {/* Sticky Header */}
       <div className="sticky top-[75px] z-50 bg-white border-b border-gray-200 px-5 py-1">
         <div className="flex justify-between my-2"> 
           <div className="flex gap-1 items-center"> 
             <button
               onClick={() => { router.push("/"); }}
               aria-label="Back"
               className="flex items-center justify-center rounded hover:bg-gray-200 transition-colors"
             >
               <span>
                 <IoArrowBack size={20} />
               </span>
             </button>
             <h1 className="whitespace-nowrap text-sm font-bold">{variety?.crop} / {varietyname}</h1> 
           </div>
           
           <div className="flex items-center gap-2 text-xs">
             <h1>Language / भाषा </h1> 
             <select 
               value={selectedLanguage} 
               onChange={(e) => setSelectedLanguage(e.target.value)}
               className="px-1 py-1 border border-gray-300 rounded"
             >
               <option value="English">English</option>
               <option value="Hindi">Hindi</option>
               <option value="Kannada">Kannada</option>
               <option value="Marathi">Marathi</option>
               <option value="Tamil">Tamil</option>
             </select>
           </div>
         </div>
       </div>
       
       {/* Scrollable Content */}
       <div className="flex flex-col gap-4 px-5 py-4 mt-4">
      
        <div className="flex flex-col gap-2  bg-[#DAF8E5] p-4 items-start">
          <div className="flex justify-center items-center min-w-full">
            <img src={variety?.image} className="w-[294px] h-[294px]" alt={varietyname || "Crop variety image"}/>
          </div>
          <LanguageComponent />
        </div>
      </div>
    </div>
  );
};

const Details = () => {
  return (
    <Suspense fallback={<div className="flex justify-center items-center min-h-screen">Loading...</div>}>
      <DetailsContent />
    </Suspense>
  );
};

export default Details;
