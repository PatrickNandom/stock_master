import "../globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Image from "next/image";
import FeatureCard from "../components/FeaturedCard";
import Link from "next/link";
const Home = () => {
  return (
    <section>
      <Header />

      <main>
        <section className=" my-4 w-screen sm:px-6 sm:ml-4 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="w-full ml-4  lg:w-1/2">
              <h1 className="font-bold text-[20px] mx-2 mb-4 text-3xl sm:text-2xl lg:text-4xl leading-tight">
                Unleash The Power of Digital Inventory Management
              </h1>

              <p className="text-sm mx-2 text-justify sm:text-base lg:mt-16 text-gray-700 max-w-xl">
                Join our platform and unlock a world of amazing opportunities
                and endless possibilities. Embrace the future of innovation and
                collaboration as we revolutionize the way you connect, learn,
                and grow.
              </p>

              <div className="hidden sm:flex mt-6 flex-row items-center gap-6">
                <Link href="/register">
                  <button className="min-w-[130] h-[38] bg-coral cursor-pointer text-white rounded-lg px-6 text-sm font-medium hover:opacity-90 transition">
                    Sign Up
                  </button>
                </Link>
                <div className="flex items-center gap-3">
                  <Image
                    src="/home_contact-outline.svg"
                    alt="Active users"
                    width={40}
                    height={40}
                  />
                  <span className="text-sm leading-tight">
                    <strong>13K</strong> Active <br /> users
                  </span>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-1/2 flex justify-end">
              <Image
                src="/landing_page_top_right_icon.svg"
                alt="Dashboard illustration"
                width={725}
                height={495}
                className="w-full mr-0  hidden max-w-md lg:max-w-lg sm:block"
                priority
              />
            </div>
          </div>
        </section>

        <section className="mx-4 mb-8">
          <h1 className="text-center mb-8 text-xl font-bold text-[#782C18]">
            About Us
          </h1>
          <div className="px-2 sm:flex">
            <p className="text-justify">
              Welcome to Stock Master, your ultimate companion in inventory
              simplifying the process of keeping track of your Store&#39;s
              inventory, so you can focus on growing your business with
              confidence. 🚀💪 Our cutting-edge mobile app is designed to
              empower business owners, managers, and their dedicated teams with
              comprehensive and intuitive inventory management solutions. With
              Stock Master, say goodbye to the headaches of manual stock
              tracking or the limitations of outdated systems. 📲🔒 Effortless
              Inventory Tracking: From product counting to stock updates, our
              app streamlines every aspect of inventory management, allowing you
              to monitor stock levels with ease.
            </p>
          </div>
        </section>
        <section className="mx-4">
          <h1 className="text-center mb-8 text-xl font-bold text-[#782C18]">
            Our App Features
          </h1>

          <div>
            <FeatureCard
              title="Inventory Tracking"
              description="Inventory Tracking Made Effortles 
            With our advanced feature, Stock Master 
            automatically keeps a detailed record of
             your inventory, saving you time and 
             eliminating the need for manual tracking."
              imageSrc="/landingpage_sectio1_icon.svg"
              imageAlt="Inventory Tracking"
              bgColor="bg-[#fcded6]"
            />
          </div>
        </section>

        <section className="mx-4">
          <FeatureCard
            title="Hassle-Free Calculation"
            description="Hassle-Free Calculation: Let our intelligent system do the math for you! Our app automates 
            inventory calculations, such as unit costs, total values, and profit margins, saving you time and reducing errors."
            imageSrc="/landingpage_section2_icon.svg"
            imageAlt="Inventory Tracking"
            bgColor="bg-[#cdd0da]"
            reverse
          />
        </section>

        <section className="mx-4">
          <FeatureCard
            title="Data-Driven Decision Making"
            description=" Our powerful analysis feature provides accurate insights based on your data.
            💡🔍 Whether it's sales trends, customer behavior, or performance indicators, our system 
            delivers valuable information to help you make informed decisions and drive your business forward"
            imageSrc="/landingpage_section4_icon.svg"
            imageAlt="Real-Time Updates"
            bgColor="bg-[#fcded6]"
          />
        </section>

        <section className="flex flex-col  md:flex-row items-center justify-around max-w-7xl mx-auto p-6 sm:p-8 md:p-10 lg:p-12 rounded-2xl mb-8 gap-8 md:gap-12 lg:gap-16">
          <div className="shrink-0 w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 relative">
            <Image
              src="/landingpage_section5_icon.svg"
              alt="Data-Driven Decision Making"
              fill
              className="object-contain"
              priority
            />
          </div>

          <div>
            <p className="text-justify">
              Join us today to enjoy the freedom 🕊️ of digital inventory 📱✨
              and unlock a world of convenience, efficiency, and limitless
              possibilities!
            </p>

            <div className="hidden sm:flex  mt-6  items-center gap-6">
              <Link href="/register">
                <button className="min-w-[130] cursor-pointer h-[38] bg-linear-to-r from-coral to-slate text-white rounded-lg px-6 text-sm font-medium hover:opacity-90 transition">
                  Sign Up
                </button>
              </Link>

              <div className="flex items-center gap-3">
                <Image
                  src="/home_contact-outline.svg"
                  alt="Active users"
                  className="hidden sm:block"
                  width={40}
                  height={40}
                />
                <span className="text-sm leading-tight">
                  <strong>13K</strong> Active <br /> users
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </section>
  );
};

export default Home;
