"use client";
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
        selectedvalue === optionKey ? "bg-[#DAF8E5] border-[2px]" : ""
      }`}
      onClick={() => setState(optionKey)}
    >
      {value}
    </div>
  );
};

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
        optionKey === variety ? "bg-[#DAF8E5]" : ""
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

  // Function to get crops available for the selected season
  const getCropsForSeason = (selectedSeason: string): Option[] => {
    if (!selectedSeason) return [];

    const availableCrops = details
      .filter((item) => item.season.toLowerCase() === selectedSeason.toLowerCase())
      .map((item) => item.crop)
      .filter((crop, index, self) => self.indexOf(crop) === index);

    const cropMap: { [key: string]: string } = {
      soyabean: "🫘 Soybean / सोयाबीन",
      methi: "🌿 Methi / मेथी",
      wheat: "🌾 Wheat / गेहूं",
      chana: "🫘 Chana / चना",
      maize: "🌽 Maize / मक्का",
      moong: "🟢 Moong / मूंग",
      paddy: "🌾 Paddy / धान",
      sesame: "🫒 Sesame / तिल",
      toor: "🫘 Toor / तूर",
      urad: "⚫ Urad / उड़द",
    };

    return availableCrops.map((crop) => ({
      key: crop,
      name: cropMap[crop] || crop,
    }));
  };

  const crops = getCropsForSeason(season);

  const seasons: Option[] = [
    { key: "kharif", name: "☀️ Kharif / खरीफ" },
    { key: "rabi", name: "❄️ Rabi / रबी" },
  ];

  useEffect(() => {
    if (season !== "") setStep(1);
    if (season !== "" && crop !== "") setStep(2);
    if (season !== "" && crop !== "" && variety !== "") setStep(3);
  }, [season, crop, variety]);

  useEffect(() => {
    if (season !== "") {
      setCrop("");
      selectVariety("");
    }
  }, [season]);

  useEffect(() => {
    if (crop !== "") {
      selectVariety("");
    }
  }, [crop]);

  const handleContinue = () => {
    if (step === 3) {
      router.push(`/details?crop=${encodeURIComponent(crop)}&variety=${encodeURIComponent(variety)}`);
    }
  };

  return (
    <div className="flex flex-col justify-between text-black py-4 px-5 gap-4 relative min-h-screen pb-20">
      <div className="flex flex-col flex-grow">
        <StepNavbar currentStep={step} />
        <div className="flex flex-col gap-8">
          {/* Step 0: Select Season */}
          <Selectseason setState={setSeason} season={season} values={seasons} />

          {/* Step 1: Show Crop only after season is selected */}
          {step >= 1 && <Selectcrop setState={setCrop} crop={crop} values={crops} />}

          {/* Step 2: Show Variety only after crop is selected */}
          {step >= 2 && (
            <Selectvariety
              setState={selectVariety}
              variety={variety}
              varieties={details}
              crop={crop}
              season={season}
            />
          )}
        </div>
      </div>
      <div className="fixed bottom-[calc(env(safe-area-inset-bottom)+16px)] left-1/2 -translate-x-1/2 z-50 min-w-full flex justify-center">
        <button
          className={`${
            step === 3 ? "bg-[#2C593C] text-white " : "bg-[#B3B3B3] text-[#757575]"
          } text-[20px] w-fit px-4 py-1 rounded-[4px] `}
          disabled={step !== 3}
          onClick={handleContinue}
        >
          Continue / आगे बढ़ें
        </button>
      </div>
    </div>
  );
}
