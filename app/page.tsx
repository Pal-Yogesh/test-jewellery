import Banner from "@/components/Banner";
import FeaturedProducts from "@/components/Featires";
import GiftsBanner from "@/components/GiftsBanner";
import ShopByCategory from "@/components/ShopByCategory";
import SponsoredProduct from "@/components/SponsoredProduct";
import TextDrop from "@/components/TextDrop";

export default function Home() {
  return (
    <>
      <Banner />
      <GiftsBanner />
      <ShopByCategory />
      <SponsoredProduct />
      <TextDrop />
      <FeaturedProducts />
    </>
  );
}
