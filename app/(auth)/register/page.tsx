"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(username, password, email);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Exemplo de requisição de criação de usuário. A implementação depende do backend/API.
    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: username,
        email,
        password,
      }),
    });

    if (response.ok) {
      router.push("/login"); // Redireciona para a página de login após o registro bem-sucedido
    } else {
      const data = await response.json();
      setError(data.message || "Registration failed");
    }
  };

  return (
    <div className="flex justify-center h-screen">
      <div className="text-white pt-[64px] px-20 max-w-[600px] ">
        <div className="text-4xl font-bold pb-[20px]">Create your account</div>
        <form onSubmit={handleSubmit}>
          <div className="py-10">
            <Label>User</Label>
            <Input
              placeholder="Enter your username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-[#000] h-[50px] w-full text-white border-[#343434]"
              required
            />
          </div>
          <div className="">
            <Label>Email</Label>
            <Input
              placeholder="E-mail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[#000] h-[50px] w-full text-white border-[#343434]"
              required
            />
          </div>
          <div className="py-10">
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
          <div className="">
            <Label>Password again</Label>
            <Input
              placeholder="Enter your password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
              Create Account
            </Button>
          </div>
        </form>
        <div className="pt-3 flex justify-center w-full">
          <Link href="login">Do you have an account? Login</Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
