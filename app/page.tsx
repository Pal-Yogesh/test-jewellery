import GiftsBanner from "@/components/GiftsBanner";
import Hero from "@/components/Hero";
import OurDesigners from "@/components/OurDesigners";
import ShopSection from "@/components/ShopSection";
import SponsoredProduct from "@/components/SponsoredProduct";
import TrustItemStrip from "@/components/TrustItemStrip";

export default function Home() {
  return (
    <>
      <Hero />
      <GiftsBanner />
      <ShopSection />
      <SponsoredProduct />
      <OurDesigners />
      <TrustItemStrip />
    </>
  );
}
