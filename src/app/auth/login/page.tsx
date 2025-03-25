"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  TextInput,
  PasswordInput,
  Paper,
  Title,
  Text,
  LoadingOverlay,
} from "@mantine/core";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { useAuthStore } from "@/store/authstore";
import { toast } from "react-toastify";

const AuthForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { login, isAuthenticated } = useAuthStore();

  const { register, handleSubmit } = useForm<FieldValues>();

  const isLoggedIn = useMemo(() => isAuthenticated, [isAuthenticated]);

  useEffect(() => {
    if (isLoggedIn) router.push("/dashboard");
  }, [isLoggedIn, router]);

  const handleAuthSubmit: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true);
    setError("");

    try {
      if (data.email === "admin" && data.password === "admin123") {
        login(data.email);
        toast.success("Login successful!");
        router.push("/dashboard");
      } else {
        setError("Invalid username or password");
        toast.error("Invalid credentials");
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
      toast.error("Authentication failed");
      console.error("Authentication failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Paper
        shadow="md"
        radius="md"
        px="lg"
        py="xl"
        withBorder
        bg="white"
        className="max-w-sm w-full relative border-2 border-gray-300"
      >
        <LoadingOverlay visible={loading} />
        <Title order={2} className="text-center text-sky-500 mb-4">
          Login
        </Title>

        {error && (
          <Text size="sm" mb="sm" className="text-red-500">
            {error}
          </Text>
        )}

        <form onSubmit={handleSubmit(handleAuthSubmit)} className="space-y-4">
          <TextInput
            label="Username"
            placeholder="Enter your username"
            {...register("email")}
            required
            className="text-black"
          />

          <PasswordInput
            label="Password"
            placeholder="Enter your password"
            {...register("password")}
            required
            className="text-black"
          />

          <Button type="submit" fullWidth loading={loading} color="blue">
            Login
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default AuthForm;
