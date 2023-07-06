
const SkeletionTable = ({ count }: any) => {
  const items = Array.from({ length: count });
  return (
    <div className="w-full bg-white dark:bg-slate-700 shadow-base p-6 rounded-md">
      <table className="animate-pulse w-full border-separate border-spacing-4 table-fixed">
        <thead>
          <tr>
            <th scope="col">
              <div className="h-6 bg-[#C4C4C4] dark:bg-slate-500"></div>
            </th>
            {/* <th scope="col">
              <div className="h-6 bg-[#C4C4C4] dark:bg-slate-500"></div>
            </th>
            <th scope="col">
              <div className="h-6 bg-[#C4C4C4] dark:bg-slate-500"></div>
            </th>
            <th scope="col">
              <div className="h-6 bg-[#C4C4C4] dark:bg-slate-500"></div>
            </th> */}
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {items.map((item, i) => (
            <tr key={i} className="my-2">
              <td>
                <div className="h-3 bg-[#C4C4C4] dark:bg-slate-500"></div>
              </td>
              {/* <td>
                <div className="h-3 bg-[#C4C4C4] dark:bg-slate-500"></div>
              </td>
              <td>
                <div className="h-3 bg-[#C4C4C4] dark:bg-slate-500"></div>
              </td>
              <td>
                <div className="h-3 bg-[#C4C4C4] dark:bg-slate-500"></div>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SkeletionTable;
