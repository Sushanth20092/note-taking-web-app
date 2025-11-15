"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { api } from "../libs/axios";
import { useAuthStore } from "../store/authStore";
import { toast } from "react-hot-toast";

export const useLogin = () => {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  return useMutation({
    mutationFn: async (payload: { user_email: string; password: string }) => {
      const res = await api.post("/auth/signin", payload);
      return res.data;
    },

    onSuccess: (data, variables) => {
      login(data.access_token, variables.user_email);
      toast.success("Login successful!");
      router.push("/notes");
    },

    onError: (error: any) => {
      toast.error(error?.response?.data?.detail || "Login failed");
    },
  });
};
