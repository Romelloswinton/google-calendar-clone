import HeaderLeft from "./left-side";

export default function Header() {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-[1500px]">
        <div className="mx-3 flex items-center justify-between py-4">
          <HeaderLeft />
        </div>
      </div>
    </div>
  );
}
