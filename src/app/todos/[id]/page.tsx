"use client";
import Link from "next/link";
import axios from "axios";
import React, { useEffect, useState } from "react";
//icon
import { FaAngleRight } from "react-icons/fa6";
import { CiHome } from "react-icons/ci";

function ViewDetailTodos({ params }: { params: { id: string } }) {
  const [todo, setTodo] = useState<ITodo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const id = params.id;

  //Call API with Id
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(
        `https://jsonplaceholder.typicode.com/todos/${id}`
      );

      setTodo(res.data);
      console.log(res.data);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

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
  if (!todo) return;

  return (
    <div className="h-screen flex flex-col px-5 pt-10">
      {/* Nav */}
      <div className="flex justify-between items-center py-3">
        <nav className="flex items-center">
          <span className="flex items-center text-lg font-bold pl-4 rounded text-primary-color hover:text-primary-light-color">
            <CiHome className="mr-1" />
            <Link href={"/"} passHref>
              Home
            </Link>
            <FaAngleRight />
          </span>
          <span className="flex items-center text-base font-semibold ml-1 rounded text-primary-color hover:text-primary-light-color">
            <Link href={"/todos"} passHref>
              Todo&nbsp;List
            </Link>
            <FaAngleRight size={14} />
          </span>
          <span className="flex items-center text-sm  font-semibold ml-1 text-text-color">
            Todo
          </span>
        </nav>
      </div>

      {/* Card Detail*/}
      <div className="flex justify-center items-start h-screen">
        <div className="w-full rounded overflow-hidden shadow-lg bg-white px-5 py-10">
          <h1 className="text-xl font-bold border-b-2 border-gray-100 pb-2 mb-4">
            Todo Details
          </h1>
          <p className="text-gray-700 mb-2">
            <span className="font-semibold">Title:</span> {todo.title}
          </p>
          <p className="text-gray-700 mb-2">
            <span className="font-semibold">User ID:</span> {todo.userId}
          </p>
          <p className="font-semibold text-gray-700 mb-2">
            Status:
            <span
              className={`font-medium ${
                todo.completed ? "text-success-color" : "text-danger-color"
              }`}
            >
              {todo.completed ? " Completed" : " Incomplete"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ViewDetailTodos;
