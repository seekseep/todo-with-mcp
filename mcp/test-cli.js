#!/usr/bin/env node

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:4000";

async function apiRequest(path, options = {}) {
  const url = `${API_BASE_URL}${path}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

async function main() {
  const [, , command, ...args] = process.argv;

  try {
    switch (command) {
      case "list":
        const todos = await apiRequest("/todos");
        console.log(JSON.stringify(todos, null, 2));
        break;

      case "get":
        const id = args[0];
        if (!id) throw new Error("ID is required");
        const todo = await apiRequest(`/todos/${id}`);
        console.log(JSON.stringify(todo, null, 2));
        break;

      case "create":
        const title = args[0];
        if (!title) throw new Error("Title is required");
        const description = args[1] || "";
        const newTodo = await apiRequest("/todos", {
          method: "POST",
          body: JSON.stringify({ title, description }),
        });
        console.log(JSON.stringify(newTodo, null, 2));
        break;

      case "update":
        const updateId = args[0];
        if (!updateId) throw new Error("ID is required");
        const updateData = {};
        if (args[1]) updateData.title = args[1];
        if (args[2]) updateData.description = args[2];
        if (args[3]) updateData.completed = args[3] === "true";
        const updated = await apiRequest(`/todos/${updateId}`, {
          method: "PATCH",
          body: JSON.stringify(updateData),
        });
        console.log(JSON.stringify(updated, null, 2));
        break;

      case "delete":
        const deleteId = args[0];
        if (!deleteId) throw new Error("ID is required");
        await apiRequest(`/todos/${deleteId}`, {
          method: "DELETE",
        });
        console.log(JSON.stringify({ success: true, id: deleteId }, null, 2));
        break;

      default:
        console.log(`Usage:
  node test-cli.js list
  node test-cli.js get <id>
  node test-cli.js create <title> [description]
  node test-cli.js update <id> [title] [description] [completed]
  node test-cli.js delete <id>
`);
        process.exit(1);
    }
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
}

main();
