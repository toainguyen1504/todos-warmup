"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then((res) => {
        setTodos(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const totalPages = Math.ceil(todos.length / itemsPerPage);

  const currentItems = todos.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1>List Todos</h1>
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
              console.log(item);
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
                  <td className="px-4 py-2 border border-slate-300">View</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="flex justify-center items-center space-x-2">
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="font-semibold">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </main>
    </div>
  );
}
