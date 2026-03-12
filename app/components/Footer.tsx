import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="flex flex-col p-4 sm:flex-row flex-wrap justify-around items-center w-screen min-h-[272] bg-linear-to-r from-[#F7AB97] to-[#071548] gap-6 text-white">
      <Image src="/footer_app_logo.svg" alt="App logo" width={70} height={50} />

      <div className="max-w-xs text-center sm:text-left">
        <p className="text-justify">
          Welcome to Stock Master, your ultimate companion in inventory <br />
          management! 💼✨ At Stock Master, we are passionate about <br />
          simplifying the process of keeping track of your store&apos;s
          inventory <br />
        </p>
      </div>

      <div className="flex flex-col items-center sm:items-start space-y-1 text-sm">
        <div className="flex flex-row items-center gap-2">
          <Image
            src="/footer_phone_icon.svg"
            alt="phone icon"
            width={15}
            height={15}
          />
          <span>+2349031672429</span>
        </div>

        <div className="flex flex-row items-center gap-2">
          <Image
            src="/footer_message_icon.svg"
            alt="email icon"
            width={15}
            height={15}
          />
          <span>stockmasterstown@gmail.com</span>
        </div>
      </div>

      <div className="flex flex-col items-center sm:items-start space-y-2 text-sm">
        <span>
          Follow us on <br /> Social Media
        </span>

        <nav className="flex flex-row justify-center sm:justify-start gap-4 mt-2">
          <Link href="https://www.facebook.com/patrick.nandom.31">
            <Image
              src="/footer_facebook_icon.svg"
              alt="facebook logo"
              width={15}
              height={15}
            />
          </Link>

          <Link href="https://x.com/NandomPatruck">
            <Image
              src="/footer_twitter_icon.svg"
              alt="twitter logo"
              width={15}
              height={15}
            />
          </Link>

          <Link href="https://www.linkedin.com/in/patrick-nandom-604ba0297/">
            <Image
              src="/footer_linkedin_icon.svg"
              alt="linkedin logo"
              width={15}
              height={15}
            />
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
