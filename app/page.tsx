import Banner from "@/components/Banner";
import FeaturedProducts from "@/components/Featires";
import GiftsBanner from "@/components/GiftsBanner";
import MakersCollective from "@/components/MakersCollective";
import RingCustomizer from "@/components/RingCustomizer";
import ShopByCategory from "@/components/ShopByCategory";
import Timeline from "@/components/Timeline";

export default function Home() {
  return (
    <>
      <Banner />
      <GiftsBanner />
      <ShopByCategory />
      <RingCustomizer />
      <MakersCollective />
      <Timeline />
      <FeaturedProducts />
    </>
  );
}
