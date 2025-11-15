"use client";

import { useMutation } from "@tanstack/react-query";
import { api } from "../libs/axios";

export const useSignup = () => {
  return useMutation({
    mutationFn: async (payload: {
      user_name: string;
      user_email: string;
      password: string;
    }) => {
      const res = await api.post("/auth/signup", payload);
      return res.data;
    },
  });
};
