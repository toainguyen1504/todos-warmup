"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Link from "next/link";

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  //init pagination
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  //API
  const fetchData = async () => {
    setLoading(true);
    try {
      // Check if todos exists in localStorage
      const cachedData = localStorage.getItem("todos");
      if (cachedData) {
        setTodos(JSON.parse(cachedData));
      } else {
        const res = await axios.get(
          "https://jsonplaceholder.typicode.com/todos"
        );
        setTodos(res.data);
        localStorage.setItem("todos", JSON.stringify(res.data)); // Save data -> localStorage
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    //call API when Component mount
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error}</div>;

  // set pagination
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
        <button className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-700">
          <Link href={"/details"}>Details Demo</Link>
        </button>

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
