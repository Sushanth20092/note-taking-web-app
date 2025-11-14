"use client";

import { useMutation } from "@tanstack/react-query";
import { api } from "../libs/axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export function useSignup() {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async (data: {
      user_name: string;
      user_email: string;
      password: string;
    }) => {
      const res = await api.post("/auth/signup", data);
      return res.data;
    },

    onSuccess: () => {
      toast.success("Account created! Please login.");
      router.push("/signin");
    },

    onError: (err: any) => {
      toast.error(err.response?.data?.detail || "Signup failed");
    },
  });

  return {
    signup: mutation.mutate,
    isLoading: mutation.isPending,
  };
}
