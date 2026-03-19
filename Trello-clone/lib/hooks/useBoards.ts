"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

import {
  boardDataService,
  boardService,
  columnService,
  taskService,
} from "../services";

import { Board, ColumnWithTasks, Task } from "../supabase/models";
import { useSupabase } from "../supabase/SupabaseProvider";

/* =========================
   BOARDS LIST HOOK
========================= */

export function useBoards() {
  const { user } = useUser();
  const { supabase } = useSupabase();

  const [boards, setBoards] = useState<Board[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user && supabase) {
      loadBoards();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, supabase]);

  async function loadBoards() {
    if (!user || !supabase) return;

    try {
      setLoading(true);
      setError(null);

      const data = await boardService.getBoards(supabase, user.id);
      setBoards(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load boards.");
    } finally {
      setLoading(false);
    }
  }

  async function createBoard(boardData: {
    title: string;
    description?: string;
    color?: string;
  }) {
    if (!user || !supabase) {
      throw new Error("User not authenticated");
    }

    try {
      const newBoard =
        await boardDataService.createBoardWithDefaultColumns(supabase, {
          ...boardData,
          userId: user.id,
        });

      setBoards((prev) => [newBoard, ...prev]);
      return newBoard;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create board.");
      throw err;
    }
  }

  return {
    boards,
    loading,
    error,
    createBoard,
    reload: loadBoards,
  };
}

/* =========================
   SINGLE BOARD HOOK
========================= */

export function useBoard(boardId: string) {
  const { supabase } = useSupabase();
  const { user } = useUser();

  const [board, setBoard] = useState<Board | null>(null);
  const [columns, setColumns] = useState<ColumnWithTasks[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (boardId && supabase) {
      loadBoard();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boardId, supabase]);

  async function loadBoard() {
    if (!boardId || !supabase) return;

    try {
      setLoading(true);
      setError(null);

      const data = await boardDataService.getBoardWithColumns(
        supabase,
        boardId
      );

      setBoard(data.board);
      setColumns(data.columnsWithTasks);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load board.");
    } finally {
      setLoading(false);
    }
  }

  async function updateBoard(
    boardId: string,
    updates: Partial<Board>
  ) {
    if (!supabase) return;

    try {
      const updatedBoard = await boardService.updateBoard(
        supabase,
        boardId,
        updates
      );
      setBoard(updatedBoard);
      return updatedBoard;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to update board."
      );
      throw err;
    }
  }

  async function createRealTask(
    columnId: string,
    taskData: {
      title: string;
      description?: string;
      assignee?: string;
      dueDate?: string;
      priority?: "low" | "medium" | "high";
    }
  ) {
    if (!supabase) return;

    try {
      const sortOrder =
        columns.find((col) => col.id === columnId)?.tasks.length ?? 0;

      const newTask = await taskService.createTask(supabase, {
        title: taskData.title,
        description: taskData.description || null,
        assignee: taskData.assignee || null,
        due_date: taskData.dueDate || null,
        column_id: columnId,
        sort_order: sortOrder,
        priority: taskData.priority || "medium",
      });

      setColumns((prev) =>
        prev.map((col) =>
          col.id === columnId
            ? { ...col, tasks: [...col.tasks, newTask] }
            : col
        )
      );

      return newTask;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to create task."
      );
      throw err;
    }
  }

  async function moveTask(
    taskId: string,
    newColumnId: string,
    newOrder: number
  ) {
    if (!supabase) return;

    try {
      await taskService.moveTask(
        supabase,
        taskId,
        newColumnId,
        newOrder
      );

      setColumns((prev) => {
        const updatedColumns = [...prev];
        let movedTask: Task | null = null;

        for (const col of updatedColumns) {
          const index = col.tasks.findIndex((t) => t.id === taskId);
          if (index !== -1) {
            movedTask = col.tasks[index];
            col.tasks.splice(index, 1);
            break;
          }
        }

        if (movedTask) {
          const targetColumn = updatedColumns.find(
            (col) => col.id === newColumnId
          );
          if (targetColumn) {
            targetColumn.tasks.splice(newOrder, 0, movedTask);
          }
        }

        return updatedColumns;
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to move task.");
      throw err;
    }
  }

  async function createColumn(title: string) {
    if (!board || !user || !supabase) {
      throw new Error("Board not loaded");
    }

    try {
      const newColumn = await columnService.createColumn(supabase, {
        title,
        board_id: board.id,
        sort_order: columns.length,
        user_id: user.id,
      });

      setColumns((prev) => [...prev, { ...newColumn, tasks: [] }]);
      return newColumn;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to create column."
      );
      throw err;
    }
  }

  async function updateColumn(columnId: string, title: string) {
    if (!supabase) return;

    try {
      const updatedColumn =
        await columnService.updateColumnTitle(
          supabase,
          columnId,
          title
        );

      setColumns((prev) =>
        prev.map((col) =>
          col.id === columnId ? { ...col, ...updatedColumn } : col
        )
      );

      return updatedColumn;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to update column."
      );
      throw err;
    }
  }

  return {
    board,
    columns,
    loading,
    error,
    updateBoard,
    createRealTask,
    moveTask,
    createColumn,
    updateColumn,
    setColumns,
    reload: loadBoard,
  };
}
