import Image from "next/image";

const CATEGORIES = [
  { label: "Earrings", href: "/collections/earrings", image: "https://i.pinimg.com/1200x/c8/93/51/c89351439a0a251b70a95c6f04087fd8.jpg" },
  { label: "Rings", href: "/collections/rings", image: "https://i.pinimg.com/736x/05/1d/d0/051dd0ab42f44a5da5abbc911bb515d9.jpg" },
  { label: "Neckpieces", href: "/collections/neckpieces", image: "https://i.pinimg.com/736x/15/e9/63/15e9635bff1e851fda828a708fbe48d4.jpg" },
  { label: "Bangles", href: "/collections/bangles", image: "https://i.pinimg.com/736x/4d/78/bb/4d78bb72586dcb807876292fc5c31d3e.jpg" },
];

export default function Category() {
  return (
    <div className="px-5 sm:px-8 lg:px-16 py-10">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
        {CATEGORIES.map((cat) => (
          <a key={cat.label} href={cat.href} className="group flex flex-col items-center">
            <div className="relative w-full h-[380px] overflow-hidden rounded-sm ">
              <Image
                src={cat.image}
                alt={cat.label}
                width={600}
                height={600}
                className="w-full h-[380px] object-cover rounded-3xl group-hover:scale-105 transition-transform duration-500"
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
