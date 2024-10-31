"use client";
import Link from "next/link";
import axios from "axios";
import React, { useEffect, useState } from "react";

import AppTable from "@/components/app.table";
//icon libary
import { FaCaretSquareLeft, FaCaretSquareRight } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa6";
import { CiHome } from "react-icons/ci";

function TodosPage() {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  //init pagination
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

  //logic previous next
  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  // Logic for pagination buttons
  const renderPaginationButtons = () => {
    const buttons = [];
    const totalDisplay = 10; // Total buttons to display

    if (totalPages <= totalDisplay) {
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(
          <button
            key={i}
            onClick={() => setCurrentPage(i)}
            className={`w-12 px-2 py-2 rounded ${
              currentPage === i
                ? "bg-primary-color text-white"
                : " text-text-color hover:bg-hover-color"
            }`}
          >
            {i}
          </button>
        );
      }
    } else {
      // Create pagination based on the current page
      if (currentPage < 4) {
        // Show first pages
        for (let i = 1; i <= 6; i++) {
          buttons.push(
            <button
              key={i}
              onClick={() => setCurrentPage(i)}
              className={`w-12 px-2 py-2 rounded ${
                currentPage === i
                  ? "bg-primary-color text-white"
                  : " text-text-color hover:bg-hover-color"
              }`}
            >
              {i}
            </button>
          );
        }
        buttons.push(<span key="dot">...</span>);
        buttons.push(
          <button
            key={totalPages}
            onClick={() => setCurrentPage(totalPages)}
            className={`w-12 px-2 py-2 rounded ${
              currentPage === totalPages
                ? "bg-primary-color text-white"
                : " text-text-color hover:bg-hover-color"
            }`}
          >
            {totalPages}
          </button>
        );
      } else if (currentPage >= totalPages - 3) {
        // Show last pages
        buttons.push(
          <button
            key={1}
            onClick={() => setCurrentPage(1)}
            className={`w-12 px-2 py-2 rounded ${
              currentPage === 1
                ? "bg-primary-color text-white"
                : " text-text-color hover:bg-hover-color"
            }`}
          >
            {1}
          </button>
        );
        buttons.push(<span key="dot">...</span>);
        for (let i = totalPages - 5; i <= totalPages; i++) {
          buttons.push(
            <button
              key={i}
              onClick={() => setCurrentPage(i)}
              className={`w-12 px-2 py-2 rounded ${
                currentPage === i
                  ? "bg-primary-color text-white"
                  : " text-text-color hover:bg-hover-color"
              }`}
            >
              {i}
            </button>
          );
        }
      } else {
        // Show middle pages with dots
        buttons.push(
          <button
            key={1}
            onClick={() => setCurrentPage(1)}
            className={` w-12 px-2 py-2 rounded ${
              currentPage === 1
                ? "bg-primary-color text-white"
                : " text-text-color hover:bg-hover-color"
            }`}
          >
            {1}
          </button>
        );
        buttons.push(<span key="dot1">...</span>);

        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          if (i > 0 && i <= totalPages) {
            buttons.push(
              <button
                key={i}
                onClick={() => setCurrentPage(i)}
                className={`w-12 px-2 py-2 rounded ${
                  currentPage === i
                    ? "bg-primary-color text-white"
                    : " text-text-color hover:bg-hover-color"
                }`}
              >
                {i}
              </button>
            );
          }
        }

        buttons.push(<span key="dot2">...</span>);
        buttons.push(
          <button
            key={totalPages}
            onClick={() => setCurrentPage(totalPages)}
            className={`w-12 px-2 py-2 rounded ${
              currentPage === totalPages
                ? "bg-primary-color text-white"
                : " text-text-color hover:bg-hover-color"
            }`}
          >
            {totalPages}
          </button>
        );
      }
    }

    return buttons;
  };
  return (
    <div className="h-screen flex flex-col px-5 pt-10">
      <div className="flex justify-between items-center pb-3">
        <nav className="flex items-center">
          <span className="flex items-center text-lg font-bold py-2 pl-4 rounded text-primary-color hover:text-primary-light-color">
            <CiHome />
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
      <div className="flex items-center justify-center mt-4 mb-16">
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 text-secondary-color rounded hover:text-secondary-light-color disabled:opacity-50"
        >
          <FaCaretSquareLeft size={28} />
        </button>

        {renderPaginationButtons()}

        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-1 text-secondary-color rounded hover:text-secondary-light-color disabled:opacity-50"
        >
          <FaCaretSquareRight size={28} />
        </button>
      </div>
    </div>
  );
}

export default TodosPage;
