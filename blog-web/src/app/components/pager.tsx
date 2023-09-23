export default function Pager() {
  const page = [1, 2, 3];
  return (
    <div className="h-8.5 w-4/5 flex justify-end items-center text-gray-600">
      <button className="px-3 py-1.5 bg-slate-50 rounded-md mr-2 shadow-lg hover:text-gray-800 transition-transform active:bg-slate-200">
        上一页
      </button>
      {page.map((item, i) => {
        return (
          <span
            key={i}
            className="px-3 py-1.5 bg-white/95 rounded-md mr-2 shadow-lg hover:text-gray-600 transition-transform active:bg-slate-200 cursor-pointer"
          >
            {item}
          </span>
        );
      })}
      <span className="px-3 py-1.5 bg-slate-50 rounded-md mr-2 shadow-lg">
        ...
      </span>
      <button className="px-3 py-1.5 bg-slate-50 rounded-md shadow-lg hover:text-gray-600 transition-transform active:bg-slate-200">
        下一页
      </button>
    </div>
  );
}
