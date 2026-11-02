import Loading from ".";
import Logo from "../Logo";

export default function Fallback() {
  return (
    <div className="w-full h-screen flex items-center justify-center gap-12 flex-col">
      <Logo className="w-80 max-[70vw]" />
      <Loading className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl" />
    </div>
  );
}
