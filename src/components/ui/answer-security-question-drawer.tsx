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

interface AnswerSecurityQuestionDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onProceed: (data: { question: string; answer: string }) => void;
  width?: string;
}

function AnswerSecurityQuestionDrawer({
  open,
  onOpenChange,
  onProceed,
  width,
}: AnswerSecurityQuestionDrawerProps) {
  const [question, setQuestion] = useState(questionOptions[0]);
  const [answer, setAnswer] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleProceed = () => {
    if (answer.trim()) {
      onProceed({ question, answer });
    }
  };

  return (
    <SideDrawer open={open} onOpenChange={onOpenChange} width={width}>
      <div className="flex flex-col gap-[20px]">
        <h2 className="text-[20px] font-bold text-text-header leading-[28px]">
          Security question
        </h2>
        <p className="text-[13px] font-normal text-text-body leading-[18px]">
          Provide the answer to your security question
        </p>

        {/* Question Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-full flex items-center justify-between border border-card-stroke rounded-[12px] px-[16px] pt-[10px] pb-[12px] text-left"
          >
            <div className="flex flex-col gap-[2px] flex-1">
              <span className="text-[11px] font-normal text-text-body leading-[14px]">
                Security question 1
              </span>
              <span className="text-[14px] font-semibold text-text-header leading-[20px]">
                {question}
              </span>
            </div>
            <ChevronDown
              size={16}
              className={`text-text-body shrink-0 transition-transform ${
                dropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {dropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-[4px] bg-white border border-card-stroke rounded-[12px] shadow-lg z-10 overflow-hidden">
              {questionOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setQuestion(option);
                    setDropdownOpen(false);
                  }}
                  className={`w-full text-left px-[16px] py-[12px] text-[13px] leading-[18px] hover:bg-[#F9FAFB] transition-colors ${
                    question === option
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
            Your answer 1
          </label>
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="w-full text-[14px] font-semibold text-text-header leading-[20px] outline-none bg-transparent"
          />
        </div>

        {/* Proceed button */}
        <button
          onClick={handleProceed}
          disabled={!answer.trim()}
          className="w-full h-[48px] bg-primary rounded-[8px] text-white text-[14px] font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Proceed
        </button>
      </div>
    </SideDrawer>
  );
}

export { AnswerSecurityQuestionDrawer };
