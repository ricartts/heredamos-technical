import React from "react";
import "./Stepper.css";

const steps = ["Upload Documents", "Legal Review", "Signature", "Confirmation"];

const Stepper = () => {
  const currentStep = parseInt(localStorage.getItem("currentStep") || "0", 10);

  const goToStep = (index) => {
    if (index <= currentStep + 1) {
      localStorage.setItem("currentStep", index);
      window.location.reload();
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      localStorage.setItem("currentStep", currentStep + 1);
      window.location.reload();
    }
  };

  return (
    <div className="stepper-container">
      <h2>Inheritance Process</h2>
      <div className="stepper-box">
        {steps.map((step, index) => {
          let status = "pending";
          if (index < currentStep) status = "done";
          else if (index === currentStep) status = "current";

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
