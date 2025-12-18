import Link from "next/link";

function Footer() {
  return (
    <div className="flex flex-col text-gray-700 h-screen justify-center">
      <Link className="hover:underline" href="/login">
        Login
      </Link>
      <Link className="hover:underline" href="/register">
        Register
      </Link>
    </div>
  );
}

export default Footer;
