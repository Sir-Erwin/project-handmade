"use client";

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import "./../app/app.css";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";

import Gallery from "./gallery";
import Pottery from "./pottery";

Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function App() {
  //const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  function handleCategoryChange(category: string) {
    setSelectedCategory(category);
  }
/*
  function listTodos() {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }

  useEffect(() => {
    listTodos();
  }, []);

  function createTodo() {
    client.models.Todo.create({
      content: window.prompt("Todo content"),
    });
  }*/

  return (
    <main>
      <h1>Choose a Category</h1>
      <div className="button-container">
        <button onClick={() => handleCategoryChange("Gallery")}>Gallery</button>
        <button onClick={() => handleCategoryChange("Pottery")}>Pottery</button>
        <button onClick={() => handleCategoryChange("Clothes")}>Clothes</button>
      </div>
      
      <style jsx>{`
        .button-container {
          display: flex;
          justify-content: space-around; /* Space out the buttons */
          margin: 20px 0; /* Optional: Add some margin for spacing */
        }
      `}</style>
      
      {selectedCategory === "Gallery" && <Gallery />}
      {selectedCategory === "Pottery" && <Pottery />}
      {selectedCategory === "Clothes" && <Gallery />}
      
    </main>
  );
}