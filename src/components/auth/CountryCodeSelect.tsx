"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

export interface Country {
  name: string;
  code: string;
  dialCode: string;
  flag: string;
}

const COUNTRIES: Country[] = [
  { name: "Nigeria", code: "NG", dialCode: "+234", flag: "🇳🇬" },
  { name: "United States", code: "US", dialCode: "+1", flag: "🇺🇸" },
  { name: "United Kingdom", code: "GB", dialCode: "+44", flag: "🇬🇧" },
  { name: "Canada", code: "CA", dialCode: "+1", flag: "🇨🇦" },
  { name: "South Africa", code: "ZA", dialCode: "+27", flag: "🇿🇦" },
  { name: "Ghana", code: "GH", dialCode: "+233", flag: "🇬🇭" },
  { name: "Kenya", code: "KE", dialCode: "+254", flag: "🇰🇪" },
  { name: "India", code: "IN", dialCode: "+91", flag: "🇮🇳" },
  { name: "China", code: "CN", dialCode: "+86", flag: "🇨🇳" },
  { name: "Germany", code: "DE", dialCode: "+49", flag: "🇩🇪" },
  { name: "France", code: "FR", dialCode: "+33", flag: "🇫🇷" },
  { name: "Brazil", code: "BR", dialCode: "+55", flag: "🇧🇷" },
  { name: "Australia", code: "AU", dialCode: "+61", flag: "🇦🇺" },
  { name: "Japan", code: "JP", dialCode: "+81", flag: "🇯🇵" },
  { name: "Egypt", code: "EG", dialCode: "+20", flag: "🇪🇬" },
  { name: "Tanzania", code: "TZ", dialCode: "+255", flag: "🇹🇿" },
  { name: "Uganda", code: "UG", dialCode: "+256", flag: "🇺🇬" },
  { name: "Rwanda", code: "RW", dialCode: "+250", flag: "🇷🇼" },
  { name: "Cameroon", code: "CM", dialCode: "+237", flag: "🇨🇲" },
  { name: "Senegal", code: "SN", dialCode: "+221", flag: "🇸🇳" },
  { name: "Côte d'Ivoire", code: "CI", dialCode: "+225", flag: "🇨🇮" },
  { name: "Ethiopia", code: "ET", dialCode: "+251", flag: "🇪🇹" },
  { name: "Morocco", code: "MA", dialCode: "+212", flag: "🇲🇦" },
  { name: "Algeria", code: "DZ", dialCode: "+213", flag: "🇩🇿" },
  { name: "Tunisia", code: "TN", dialCode: "+216", flag: "🇹🇳" },
  { name: "United Arab Emirates", code: "AE", dialCode: "+971", flag: "🇦🇪" },
  { name: "Saudi Arabia", code: "SA", dialCode: "+966", flag: "🇸🇦" },
  { name: "Ireland", code: "IE", dialCode: "+353", flag: "🇮🇪" },
  { name: "Netherlands", code: "NL", dialCode: "+31", flag: "🇳🇱" },
  { name: "Italy", code: "IT", dialCode: "+39", flag: "🇮🇹" },
  { name: "Spain", code: "ES", dialCode: "+34", flag: "🇪🇸" },
  { name: "Portugal", code: "PT", dialCode: "+351", flag: "🇵🇹" },
  { name: "Sweden", code: "SE", dialCode: "+46", flag: "🇸🇪" },
  { name: "Norway", code: "NO", dialCode: "+47", flag: "🇳🇴" },
  { name: "Singapore", code: "SG", dialCode: "+65", flag: "🇸🇬" },
];

interface CountryCodeSelectProps {
  selected: Country;
  onChange: (country: Country) => void;
}

export function CountryCodeSelect({ selected, onChange }: CountryCodeSelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (open && searchRef.current) {
      searchRef.current.focus();
    }
  }, [open]);

  const filtered = search
    ? COUNTRIES.filter(
        (c) =>
          c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.dialCode.includes(search)
      )
    : COUNTRIES;

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-[126px] border-[1.5px] border-card-stroke rounded-[8px] h-[56px] flex items-center gap-[8px] px-[12px] py-[16px]"
      >
        <span className="text-[18px] shrink-0">{selected.flag}</span>
        <span className="text-[14px] font-medium text-forms-input leading-[20px] flex-1 text-left">
          {selected.dialCode}
        </span>
        <Image
          src="/icons/chevron-down.svg"
          alt=""
          width={24}
          height={24}
          className="shrink-0"
        />
      </button>

      {open && (
        <div className="absolute top-[60px] left-0 w-[280px] max-h-[300px] bg-white border border-card-stroke rounded-[8px] shadow-lg z-50 flex flex-col overflow-hidden">
          {/* Search */}
          <div className="p-[8px] border-b border-card-stroke">
            <input
              ref={searchRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search country..."
              className="w-full text-[13px] px-[10px] py-[8px] border border-card-stroke rounded-[6px] outline-none focus:border-primary placeholder:text-forms-input"
            />
          </div>

          {/* Country List */}
          <div className="overflow-y-auto flex-1">
            {filtered.map((country) => (
              <button
                key={country.code}
                type="button"
                onClick={() => {
                  onChange(country);
                  setOpen(false);
                  setSearch("");
                }}
                className={`w-full flex items-center gap-[10px] px-[12px] py-[10px] hover:bg-[#f9fafb] text-left ${
                  selected.code === country.code ? "bg-[#f3f4f6]" : ""
                }`}
              >
                <span className="text-[18px]">{country.flag}</span>
                <span className="text-[13px] text-text-header flex-1 truncate">
                  {country.name}
                </span>
                <span className="text-[13px] text-text-body shrink-0">
                  {country.dialCode}
                </span>
              </button>
            ))}
            {filtered.length === 0 && (
              <p className="text-[13px] text-text-body text-center py-[16px]">
                No countries found
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export const DEFAULT_COUNTRY = COUNTRIES[0]; // Nigeria
