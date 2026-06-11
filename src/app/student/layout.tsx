import StudentNavbar from "@/components/StudentNavbar";
import Particles from "@/components/Particles";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen relative overflow-x-hidden content-wrapper">
      <Particles />
      <StudentNavbar />
      
      {/* Page Content */}
      <div className="relative z-10 w-full min-h-[calc(100vh-140px)]">
        {children}
      </div>
    </div>
  );
}
