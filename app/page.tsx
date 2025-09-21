"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import StepNavbar from "./components/Stepbar";
import { details } from "./components/data";
import { useRouter } from "next/navigation";

// ---------------------- TYPES ----------------------
interface Option {
  key: string;
  name: string;
}

interface Variety {
  name: string;
  crop: string;
  season: string;
  image: string;
}

// ---------------------- SELECTOR ----------------------
interface SelectorProps {
  setState: (value: string) => void;
  selectedvalue: string;
  value: string;
  optionKey: string;
}

const Selector = ({ setState, selectedvalue, value, optionKey }: SelectorProps) => {
  return (
    <div
      className={`px-3 py-2 border-[1px] border-[#CAC4D0] rounded-[4px] hover:cursor-pointer whitespace-nowrap ${
        selectedvalue === optionKey ? "bg-[#FFF6D3] border-[2px]" : ""
      }`}
      onClick={() => setState(optionKey)}
    >
      {value}
    </div>
  );
};

const soydetiailsenglish = () =>
{
  return <div className="flex flex-col">
    <h1><span className="font-bold">Sowing Time:</span> 15 June to 5 July</h1>
    <h1><span className="font-bold">Seed Rate:</span> 30 Kg per acre</h1>
    <h1><span className="font-bold">Sowing Method:</span> Maintain a row-to-row distance of 30–45 cm and plant-to-plant
    distance of 4–5 cm. Sow seeds at a depth of 3–4 cm.</h1>
    <h1><span className="font-bold">Fertilizer Quantity:</span> At the time of sowing, apply 20 kg Nitrogen, 60 kg Phosphorus, 20
    kg Potash, and 20 kg Sulphur. Fertilizer should be placed 5–7 cm below the seeds.</h1>
    <h1><span>Seed Treatment:</span>Treat 1 kg of seed with 2.5 g Thiram.</h1>
    <h1><span className="font-bold">Weeding:</span> To obtain higher yields, keep the crop free from weeds for up to 45 days. For
    this, perform one or two hand weedings and run the weeder twice to destroy weeds.</h1>
    <h1><span className="font-bold">Irrigation: </span>Moisture in the soil is essential during flowering and pod formation stages.
    If there is no rainfall during these stages, irrigation is necessary.</h1>
    <div className="flex flex-col">
    <h1><span className="font-bold">Irrigation: </span>Moisture in the soil is essential during flowering and pod formation stages.
    If there is no rainfall during these stages, irrigation is necessary.</h1>
    <ul className="list-disc">
      <li>0.1% Profenofos 50 EC</li>
 <li>0.05% Monocrotophos 36 EC</li>
<li>0.04% Quinolphos 25 EC</li>
    </ul>
    </div>
    <h1><span className="font-bold">Harvesting:</span>Harvest when the grains have 14–16% moisture.</h1> 
    <h1><span className="font-bold">Yield:</span>6–8 quintals per acre</h1>
    <h1><span className="font-bold">Note:</span>Before sowing, treat the seeds with Thiram (as provided in the packet).</h1>
  </div>
}

// ---------------------- SELECT SEASON ----------------------
interface SelectSeasonProps {
  setState: (value: string) => void;
  season: string;
  values: Option[];
}

const Selectseason = ({ setState, season, values }: SelectSeasonProps) => {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="font-bold">Select Season / मौसम चुनें*</h1>
      <div className="flex gap-2">
        {values.map((value) => (
          <Selector
            key={value.key}
            selectedvalue={season}
            setState={setState}
            value={value.name}
            optionKey={value.key}
          />
        ))}
      </div>
    </div>
  );
};

// ---------------------- SELECT CROP ----------------------
interface SelectCropProps {
  setState: (value: string) => void;
  crop: string;
  values: Option[];
}

