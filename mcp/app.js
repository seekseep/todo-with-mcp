#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:4000";

// Helper function to make API requests
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

// Create MCP server
const server = new Server(
  {
    name: "todo-mcp-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "list_lists",
        description: "Get all todo lists",
        inputSchema: {
          type: "object",
          properties: {},
        },
      },
      {
        name: "get_list",
        description: "Get a specific list by ID with its tasks",
        inputSchema: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "The ID of the list",
            },
          },
          required: ["id"],
        },
      },
      {
        name: "create_list",
        description: "Create a new todo list",
        inputSchema: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "The name of the list",
            },
          },
          required: ["name"],
        },
      },
      {
        name: "update_list",
        description: "Update an existing list",
        inputSchema: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "The ID of the list",
            },
            name: {
              type: "string",
              description: "The new name of the list",
            },
          },
          required: ["id"],
        },
      },
      {
        name: "delete_list",
        description: "Delete a list",
        inputSchema: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "The ID of the list to delete",
            },
          },
          required: ["id"],
        },
      },
      {
        name: "list_tasks",
        description: "Get all tasks, optionally filtered by listId",
        inputSchema: {
          type: "object",
          properties: {
            listId: {
              type: "string",
              description: "Filter tasks by list ID",
            },
            sortBy: {
              type: "string",
              enum: ["dueDate", "createdAt"],
              description: "Sort tasks by field",
            },
          },
        },
      },
      {
        name: "get_task",
        description: "Get a specific task by ID",
        inputSchema: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "The ID of the task",
            },
          },
          required: ["id"],
        },
      },
      {
        name: "create_task",
        description: "Create a new task",
        inputSchema: {
          type: "object",
          properties: {
            content: {
              type: "string",
              description: "The content of the task",
            },
            listId: {
              type: "string",
              description: "The ID of the list this task belongs to",
            },
            dueDate: {
              type: "string",
              description: "Due date in ISO format (optional)",
            },
          },
          required: ["content", "listId"],
        },
      },
      {
        name: "update_task",
        description: "Update an existing task",
        inputSchema: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "The ID of the task",
            },
            content: {
              type: "string",
              description: "The new content of the task",
            },
            status: {
              type: "string",
              enum: ["pending", "in_progress", "completed"],
              description: "The status of the task",
            },
            dueDate: {
              type: "string",
              description: "Due date in ISO format",
            },
          },
          required: ["id"],
        },
      },
      {
        name: "delete_task",
        description: "Delete a task",
        inputSchema: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "The ID of the task to delete",
            },
          },
          required: ["id"],
        },
      },
      {
        name: "toggle_task",
        description: "Toggle task status between pending and completed",
        inputSchema: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "The ID of the task to toggle",
            },
          },
          required: ["id"],
        },
      },
    ],
  };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      // List operations
      case "list_lists": {
        const data = await apiRequest("/api/lists");
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(data, null, 2),
            },
          ],
        };
      }

      case "get_list": {
        const data = await apiRequest(`/api/lists/${args.id}`);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(data, null, 2),
            },
          ],
        };
      }

      case "create_list": {
        const data = await apiRequest("/api/lists", {
          method: "POST",
          body: JSON.stringify({
            name: args.name,
          }),
        });
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(data, null, 2),
            },
          ],
        };
      }

      case "update_list": {
        const updateData = {};
        if (args.name !== undefined) updateData.name = args.name;

        const data = await apiRequest(`/api/lists/${args.id}`, {
          method: "PUT",
          body: JSON.stringify(updateData),
        });
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(data, null, 2),
            },
          ],
        };
      }

      case "delete_list": {
        await apiRequest(`/api/lists/${args.id}`, {
          method: "DELETE",
        });
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({ success: true, id: args.id }, null, 2),
            },
          ],
        };
      }

      // Task operations
      case "list_tasks": {
        const params = new URLSearchParams();
        if (args.listId) params.append("listId", args.listId);
        if (args.sortBy) params.append("sortBy", args.sortBy);
        const query = params.toString() ? `?${params.toString()}` : "";
        const data = await apiRequest(`/api/tasks${query}`);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(data, null, 2),
            },
          ],
        };
      }

      case "get_task": {
        const data = await apiRequest(`/api/tasks/${args.id}`);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(data, null, 2),
            },
          ],
        };
      }

      case "create_task": {
        const taskData = {
          content: args.content,
          listId: args.listId,
        };
        if (args.dueDate) taskData.dueDate = args.dueDate;

        const data = await apiRequest("/api/tasks", {
          method: "POST",
          body: JSON.stringify(taskData),
        });
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(data, null, 2),
            },
          ],
        };
      }

      case "update_task": {
        const updateData = {};
        if (args.content !== undefined) updateData.content = args.content;
        if (args.status !== undefined) updateData.status = args.status;
        if (args.dueDate !== undefined) updateData.dueDate = args.dueDate;

        const data = await apiRequest(`/api/tasks/${args.id}`, {
          method: "PUT",
          body: JSON.stringify(updateData),
        });
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(data, null, 2),
            },
          ],
        };
      }

      case "delete_task": {
        await apiRequest(`/api/tasks/${args.id}`, {
          method: "DELETE",
        });
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({ success: true, id: args.id }, null, 2),
            },
          ],
        };
      }

      case "toggle_task": {
        const data = await apiRequest(`/api/tasks/${args.id}/toggle`, {
          method: "POST",
        });
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(data, null, 2),
            },
          ],
        };
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: `Error: ${error.message}`,
        },
      ],
      isError: true,
    };
  }
});

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Todo MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});
