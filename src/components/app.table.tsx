// "use client";
import Link from "next/link";

interface IProps {
  currentItems: ITodo[];
}

function AppTable(props: IProps) {
  const { currentItems } = props;

  return (
    <>
      {/* UI table */}
      <table className=" table-auto w-full text-center text-gray-900 border-collapse border border-slate-400">
        <thead>
          <tr className="font-semibold">
            <th className="w-14 px-4 py-2 border border-slate-300">ID</th>
            <th className="min-w-[200px] px-4 py-2 border border-slate-300">
              Title
            </th>
            <th className="px-4 py-2 border border-slate-300">Status</th>
            <th className="w-64 px-4 py-2 border border-slate-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => {
            return (
              <tr key={item.id}>
                <td className="w-16 px-4 py-2 border border-slate-300 font-semibold">
                  {item.id}
                </td>
                <td className="min-w-[200px] px-4 py-2 border border-slate-300">
                  {item.title.length > 15
                    ? item.title.slice(0, 15) + "..."
                    : item.title}
                </td>
                <td
                  className={`px-4 py-2 border border-slate-300 font-medium ${
                    item.completed ? "text-success-color" : "text-danger-color"
                  }`}
                >
                  {item.completed ? "Completed" : "Incomplete"}
                </td>
                <td className="w-72 px-4 py-2 border border-slate-300">
                  <button className="bg-secondary-color text-white font-bold py-2 px-3 m-2 rounded hover:bg-secondary-light-color">
                    <Link href={`/todos/${item.id}`}>View</Link>
                  </button>
                  <button className="bg-warm-color text-white font-bold py-2 px-3 m-2 rounded hover:bg-warm-light-color">
                    <Link href={`/todos/${item.id}`}>Edit</Link>
                  </button>
                  <button className="bg-danger-color text-white font-bold py-2 px-3 m-2 rounded hover:bg-danger-light-color">
                    <Link href={`/todos/${item.id}`}>Delete</Link>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default AppTable;
