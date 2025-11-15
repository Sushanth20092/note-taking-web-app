"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/src/libs/axios";
import { useAuthStore } from "../store/authStore";

interface CreateNotePayload {
  note_title: string;
  note_content: string;
}

export const useCreateNote = () => {
  const qc = useQueryClient();
  const token = useAuthStore((state) => state.token);

  return useMutation({
    mutationFn: async (payload: CreateNotePayload) => {
      const res = await api.post("/notes/", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["notes"] });
    }
  });
};
