import FooterSection from "@/components/sections/footer";
import NavigationSection from "@/components/sections/navigation";

const LandingRootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <NavigationSection />
      {children}
      <FooterSection />
    </div>
  );
};

export default LandingRootLayout;
