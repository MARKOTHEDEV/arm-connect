"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { SideDrawer } from "./side-drawer";

const questionOptions = [
  "In what city were you born?",
  "What is your mother's maiden name?",
  "What was the name of your first pet?",
  "What was the name of your first school?",
  "What is your favourite movie?",
];

interface SecurityQuestionsDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onProceed: (
    questions: { question: string; answer: string }[]
  ) => void;
  width?: string;
}

function SecurityQuestionsDrawer({
  open,
  onOpenChange,
  onProceed,
  width,
}: SecurityQuestionsDrawerProps) {
  const [questions, setQuestions] = useState([
    { question: questionOptions[0], answer: "", dropdownOpen: false },
    { question: questionOptions[0], answer: "", dropdownOpen: false },
    { question: questionOptions[0], answer: "", dropdownOpen: false },
  ]);

  const updateQuestion = (index: number, question: string) => {
    setQuestions((prev) =>
      prev.map((q, i) =>
        i === index ? { ...q, question, dropdownOpen: false } : q
      )
    );
  };

  const updateAnswer = (index: number, answer: string) => {
    setQuestions((prev) =>
      prev.map((q, i) => (i === index ? { ...q, answer } : q))
    );
  };

  const toggleDropdown = (index: number) => {
    setQuestions((prev) =>
      prev.map((q, i) =>
        i === index
          ? { ...q, dropdownOpen: !q.dropdownOpen }
          : { ...q, dropdownOpen: false }
      )
    );
  };

  const isComplete = questions.every(
    (q) => q.question && q.answer.trim() !== ""
  );

  const handleProceed = () => {
    if (isComplete) {
      onProceed(
        questions.map((q) => ({ question: q.question, answer: q.answer }))
      );
    }
  };

  return (
    <SideDrawer
      open={open}
      onOpenChange={onOpenChange}
      width={width}
    >
      <div className="flex flex-col gap-[20px]">
        <h2 className="text-[20px] font-bold text-text-header leading-[28px]">
          Choose a security question
        </h2>
        <p className="text-[13px] font-normal text-text-body leading-[18px]">
          Create a security question that may be used as an additional layer
          security when you make changes to your account
        </p>
        {questions.map((q, index) => (
          <div key={index} className="flex flex-col gap-[12px]">
            {/* Question Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown(index)}
                className="w-full flex items-center justify-between border border-card-stroke rounded-[12px] px-[16px] pt-[10px] pb-[12px] text-left"
              >
                <div className="flex flex-col gap-[2px] flex-1">
                  <span className="text-[11px] font-normal text-text-body leading-[14px]">
                    Security question {index + 1}
                  </span>
                  <span className="text-[14px] font-semibold text-text-header leading-[20px]">
                    {q.question}
                  </span>
                </div>
                <ChevronDown
                  size={16}
                  className={`text-text-body shrink-0 transition-transform ${
                    q.dropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown options */}
              {q.dropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-[4px] bg-white border border-card-stroke rounded-[12px] shadow-lg z-10 overflow-hidden">
                  {questionOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => updateQuestion(index, option)}
                      className={`w-full text-left px-[16px] py-[12px] text-[13px] leading-[18px] hover:bg-[#F9FAFB] transition-colors ${
                        q.question === option
                          ? "text-primary font-semibold"
                          : "text-text-header font-normal"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Answer Input */}
            <div className="border border-card-stroke rounded-[12px] px-[16px] pt-[10px] pb-[12px]">
              <label className="text-[11px] font-normal text-text-body leading-[14px] block mb-[2px]">
                Your answer {index + 1}
              </label>
              <input
                type="text"
                value={q.answer}
                onChange={(e) => updateAnswer(index, e.target.value)}
                className="w-full text-[14px] font-semibold text-text-header leading-[20px] outline-none bg-transparent"
              />
            </div>
          </div>
        ))}

        {/* Proceed button */}
        <button
          onClick={handleProceed}
          disabled={!isComplete}
          className="w-full h-[48px] bg-primary rounded-[8px] text-white text-[14px] font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-[8px]"
        >
          Proceed
        </button>
      </div>
    </SideDrawer>
  );
}

export { SecurityQuestionsDrawer };
