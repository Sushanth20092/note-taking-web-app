"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/src/libs/axios";
import { useAuthStore } from "../store/authStore";

export const useUpdateNote = () => {
  const queryClient = useQueryClient();
  const token = useAuthStore((state) => state.token);

  return useMutation({
    mutationFn: async ({
      note_id,
      note_title,
      note_content,
    }: {
      note_id: string;
      note_title: string;
      note_content: string;
    }) => {
      const res = await api.put(`/notes/${note_id}`, {
        note_title,
        note_content,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });
};
