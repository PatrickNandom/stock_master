import Image from "next/image";
// Define the shape of a single product based on your data
interface Product {
  id: string;
  image: string;
  name: string;
  code: string;
  price: number;
  stock: number;
  onClick?: () => void;
}

const ProductRow = ({ product }: { product: Product }) => {
  return (
    <div className="flex items-center justify-between bg-[#D9DEE6] rounded-xl p-3 mb-3 shadow-sm">
      <div className="w-12 h-12 hidden  bg-[#000000] rounded-lg sm:flex items-center justify-center overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          className="w-10 h-10 object-contain"
          width={10}
          height={10}
        />
      </div>

      <p className="text-[#1A2B56] font-bold text-sm leading-tight max-w-[100]">
        {product.name}
      </p>

      <p className="text-[#1A2B56] font-medium text-sm">{product.code}</p>

      <p className="text-[#1A2B56] font-bold text-sm">
        ₦{product.price.toLocaleString()}
      </p>

      <p className="text-[#1A2B56] font-medium text-sm">{product.stock}</p>

      <button className="w-6 h-6 bg-[#7A2B14] rounded-full flex items-center justify-center hover:cursor-pointer transition-opacity">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4"
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
    </div>
  );
};

export default ProductRow;
