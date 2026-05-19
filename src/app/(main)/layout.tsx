import { AuthGuard } from "@/guard/AuthGuard";
import { Navbar } from "@/components/main/Navbar";
import { Footer } from "@/components/main/Footer";
import { PageHeader } from "@/components/main/PageHeader";
import { DarkSection } from "@/components/main/DarkSection";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className="min-h-screen flex flex-col bg-[#f7f7f7]">
        <Navbar />

        {/* Dark Section Container */}
        <DarkSection>
          <PageHeader />
        </DarkSection>

        {/* Content Card */}
        <div className="-mt-[80px] mb-[40px] relative z-[1000] px-[40px] flex-1">
          <main>{children}</main>
        </div>

        <Footer />
      </div>
    </AuthGuard>
  );
}
