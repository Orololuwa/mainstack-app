export default function DummyChart() {
  return (
    <div className="mb-12 w-full">
      <svg
        width="full"
        height="178"
        viewBox="0 0 767 178"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 177L166.916 21.336C211.748 -20.7264 285.462 6.79004 292.871 67.8171V67.8171C293.287 71.2484 293.981 74.6685 294.939 77.9895V77.9895C308.165 123.839 364.75 140.125 400.326 108.322L480.44 36.7048C538.095 -14.8352 627.475 -6.14781 674.126 55.5303L766 177"
          stroke="#FF5403"
          stroke-linecap="round"
        />
      </svg>

      <div className="relative h-[2px]">
        <div className="w-[5px] h-[5px] bg-gray-200 rounded-full absolute top-1/2 -translate-y-1/2! left-0" />
        <div className="w-full h-full bg-gray-200"></div>
        <div className="w-[5px] h-[5px] bg-gray-200 rounded-full absolute top-1/2 -translate-y-1/2! right-0" />
      </div>

      <div className="flex justify-between text-gray-500 text-sm mt-2">
        <div>Apr 1, 2022</div>
        <div>Apr 30, 2022</div>
      </div>
    </div>
  );
}
