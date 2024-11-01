"use client";
import Link from "next/link";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AppTable from "@/components/layout/Table";
//icon
import { FaAngleRight } from "react-icons/fa6";
import { CiHome } from "react-icons/ci";
import Pagination from "@/components/layout/Pagination";

function TodosPage() {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  //6 Items / 1 page
  const itemsPerPage = 6;
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
        toast.success("Data fetched successfully!");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    //call API when Component mount
    fetchData();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary-color border-opacity-50"></div>
      </div>
    );
  if (error)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-center font-semibold text-lg">
          Something went wrong. Please contact your administrator for
          assistance:
          <span className="text-danger-color font-medium mx-3">{error}</span>
        </p>
      </div>
    );

  // set pagination
  const totalPages = Math.ceil(todos.length / itemsPerPage);

  const currentItems = todos.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="h-screen flex flex-col px-5 pt-10">
      <ToastContainer />
      <div className="flex justify-between items-center pb-3">
        <nav className="flex items-center">
          <span className="flex items-center text-lg font-bold py-2 pl-4 rounded text-primary-color hover:text-primary-light-color">
            <CiHome className="mr-1" />
            <Link href={"/"} passHref>
              Home
            </Link>
            <FaAngleRight />
          </span>
          <span className="flex items-center text-base font-semibold py-2 ml-1 rounded text-text-color">
            Todo&nbsp;List
          </span>
        </nav>
        <div className="action">
          <button className="bg-primary-color text-sm text-white font-bold py-2 px-4 my-2 rounded hover:bg-primary-light-color">
            Add Todo
          </button>
        </div>
      </div>

      {/* UI table */}
      <div className="flex-grow">
        <AppTable currentItems={currentItems} />
      </div>

      {/* UI pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default TodosPage;