const Selectcrop = ({ setState, crop, values }: SelectCropProps) => {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="font-bold">Select Crop / फसल चुनें*</h1>
      <div
        className="flex gap-3 overflow-x-auto scrollbar-none"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <style>
          {`
            .hide-scrollbar::-webkit-scrollbar {
              display: none;
            }
          `}
        </style>
        <div className="hide-scrollbar flex gap-3 w-full">
          {values.map((value) => (
            <Selector
              key={value.key}
              selectedvalue={crop}
              setState={setState}
              value={value.name}
              optionKey={value.key}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// ---------------------- VARIETY CARD ----------------------
interface VarietyCardProps {
  image: string;
  name: string;
  setState: (value: string) => void;
  variety: string;
  optionKey: string;
}

const Varietycard = ({ image, name, setState, optionKey, variety }: VarietyCardProps) => {
  return (
    <div
      className={`min-w-full p-[10px] flex flex-col gap-[10px] text-black rounded-[4px] border-[#2C593C] border-[2px] ${
        optionKey === variety ? "bg-[#FFF6D3]" : ""
      }`}
      onClick={() => setState(optionKey)}
    >
      <img src={image} alt={name} className="w-[151px] h-[151px]" />
      <h1 className="text-center">{name}</h1>
    </div>
  );
};

// ---------------------- SELECT VARIETY ----------------------
interface SelectVarietyProps {
  setState: (value: string) => void;
  variety: string;
  varieties: Variety[];
  crop: string;
  season: string;
}

const Selectvariety = ({ setState, variety, varieties, crop, season }: SelectVarietyProps) => {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="font-bold">Choose Variety / किस्म चुनें*</h1>
      <div className="grid grid-cols-2 gap-3">
        {varieties
          ?.filter(
            (item) =>
              item.crop.toLowerCase().replace(/[^a-z]/gi, "") === crop?.toLowerCase().replace(/[^a-z]/gi, "") &&
              item.season.toLowerCase().replace(/[^a-z]/gi, "") === season?.toLowerCase().replace(/[^a-z]/gi, "")
          )
          .map((item) => (
            <Varietycard
              key={item.name}
              setState={setState}
              name={item.name}
              image={item.image}
              optionKey={item.name}
              variety={variety}
            />
          ))}
      </div>
    </div>
  );
};





// ---------------------- MAIN COMPONENT ----------------------
export default function Home() {
  const [season, setSeason] = useState("");
  const [crop, setCrop] = useState("");
  const [variety, selectVariety] = useState("");
  const [step, setStep] = useState(0);
  const router = useRouter(); // ✅ create router

  const crops: Option[] = [
    { key: "soyabean", name: "🫘 Soybean / सोयाबीन" },
    { key: "methi", name: "🌿 Methi / मेथी" },
    {key:"wheat",name:" 🌾 Wheat / गेहूं"}
  ];

  const seasons: Option[] = [
    { key: "kharif", name: "☀️ Kharif / खरीफ" },
    { key: "rabi", name: "❄️ Rabi / रबी" },
  ];

  useEffect(() => {
    if (season !== "") setStep(1);
    if (season !== "" && crop !== "") setStep(2);
    if (season !== "" && crop !== "" && variety !== "") setStep(3);
  }, [season, crop, variety]);


  const handleContinue = () => {
    if (step === 3) {
      // ✅ Route with crop and variety as query params
      router.push(`/details?crop=${encodeURIComponent(crop)}&variety=${encodeURIComponent(variety)}`);
    }
  };


  return (
    <div className="flex flex-col justify-between text-black py-4 px-5   gap-4 relative min-h-screen">
      <div className="flex flex-col  flex-grow"> <StepNavbar currentStep={step} />
      <div className="flex flex-col gap-8">
        <Selectseason setState={setSeason} season={season} values={seasons} />
        <Selectcrop setState={setCrop} crop={crop} values={crops} />
        <Selectvariety setState={selectVariety} variety={variety} varieties={details} crop={crop} season={season} />

      </div>
      </div>
     <div className="min-w-full flex justify-center"><button
          className={`${
            step === 3 ? "bg-[#2C593C] text-white " : "bg-[#B3B3B3] text-[#757575]"
          } text-[20px] w-fit px-4 py-1 rounded-[4px] `}
          disabled={step !== 3} // disable until step 3
          onClick={handleContinue}
        >
          Continue / आगे बढ़ें
        </button></div>
      
    </div>
  );
}
