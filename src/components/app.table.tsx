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
      <table className="table-auto text-gray-900 border-collapse border border-slate-400">
        <thead>
          <tr>
            <th className="px-4 py-2 border border-slate-300">ID</th>
            <th className="px-4 py-2 border border-slate-300">Title</th>
            <th className="px-4 py-2 border border-slate-300">Status</th>
            <th className="px-4 py-2 border border-slate-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => {
            return (
              <tr key={item.id}>
                <td className="px-4 py-2 border border-slate-300 font-medium">
                  {item.id}
                </td>
                <td className="px-4 py-2 border border-slate-300">
                  {item.title}
                </td>
                <td className="px-4 py-2 border border-slate-300 font-medium">
                  {item.completed ? "Completed" : "Incomplete"}
                </td>
                <td className="px-4 py-2 border border-slate-300">
                  <button className="bg-blue-500 text-white font-bold py-2 px-4 mx-3 my-3 rounded hover:bg-blue-700">
                    <Link href={`/todos/${item.id}`}>View</Link>
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
