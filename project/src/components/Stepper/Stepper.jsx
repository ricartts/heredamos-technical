import { useEffect, useState } from "react";
import "./Stepper.css";

const steps = ["Upload Documents", "Legal Review", "Signature", "Confirmation"];

const Stepper = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [maxUnlockedStep, setMaxUnlockedStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("stepperState"));
    if (stored) {
      setCurrentStep(stored.currentStep || 0);
      setMaxUnlockedStep(stored.maxUnlockedStep || 0);
      setFinished(stored.finished || false);
    }
  }, []);

  const saveState = (step, maxStep, isFinished = finished) => {
    localStorage.setItem(
      "stepperState",
      JSON.stringify({
        currentStep: step,
        maxUnlockedStep: maxStep,
        finished: isFinished,
      })
    );
  };

  const goToStep = (index) => {
    if (index <= maxUnlockedStep && !finished) {
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
    } else {
      // Últim pas: mostrar spinner i acabar
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setFinished(true);
        saveState(currentStep, maxUnlockedStep, true);
      }, 2000);
    }
  };

  if (finished) {
    return (
      <div className="finished-message">
        <h2>Procedure finished!</h2>
        <button
          className="step-button"
          onClick={() => {
            setCurrentStep(0);
            setMaxUnlockedStep(0);
            setFinished(false);
            saveState(0, 0, false);
          }}
        >
          Restart
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner" />
        <p>Finishing process...</p>
      </div>
    );
  }

  return (
    <div className="stepper-container">
      <h2>Inheritance Process</h2>
      <div className="stepper-box">
        {steps.map((step, index) => {
          let status;
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
      <button className="step-button" onClick={nextStep}>
        {currentStep === steps.length - 1 ? "End" : "Next Step"}
      </button>
    </div>
  );
};

export default Stepper;
