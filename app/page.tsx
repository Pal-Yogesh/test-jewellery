import Category from "@/components/Category";
import GiftsBanner from "@/components/GiftsBanner";
import Hero from "@/components/Hero";
import MovingStrip from "@/components/MovingStrip";
import ShopSection from "@/components/ShopSection";
import TrustItemStrip from "@/components/TrustItemStrip";

export default function Home() {
  return (
    <>
      <Hero />
      <MovingStrip />
      <Category />
      <GiftsBanner />
      <ShopSection />
      <TrustItemStrip />
    </>
  );
}
