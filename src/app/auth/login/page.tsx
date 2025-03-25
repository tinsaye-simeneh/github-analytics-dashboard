"use client";

import { useState } from "react";
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

const AuthForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const { register, handleSubmit } = useForm<FieldValues>();

  //eslint-disable-next-line
  const handleAuthSubmit: SubmitHandler<FieldValues> = async (data: any) => {
    setLoading(true);
    setError("");

    try {
      if (data.email === "admin" && data.password === "admin123") {
        router.push("/");
      } else {
        setError("Invalid username or password");
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
      console.error("Authentication failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-800 h-[calc(100vh-4.2rem)]">
      <Paper
        shadow="md"
        radius="md"
        p="lg"
        withBorder
        className="max-w-sm w-full relative"
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
