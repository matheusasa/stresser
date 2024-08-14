// app/auth/signin/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

const LoginPage = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Armazene o JWT no localStorage ou em outro lugar seguro
        localStorage.setItem("token", data.token);
        // Redireciona para a página principal ou outra após o login
        router.refresh();
        router.push("/");
      } else {
        setError(data.error || "An error occurred");
      }
    } catch (error) {
      setError("An error occurred");
    }
  };

  return (
    <div className="flex justify-center h-[700px]">
      <div className="text-white pt-[64px] px-6 w-full max-w-[480px]">
        <div className="text-4xl font-bold pb-[20px] w-full">Login</div>
        <form onSubmit={handleSubmit}>
          <div className="py-6 w-full">
            <Label>User</Label>
            <Input
              placeholder="Enter your user"
              type="user"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              className="bg-[#000] h-[50px] w-full text-white border-[#343434]"
              required
            />
          </div>
          <div className="w-full">
            <Label>Password</Label>
            <Input
              placeholder="Enter your password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-[#000] h-[50px] w-full text-white border-[#343434]"
              required
            />
          </div>
          {error && <div className="pt-2 text-red-500 text-sm">{error}</div>}
          <div className="pt-10">
            <Button
              type="submit"
              className="w-full bg-custom-blue hover:bg-gradient-start rounded-full"
            >
              Login
            </Button>
          </div>
        </form>
        <div className="pt-3 flex justify-center w-full">
          <Link href="register">Create an account</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
