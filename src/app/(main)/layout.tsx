import { AuthGuard } from "@/guard/AuthGuard";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className="min-h-screen flex flex-col bg-[#f7f7f7]">
{children}
      </div>
    </AuthGuard>
  );
}
