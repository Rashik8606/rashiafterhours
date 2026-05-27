import BackgroundCanvas from "./BackgroundCanvas";
import CursorGlow from "./CursorGlow";
import ActiveNavObserver from "./ActiveNavObserver";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100 relative min-h-screen overflow-x-hidden">
      <CursorGlow />
      <BackgroundCanvas />
      <SiteHeader />
      <ActiveNavObserver />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}
