"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "../libs/axios";
import { useAuthStore } from "../store/authStore";

export const useFetchNotes = () => {
  const token = useAuthStore((state) => state.token);
  const hydrated = useAuthStore((state) => state.hydrated);

  return useQuery({
    queryKey: ["notes", token],
    queryFn: async () => {
      const res = await api.get("/notes/");
      return res.data;
    },
    enabled: !!token && hydrated,
  });
};
