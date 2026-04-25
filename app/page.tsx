import Category from "@/components/Category";
import GiftsBanner from "@/components/GiftsBanner";
import Hero from "@/components/Hero";
import OurDesigners from "@/components/OurDesigners";
import ShopSection from "@/components/ShopSection";
import TrustItemStrip from "@/components/TrustItemStrip";

export default function Home() {
  return (
    <>
      <Hero />
      <Category />
      <GiftsBanner />
      <ShopSection />
      {/* <OurDesigners /> */}
      <TrustItemStrip />
    </>
  );
}
