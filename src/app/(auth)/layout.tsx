import { GuestGuard } from "@/guard/GuestGuard";
import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GuestGuard>
      <div className="min-h-screen flex bg-page-background">
        {/* Left Panel - Branded */}
        <div className="hidden lg:flex lg:w-[424px] relative overflow-hidden">
          {/* Background Gradient */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, #0A0319 13.36%, #560933 100%)",
            }}
          />

          {/* Top Decorative Ellipse */}
          <div className="absolute -top-[34.77%] -left-[26.28%] w-[119%] h-[60%]">
            <Image
              src="/images/ellipse-top.svg"
              alt=""
              fill
              className="object-contain rotate-45"
            />
          </div>

          {/* Bottom Decorative Ellipse */}
          <div className="absolute -bottom-[52.17%] -left-[55.01%] w-[209%] h-[105%] rotate-180">
            <Image
              src="/images/ellipse-bottom.svg"
              alt=""
              fill
              className="object-contain"
            />
          </div>

          {/* Coin Jar Image */}
          <div className="absolute bottom-0 -left-[19px] w-[362px] h-[316px]">
            <Image
              src="/images/coin-jar.png"
              alt=""
              fill
              className="object-cover"
            />
          </div>

          {/* Content */}
          <div className="absolute top-[61px] left-[35px] flex flex-col gap-[104px] w-[351px] z-10">
            {/* Logo */}
            <div className="relative w-[68px] h-[33px]">
              <Image
                src="/images/logo-white.svg"
                alt="ARM Connect"
                fill
                className="object-contain"
              />
            </div>

            {/* Tagline */}
            <div className="flex flex-col gap-[39px] w-full">
              <h1 className="font-bold text-[30px] text-white leading-[38px]">
                We are excellent money managers
              </h1>
              <p className="font-medium text-[16px] text-text-body leading-[24px]">
                Give your customers more value for every transaction with our
                investment options
              </p>
            </div>
          </div>
        </div>

        {/* Right Panel - Form */}
        <div className="flex-1 flex flex-col min-h-screen">
          <div className="flex-1 flex items-center justify-center px-4 lg:px-8">
            {children}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-center gap-[12px] py-[20px] px-4 flex-wrap">
            <div className="flex items-center gap-[6px]">
              <p className="font-bold text-[12px] text-paragraph-2 leading-[18px]">
                Fully licensed by the Securities and Exchange Commission
              </p>
              <div className="relative w-[14px] h-[14px] rounded-full overflow-hidden">
                <Image
                  src="/images/sec-badge.png"
                  alt="SEC Badge"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <p className="font-bold text-[12px] text-text-body leading-[18px]">
              © Copyright 2026. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </GuestGuard>
  );
}
