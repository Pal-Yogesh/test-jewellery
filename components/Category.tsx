import Image from "next/image";

const CATEGORIES = [
  { label: "Earrings", href: "/collections/earrings", image: "https://shopnimai.in/cdn/shop/files/Frame_21.png?v=1765890566&width=900" },
  { label: "Rings", href: "/collections/rings", image: "https://shopnimai.in/cdn/shop/files/Frame_22.png?v=1765890565&width=900" },
  { label: "Neckpieces", href: "/collections/neckpieces", image: "https://shopnimai.in/cdn/shop/files/Frame_20.png?v=1765890268&width=900" },
  { label: "Bangles", href: "/collections/bangles", image: "https://shopnimai.in/cdn/shop/files/Frame_23.png?v=1765890559&width=900" },
];

export default function Category() {
  return (
    <div className="px-5 sm:px-8 lg:px-16 py-10">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
        {CATEGORIES.map((cat) => (
          <a key={cat.label} href={cat.href} className="group flex flex-col items-center">
            <div className="relative w-full overflow-hidden rounded-sm bg-[#f5f3f0]">
              <Image
                src={cat.image}
                alt={cat.label}
                width={600}
                height={600}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <p
              className="mt-3 text-center text-sm tracking-[0.15em] uppercase text-gray-800 group-hover:text-[#C8102E] transition-colors duration-200 font-medium"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {cat.label}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}
