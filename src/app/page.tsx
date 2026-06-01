import Image from "next/image";
import Link from "next/link";
import { LandingNavbar } from "@/components/landing/LandingNavbar";
import { ROUTES } from "@/lib/routes";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="sticky top-0 z-50">
        <LandingNavbar />
      </div>
      <main className="flex-1" style={{ background: "linear-gradient(0deg, #F6F6F6 0%, #F6F6F6 100%), #FFF" }}>
        {/* Hero Section */}
        <section className="px-[24px] py-[32px] max-w-[1200px] mx-auto w-full">
          <div className="bg-white border border-[#e6e5e3] rounded-[16px] shadow-[0px_4px_20px_0px_rgba(17,19,24,0.06)] overflow-hidden flex items-center relative min-h-[340px]">
            {/* Content */}
            <div className="relative z-10 p-[33px] w-[663px] flex flex-col gap-[32px] pr-[48px]">
              <span className="text-[14px] font-medium text-primary tracking-[0.7px] uppercase leading-[20px]">
                ARM CONNECT
              </span>

              <div className="flex flex-col gap-[12px]">
                <h1 className="text-[48px] font-semibold tracking-[-0.96px] leading-[56px]">
                  <span className="text-[#111318]">Build With</span>
                  <br />
                  <span className="text-primary">Confidence</span>
                </h1>
                <p className="text-[18px] font-normal text-[#5b5f66] leading-[28px]">
                  Empower your institutional clients with enterprise-grade investment APIs. Integrate diverse asset classes seamlessly with ARM Connect&apos;s rigorous financial infrastructure.
                </p>
              </div>

              <div className="flex gap-[24px] items-center">
                <Link
                  href={ROUTES.SIGNUP}
                  className="bg-primary border border-[#ebebeb] text-white font-semibold text-[16px] leading-[24px] px-[48px] py-[12px] rounded-[8px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)]"
                >
                  Get Started
                </Link>
                <Link
                  href="#developers"
                  className="bg-white border border-[#d0d5dd] text-[#344054] font-semibold text-[16px] leading-[24px] px-[48px] py-[12px] rounded-[8px] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] h-[48px] flex items-center justify-center"
                >
                  View API Docs
                </Link>
              </div>
            </div>

            {/* Illustration */}
            <div className="absolute right-0 bottom-0 w-[473px] h-[363px]">
              <Image
                src="/images/hero-money-tree.png"
                alt="Money tree illustration"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </section>

        {/* Why Integrate with ARM */}
        <section className="px-[24px] py-[64px] max-w-[1200px] mx-auto w-full flex flex-col gap-[40px] items-center">
          {/* Header */}
          <div className="flex flex-col gap-[8px] items-center max-w-[768px] text-center">
            <h2 className="text-[32px] font-semibold text-[#111318] tracking-[-0.32px] leading-[40px]">
              Why Integrate with ARM?
            </h2>
            <p className="text-[16px] font-normal text-[#5b5f66] leading-[24px]">
              Built on decades of financial expertise, providing robust infrastructure for modern institutions.
            </p>
          </div>

          {/* Cards */}
          <div className="flex gap-[24px] w-full">
            {[
              { icon: "/icons/feature-trusted.svg", title: "Trusted Asset Manager", description: "Leverage the reputation and stability of a leading asset management institution." },
              { icon: "/icons/feature-integration.svg", title: "Seamless Integration", description: "Developer-friendly RESTful APIs designed for rapid deployment and scalability." },
              { icon: "/icons/feature-diverse.svg", title: "Diverse Investment Products", description: "Access a wide array of asset classes through a single unified interface." },
              { icon: "/icons/feature-secure.svg", title: "Secure & Compliant", description: "Bank-grade security meeting all regulatory requirements out-of-the-box." },
            ].map((card) => (
              <div
                key={card.title}
                className="flex-1 bg-white border border-[#e6e5e3] rounded-[16px] p-[25px] flex flex-col gap-[8px] shadow-[0px_4px_10px_0px_rgba(17,19,24,0.06)]"
              >
                <div className="w-[40px] h-[40px] rounded-[8px] bg-[rgba(139,26,82,0.1)] flex items-center justify-center">
                  <Image src={card.icon} alt="" width={22} height={21} />
                </div>
                <h3 className="text-[20px] font-semibold text-[#111318] leading-[30px] pt-[8px]">
                  {card.title}
                </h3>
                <p className="text-[14px] font-normal text-[#5b5f66] leading-[20px]">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </section>
        {/* Our Onboarding Models */}
        <section className="px-[24px] py-[64px] max-w-[1200px] mx-auto w-full flex flex-col gap-[40px]">
          {/* Header */}
          <div className="flex flex-col gap-[8px]">
            <h2 className="text-[32px] font-semibold text-[#111318] tracking-[-0.32px] leading-[40px]">
              Our Onboarding Models
            </h2>
            <p className="text-[16px] font-normal text-[#5b5f66] leading-[24px]">
              Flexible integration pathways designed for your specific institutional needs.
            </p>
          </div>

          {/* Cards */}
          <div className="flex gap-[24px]">
            {/* B2B Card */}
            <div className="flex-1 bg-white border border-[#e6e5e3] rounded-[16px] p-[32px] flex flex-col gap-[24px]">
              <h3 className="text-[24px] font-bold text-[#111318] leading-[32px]">
                For Institutions with Established Client Frameworks
              </h3>
              <p className="text-[16px] font-normal text-[#5b5f66] leading-[24px]">
                Integrate our trading and execution APIs seamlessly into your existing user interfaces. You maintain full control of the client experience while we handle the complex backend execution.
              </p>
              <div className="flex flex-col gap-[12px]">
                {["White-label execution", "Use your own KYC/AML", "Custom fee structures"].map((item) => (
                  <div key={item} className="flex items-center gap-[8px]">
                    <div className="w-[20px] h-[20px] rounded-full border-2 border-primary flex items-center justify-center shrink-0">
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="#a8005b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </div>
                    <span className="text-[14px] font-bold text-[#111318] leading-[20px]">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* B2B2C Card - Recommended */}
            <div className="flex-1 bg-white border-2 border-primary rounded-[16px] p-[32px] flex flex-col gap-[24px] relative">
              <span className="absolute top-[-1px] right-[24px] bg-primary text-white text-[12px] font-bold px-[16px] py-[4px] rounded-b-[8px] uppercase tracking-[0.5px]">
                Recommended
              </span>
              <h3 className="text-[24px] font-bold text-[#111318] leading-[32px]">
                For Institutions Seeking Client Onboarding & Visibility
              </h3>
              <p className="text-[16px] font-normal text-[#5b5f66] leading-[24px]">
                Leverage our full-stack solution including automated KYC, onboarding flows, and comprehensive client management dashboards alongside execution capabilities.
              </p>
              <div className="flex flex-col gap-[12px]">
                {["Automated KYC/AML", "Client portal included", "Turnkey deployment"].map((item) => (
                  <div key={item} className="flex items-center gap-[8px]">
                    <div className="w-[20px] h-[20px] rounded-full border-2 border-primary flex items-center justify-center shrink-0">
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="#a8005b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </div>
                    <span className="text-[14px] font-bold text-[#111318] leading-[20px]">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        {/* Products You Can Offer */}
        <section className="px-[24px] py-[64px] max-w-[1200px] mx-auto w-full flex flex-col gap-[40px]">
          {/* Header */}
          <div className="flex flex-col gap-[8px]">
            <h2 className="text-[32px] font-semibold text-[#111318] tracking-[-0.32px] leading-[40px] font-poppins">
              Products You Can Offer
            </h2>
            <p className="text-[16px] font-normal text-[#5b5f66] leading-[24px] font-poppins">
              Access a comprehensive suite of institutional-grade investment vehicles.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-12 gap-[24px]">
            {/* Mutual Funds - spans 8 cols, row 1 */}
            <div className="col-span-8 bg-white border border-[#e6e5e3] rounded-[16px] p-[33px] flex flex-col gap-[12px]">
              <div className="relative w-[66px] h-[58px]">
                <Image src="/images/product-mutual-funds.png" alt="" fill className="object-contain" />
              </div>
              <h3 className="text-[24px] font-medium text-[#111318] tracking-[-0.24px] leading-[32px] pt-[12px] font-poppins">
                Mutual Funds
              </h3>
              <p className="text-[16px] font-normal text-[#5b5f66] leading-[24px] font-poppins">
                Provide access to top-tier mutual funds with automated clearing and settlement processes managed through our API.
              </p>
            </div>

            {/* Equities - spans 4 cols, row 1, dark */}
            <div className="col-span-4 bg-[#111318] rounded-[16px] px-[32px] pt-[32px] pb-[42px] flex flex-col gap-[12px] overflow-hidden relative">
              <div className="absolute -top-[16px] -right-[16px] w-[128px] h-[128px] bg-[#8b1a52] rounded-full blur-[32px] opacity-20" />
              <div className="relative w-[55px] h-[58px]">
                <Image src="/images/product-equities.png" alt="" fill className="object-contain" />
              </div>
              <h3 className="text-[24px] font-medium text-white tracking-[-0.24px] leading-[32px] pt-[12px] font-poppins">
                Equities
              </h3>
              <p className="text-[14px] font-normal text-[#9ca3af] leading-[20px] font-poppins">
                Direct market access for comprehensive equity trading capabilities.
              </p>
            </div>

            {/* Fixed Income - spans 6 cols, row 2 */}
            <div className="col-span-6 bg-white border border-[#e6e5e3] rounded-[16px] p-[33px] flex flex-col gap-[12px]">
              <div className="relative w-[65px] h-[58px]">
                <Image src="/images/product-fixed-income.png" alt="" fill className="object-contain" />
              </div>
              <h3 className="text-[24px] font-medium text-[#111318] tracking-[-0.24px] leading-[32px] pt-[12px] font-poppins">
                Fixed Income Investments
              </h3>
              <p className="text-[16px] font-normal text-[#5b5f66] leading-[24px] font-poppins">
                Integrate bonds and fixed-income products with real-time pricing and yield calculations.
              </p>
            </div>

            {/* Managed Portfolios - spans 6 cols, row 2 */}
            <div className="col-span-6 bg-white border border-[#e6e5e3] rounded-[16px] p-[33px] flex flex-col gap-[12px]">
              <div className="relative w-[67px] h-[58px]">
                <Image src="/images/product-managed.png" alt="" fill className="object-contain" />
              </div>
              <h3 className="text-[24px] font-medium text-[#111318] tracking-[-0.24px] leading-[32px] pt-[12px] font-poppins">
                Managed Portfolios
              </h3>
              <p className="text-[16px] font-normal text-[#5b5f66] leading-[24px] font-poppins">
                Offer professionally curated portfolio strategies tailored to specific risk profiles.
              </p>
            </div>
          </div>
        </section>
        {/* How It Works */}
        <section className="px-[24px] py-[64px] max-w-[1200px] mx-auto w-full flex flex-col gap-[40px]">
          {/* Header */}
          <div className="flex flex-col items-center">
            <div className="w-[48px] h-[48px] bg-white border border-[#e6e5e3] rounded-full flex items-center justify-center shadow-[0px_4px_10px_0px_rgba(17,19,24,0.06)] mb-[16px]">
              <Image src="/icons/wrench.svg" alt="" width={20} height={21} />
            </div>
            <h2 className="text-[32px] font-semibold text-[#111318] tracking-[-0.32px] leading-[40px] text-center font-poppins">
              How It Works
            </h2>
            <p className="text-[16px] font-normal text-[#5b5f66] leading-[24px] text-center mt-[8px] font-poppins">
              A streamlined path from sandbox testing to live production environment.
            </p>
          </div>

          {/* Steps */}
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-[#e6e5e3] -translate-y-1/2" />

            <div className="grid grid-cols-4 gap-[24px] relative">
              {[
                { num: "01", title: "Sign Up", desc: "Create your developer account and access the sandbox environment." },
                { num: "02", title: "Integrate APIs", desc: "Build and test using our comprehensive documentation and SDKs." },
                { num: "03", title: "Go Live", desc: "Complete compliance checks and migrate to production keys." },
                { num: "04", title: "Scale", desc: "Monitor usage, expand product offerings, and grow your user base." },
              ].map((step) => (
                <div
                  key={step.num}
                  className="bg-white border border-[#e6e5e3] rounded-[16px] p-[25px] flex flex-col gap-[8px] items-center text-center shadow-[0px_4px_10px_0px_rgba(17,19,24,0.06)]"
                >
                  <span className="text-[16px] font-bold text-primary leading-[24px]">{step.num}</span>
                  <h3 className="text-[18px] font-semibold text-[#111318] leading-[27px] font-poppins">{step.title}</h3>
                  <p className="text-[16px] font-normal text-[#5b5f66] leading-[24px] font-poppins">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* Built for Developers */}
        <section className="px-[24px] py-[64px] max-w-[1200px] mx-auto w-full" id="developers">
          <div className="bg-white border border-[#e6e5e3] rounded-[16px] p-[49px] shadow-[0px_4px_10px_0px_rgba(17,19,24,0.06)]">
            <div className="grid grid-cols-2 gap-[48px]">
              {/* Left */}
              <div className="flex flex-col gap-[16px] pb-[50px]">
                <h2 className="text-[32px] font-semibold text-[#111318] tracking-[-0.32px] leading-[40px] font-poppins">
                  Built for Developers
                </h2>
                <p className="text-[16px] font-normal text-[#5b5f66] leading-[24px] font-poppins">
                  We prioritize developer experience with modern standards, clear documentation, and dedicated support channels.
                </p>

                <div className="flex flex-col gap-[4px] pt-[16px]">
                  <h3 className="text-[16px] font-semibold text-[#111318] leading-[24px] font-poppins">
                    Developer Experience
                  </h3>
                  <div className="flex flex-col gap-[8px]">
                    {[
                      { icon: "/icons/dev-restful.svg", text: "RESTful Architecture" },
                      { icon: "/icons/dev-webhooks.svg", text: "Webhooks for real-time events" },
                      { icon: "/icons/dev-openapi.svg", text: "Comprehensive OpenAPI Specs" },
                    ].map((item) => (
                      <div key={item.text} className="flex items-center gap-[8px]">
                        <Image src={item.icon} alt="" width={16} height={16} className="shrink-0" />
                        <span className="text-[16px] font-normal text-[#5b5f66] leading-[24px] font-poppins">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right - Use Cases */}
              <div className="bg-[#f6f6f6] border border-[#e6e5e3] rounded-[12px] p-[25px] flex flex-col gap-[16px]">
                <h3 className="text-[16px] font-semibold text-[#111318] leading-[24px] font-poppins">
                  Use Cases
                </h3>

                <div className="flex flex-col gap-[16px]">
                  <div className="bg-white border border-[#e6e5e3] rounded-[8px] p-[17px] flex flex-col gap-[4px]">
                    <span className="text-[16px] font-bold text-primary leading-[24px] font-poppins">
                      WealthTech Apps
                    </span>
                    <p className="text-[16px] font-normal text-[#5b5f66] leading-[24px] font-poppins">
                      Embed investment capabilities directly into consumer finance applications.
                    </p>
                  </div>

                  <div className="bg-white border border-[#e6e5e3] rounded-[8px] p-[17px] flex flex-col gap-[4px]">
                    <span className="text-[16px] font-bold text-primary leading-[24px] font-poppins">
                      Robo-Advisors
                    </span>
                    <p className="text-[16px] font-normal text-[#5b5f66] leading-[24px] font-poppins">
                      Automate portfolio allocation and rebalancing at scale.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Security & Compliance */}
        <section className="px-[24px] py-[64px] max-w-[1200px] mx-auto w-full">
          <div className="bg-[#111318] rounded-[16px] p-[48px] flex items-center justify-between overflow-hidden relative">
            {/* Pink blur glow */}
            <div className="absolute -left-[80px] -top-[80px] w-[256px] h-[256px] bg-[#a8005b] rounded-full blur-[32px] opacity-20" />

            {/* Left */}
            <div className="flex flex-col gap-[8px] w-[341px] relative z-10">
              <div className="w-[48px] h-[48px] bg-white/10 rounded-[12px] flex items-center justify-center">
                <Image src="/icons/sec-shield.svg" alt="" width={16} height={20} />
              </div>
              <h2 className="text-[28px] font-bold text-white leading-[42px] pt-[16px] font-poppins">
                Security & Compliance
              </h2>
              <p className="text-[16px] font-normal text-[#9ca3af] leading-[24px] font-poppins">
                Enterprise-grade protection for your institution and clients.
              </p>
            </div>

            {/* Right - 2x2 grid */}
            <div className="grid grid-cols-2 gap-x-[32px] gap-y-[32px] pl-[48px] w-[683px] relative z-10">
              {[
                { icon: "/icons/sec-encryption.svg", title: "Data Encryption", desc: "End-to-end encryption for all sensitive data." },
                { icon: "/icons/sec-regulatory.svg", title: "Regulatory Ready", desc: "Compliant with SEC & FINRA standards." },
                { icon: "/icons/sec-soc2.svg", title: "SOC 2 Type II", desc: "Independently audited security controls." },
                { icon: "/icons/sec-monitoring.svg", title: "24/7 Monitoring", desc: "Continuous threat detection and response." },
              ].map((item) => (
                <div key={item.title} className="flex gap-[12px] items-start">
                  <Image src={item.icon} alt="" width={20} height={21} className="shrink-0 mt-[2px]" />
                  <div className="flex flex-col">
                    <span className="text-[16px] font-bold text-white leading-[24px] font-poppins">
                      {item.title}
                    </span>
                    <span className="text-[16px] font-normal text-[#9ca3af] leading-[24px] font-poppins">
                      {item.desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* Support & FAQs */}
        <section className="px-[24px] py-[64px] max-w-[1200px] mx-auto w-full flex flex-col gap-[48px]">
          <h2 className="text-[32px] font-semibold text-[#111318] tracking-[-0.32px] leading-[40px] text-center font-poppins">
            Support & FAQs
          </h2>

          <div className="grid grid-cols-3 gap-[24px]">
            {/* Developer Support */}
            <div className="bg-white border border-[#e6e5e3] rounded-[16px] p-[25px] flex flex-col gap-[16px] shadow-[0px_4px_10px_0px_rgba(17,19,24,0.06)]">
              <h3 className="text-[20px] font-semibold text-[#111318] leading-[30px] font-poppins">
                Developer Support
              </h3>
              <p className="text-[16px] font-normal text-[#5b5f66] leading-[24px] font-poppins">
                Get help directly from the engineers who built the API.
              </p>
              <div className="flex flex-col gap-[12px]">
                {[
                  { icon: "/icons/link-forum.svg", text: "Community Forum" },
                  { icon: "/icons/link-email.svg", text: "Email Support" },
                  { icon: "/icons/link-slack.svg", text: "Dedicated Slack Channel" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-[4px]">
                    <Image src={item.icon} alt="" width={14} height={14} className="shrink-0" />
                    <span className="text-[16px] font-normal text-primary leading-[24px] font-poppins">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Integration Guides */}
            <div className="bg-white border border-[#e6e5e3] rounded-[16px] p-[25px] flex flex-col gap-[16px] shadow-[0px_4px_10px_0px_rgba(17,19,24,0.06)]">
              <h3 className="text-[20px] font-semibold text-[#111318] leading-[30px] font-poppins">
                Integration Guides
              </h3>
              <p className="text-[16px] font-normal text-[#5b5f66] leading-[24px] font-poppins">
                Step-by-step tutorials for common integration patterns.
              </p>
              <div className="flex flex-col gap-[12px]">
                {[
                  { icon: "/icons/link-quickstart.svg", text: "Quickstart Guide" },
                  { icon: "/icons/link-auth.svg", text: "Authentication Flow" },
                  { icon: "/icons/link-webhooks.svg", text: "Handling Webhooks" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-[4px]">
                    <Image src={item.icon} alt="" width={15} height={14} className="shrink-0" />
                    <span className="text-[16px] font-normal text-primary leading-[24px] font-poppins">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQs */}
            <div className="bg-white border border-[#e6e5e3] rounded-[16px] p-[25px] flex flex-col gap-[16px] shadow-[0px_4px_10px_0px_rgba(17,19,24,0.06)]">
              <h3 className="text-[20px] font-semibold text-[#111318] leading-[30px] font-poppins">
                FAQs
              </h3>
              {[
                "How long does integration take?",
                "Is sandbox access free?",
                "What are the pricing tiers?",
              ].map((q, i, arr) => (
                <div
                  key={q}
                  className={`flex items-center justify-between pb-[9px] ${i < arr.length - 1 ? "border-b border-[#e6e5e3]" : ""}`}
                >
                  <span className="text-[16px] font-semibold text-[#111318] leading-[24px] font-poppins">{q}</span>
                  <Image src="/icons/faq-chevron.svg" alt="" width={12} height={8} className="shrink-0" />
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* Ready to Build? */}
        <section className="px-[24px] py-[64px] max-w-[1200px] mx-auto w-full">
          <div className="bg-primary rounded-[16px] px-[48px] py-[64px] flex flex-col items-center gap-[32px] text-center">
            <h2 className="text-[40px] font-[700] text-white leading-[48px] normal font-poppins">
              Ready to Build?
            </h2>
            <p className="text-[16px] font-normal text-white/80 leading-[24px] max-w-[600px] font-poppins">
              Join leading financial institutions building the future of investment infrastructure on ARM Connect.
            </p>
            <div className="flex gap-[24px] items-center">
              <Link
                href={ROUTES.SIGNUP}
                className="bg-white text-primary font-semibold text-[16px] leading-[24px] px-[48px] py-[12px] rounded-[8px]"
              >
                Create Developer Account
              </Link>
              <Link
                href="#contact"
                className="border border-white text-white font-semibold text-[16px] leading-[24px] px-[48px] py-[12px] rounded-[8px]"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#111318] border-t border-[rgba(219,191,199,0.5)] pt-[81px] pb-[32px] px-[80px]">
        <div className="max-w-[1200px] mx-auto flex flex-col gap-[48px]">
          {/* Footer Grid */}
          <div className="grid grid-cols-6 gap-[24px]">
            {/* Brand Column - spans 2 */}
            <div className="col-span-2 flex flex-col gap-[16px]">
              <h3 className="text-[24px] font-bold text-white tracking-[-0.6px] leading-[32px] font-poppins">
                ARM CONNECT
              </h3>
              <p className="text-[16px] font-normal text-[#9ca3af] leading-[24px] font-poppins">
                Building the foundation for institutional investment infrastructure.
              </p>
              <p className="text-[16px] font-normal text-[#6b7280] leading-[24px] font-poppins">
                1 Mekunwen Road, Off Oyinkan Abayomi Drive, Ikoyi, Lagos.
              </p>
            </div>

            {/* Product */}
            <div className="flex flex-col gap-[16px]">
              <span className="text-[14px] font-bold text-white tracking-[0.28px] leading-[20px] font-poppins">Product</span>
              {["Mutual Funds", "Equities", "Fixed Income", "Pricing"].map((item) => (
                <span key={item} className="text-[16px] font-normal text-[#9ca3af] leading-[24px] font-poppins">{item}</span>
              ))}
            </div>

            {/* Developers */}
            <div className="flex flex-col gap-[16px]">
              <span className="text-[14px] font-bold text-white tracking-[0.28px] leading-[20px] font-poppins">Developers</span>
              {["Documentation", "API Reference", "Status", "GitHub"].map((item) => (
                <span key={item} className="text-[16px] font-normal text-[#9ca3af] leading-[24px] font-poppins">{item}</span>
              ))}
            </div>

            {/* Company */}
            <div className="flex flex-col gap-[16px]">
              <span className="text-[14px] font-bold text-white tracking-[0.28px] leading-[20px] font-poppins">Company</span>
              {["About Us", "Careers", "Blog", "Contact"].map((item) => (
                <span key={item} className="text-[16px] font-normal text-[#9ca3af] leading-[24px] font-poppins">{item}</span>
              ))}
            </div>

            {/* Trust & Security */}
            <div className="flex flex-col gap-[16px]">
              <span className="text-[14px] font-bold text-white tracking-[0.28px] leading-[20px] font-poppins">Trust & Security</span>
              <div className="flex flex-col gap-[8px]">
                {[
                  { icon: "/icons/trust-soc2.svg", text: "SOC 2 Certified" },
                  { icon: "/icons/trust-sec.svg", text: "SEC Compliant" },
                ].map((badge) => (
                  <div key={badge.text} className="bg-white/5 border border-white/10 rounded-[4px] px-[13px] py-[9px] flex items-center gap-[8px]">
                    <Image src={badge.icon} alt="" width={14} height={15} className="shrink-0" />
                    <span className="text-[12px] font-normal text-[#9ca3af] leading-[18px] font-poppins">{badge.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 pt-[33px] flex items-center justify-between">
            <p className="text-[16px] font-normal text-[#6b7280] leading-[24px] font-poppins">
              © 2024 EquitiesAPI Infrastructure. All rights reserved. Registered Financial Institution.
            </p>
            <div className="flex gap-[16px]">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((link) => (
                <span key={link} className="text-[16px] font-normal text-[#6b7280] leading-[24px] font-poppins">{link}</span>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
