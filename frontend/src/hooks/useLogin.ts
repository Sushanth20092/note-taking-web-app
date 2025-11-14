"use client";

import { useMutation } from "@tanstack/react-query";
import { api } from "../libs/axios";

export const useLogin = () => {
  return useMutation({
    mutationFn: async (payload: { user_email: string; password: string }) => {
      const res = await api.post("/auth/signin", payload);
      return res.data;
    },
  });
};
