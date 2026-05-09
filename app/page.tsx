import Category from "@/components/Category";
import GiftsBanner from "@/components/GiftsBanner";
import Hero from "@/components/Hero";
import ShopByGender from "@/components/ShopByGender";
import ShopSection from "@/components/ShopSection";
import TrustItemStrip from "@/components/TrustItemStrip";

export default function Home() {
  return (
    <>
      <Hero />
      <Category />
      <ShopByGender />
      <GiftsBanner />
      <ShopSection />
      <TrustItemStrip />
    </>
  );
}
