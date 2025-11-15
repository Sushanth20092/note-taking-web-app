"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/src/libs/axios";
import { useAuthStore } from "../store/authStore";

export const useDeleteNote = () => {
  const queryClient = useQueryClient();
  const token = useAuthStore((state) => state.token);

  return useMutation({
    mutationFn: async (note_id: string) => {
      await api.delete(`/notes/${note_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });
};
