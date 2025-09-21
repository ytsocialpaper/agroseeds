// components/StepNavbar.js
import React from "react";

interface StepNavbarProps {
  currentStep: number;
}

const StepNavbar = ({ currentStep }: StepNavbarProps) => {
  const steps = [1, 2, 3];


  return (
    <div className="flex items-center justify-center bg-white py-4  -mx-5">
      <div className="flex items-center ">
        {steps.map((step, idx) => (
          <div key={step} className="flex items-center">
            {/* Step Circle */}
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full border-2 
              ${
                currentStep >= step
                  ? "bg-green-700 text-white border-green-700"
                  : "bg-white text-green-700 border-green-700"
              }`}
            >
              {step}
            </div>

            {/* Connector line (skip for last step) */}
            {idx < steps.length - 1 && (
              <div className="w-16 h-[2px] bg-green-700 "></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepNavbar;
