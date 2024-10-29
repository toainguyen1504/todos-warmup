"use client";
import Link from "next/link";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

function ViewDetailTodos({ params }: { params: { id: string } }) {
  const [todo, setTodo] = useState<Todo | null>(null);
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
    } catch (err) {
      setError("Error fetching todo data");
      console.error("Error fetching todo:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!todo) return <div>No data available</div>;

  return (
    <div>
      <div>
        <h1>View Detail Todos: {params.id}</h1>
        <p>ID: {id}</p>
        <p>Title: {todo.title}</p>
        <p>Status: {todo.completed ? "Completed" : "Incomplete"}</p>
      </div>
      <button className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-700">
        <Link href={"/"}>Back Home</Link>
      </button>
      <button className="bg-gray-500 text-white font-bold py-2 px-4 rounded hover:bg-gray-700">
        <Link href={"/todos"}>Back Todos</Link>
      </button>
    </div>
  );
}

export default ViewDetailTodos;
