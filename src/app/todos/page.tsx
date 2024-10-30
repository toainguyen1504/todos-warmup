"use client";
import Link from "next/link";
import axios from "axios";
import React, { useEffect, useState } from "react";

import AppTable from "@/components/app.table";

function TodosPage() {
  const [todos, setTodos] = useState<ITodo[]>([]);
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
    <div className="px-5">
      <h1 className="my-5 font-bold">List Todos</h1>
      <button className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-700">
        <Link href={"/"}>Back Home</Link>
      </button>

      <button className="bg-gray-500 text-white font-bold py-2 px-4 mx-3 my-3 rounded hover:bg-gray-700">
        Add Todo
      </button>

      {/* UI table */}
      <AppTable currentItems={currentItems} />

      {/* UI pagination */}
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
    </div>
  );
}

export default TodosPage;
