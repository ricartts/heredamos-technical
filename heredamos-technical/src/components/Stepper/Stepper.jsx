import React, { useEffect, useState } from "react";
import "./Stepper.css";

const steps = ["Upload Documents", "Legal Review", "Signature", "Confirmation"];

const Stepper = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [maxUnlockedStep, setMaxUnlockedStep] = useState(0);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("stepperState"));
    if (stored) {
      setCurrentStep(stored.currentStep);
      setMaxUnlockedStep(stored.maxUnlockedStep);
    }
  }, []);

  const saveState = (step, maxStep) => {
    localStorage.setItem(
      "stepperState",
      JSON.stringify({
        currentStep: step,
        maxUnlockedStep: maxStep,
      })
    );
  };

  const goToStep = (index) => {
    if (index <= maxUnlockedStep) {
      setCurrentStep(index);
      saveState(index, maxUnlockedStep);
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      const newStep = currentStep + 1;
      const newMax = Math.max(maxUnlockedStep, newStep);
      setCurrentStep(newStep);
      setMaxUnlockedStep(newMax);
      saveState(newStep, newMax);
    }
  };

  return (
    <div className="stepper-container">
      <h2>Inheritance Process</h2>
      <div className="stepper-box">
        {steps.map((step, index) => {
          let status = "pending";
          if (index < currentStep) status = "done";
          if (index === currentStep) {
            status = "current";
          } else if (index <= maxUnlockedStep) {
            status = "done";
          } else {
            status = "pending";
          }

          return (
            <div
              key={index}
              className={`step ${status}`}
              onClick={() => goToStep(index)}
            >
              {step}
            </div>
          );
        })}
      </div>
      <div className="step-info">
        Current Step: <strong>{steps[currentStep]}</strong>
      </div>
      {currentStep < steps.length - 1 && (
        <button className="step-button" onClick={nextStep}>
          Next Step
        </button>
      )}
    </div>
  );
};

export default Stepper;
