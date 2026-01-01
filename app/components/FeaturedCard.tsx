import Image from "next/image";

interface FeatureCardProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  bgColor: string;
  reverse?: boolean;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  imageSrc,
  imageAlt,
  bgColor,
  reverse = false,
}) => {
  return (
    <div
      className={`
        flex flex-col p-4  md:flex-row items-center 
        w-full 
         sm:p-8 md:p-10 lg:p-12 
        rounded-2xl mb-8 gap-8 md:gap-12 lg:gap-16
        transition-all duration-300
        ${bgColor} 
        ${reverse ? "md:flex-row-reverse" : "md:flex-row"}
      `}
    >
      <div className=" hidden shrink-0 w-32 h-32 sm:block sm:w-40 sm:h-40 lg:w-48 lg:h-48 relative">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-contain"
          priority
        />
      </div>

      <div
        className={`
        text-center 
        ${reverse ? "md:text-right" : "md:text-left"}
      `}
      >
        <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#E67E5D] mb-4">
          {title}
        </h3>
        <p className="text-[#2D3436] text-justify  text-sm sm:text-base lg:text-lg leading-relaxed font-medium">
          {description}
        </p>
      </div>
    </div>
  );
};

export default FeatureCard;
