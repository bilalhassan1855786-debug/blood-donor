"use client";

import { useState } from "react";
import { safeFetch, isOfflineError } from "@/lib/safeFetch";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [signupForm, setSignupForm] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    city: "",
    bloodGroup: "",
  });

  // LOGIN
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await safeFetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginForm),
      });

      const data = await res.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
        alert("Login Successful ✅");
        window.location.href = "/donors";
      } else {
        alert(data.message || "Login Failed");
      }
    } catch (err) {
      if (isOfflineError(err)) {
        alert("You're offline. Please check your connection and try again.");
      } else {
        alert("Login Failed");
      }
    }
  };

  // SIGNUP
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await safeFetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupForm),
      });

      const data = await res.json();

      if (data.success) {
        alert("Account Created 🎉");
        setIsLogin(true);

        setSignupForm({
          fullName: "",
          email: "",
          password: "",
          phone: "",
          city: "",
          bloodGroup: "",
        });
      } else {
        alert(data.message || "Signup Failed");
      }
    } catch (err) {
      if (isOfflineError(err)) {
        alert("You're offline. Please check your connection and try again.");
      } else {
        alert("Signup Failed");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow">

        <h1 className="text-2xl font-bold text-center text-red-600">
          🩸 Blood Donor App
        </h1>

        <p className="text-center text-gray-500 mb-4">
          Save Lives, Donate Blood
        </p>

        {/* Toggle */}
        <div className="flex mb-4 bg-gray-100 rounded-lg overflow-hidden">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 ${
              isLogin ? "bg-red-600 text-white" : ""
            }`}
          >
            Login
          </button>

          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 ${
              !isLogin ? "bg-red-600 text-white" : ""
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* LOGIN */}
        {isLogin ? (
          <form onSubmit={handleLogin} className="space-y-3">
            <input
              type="email"
              placeholder="Email"
              className="w-full border p-2 rounded"
              value={loginForm.email}
              onChange={(e) =>
                setLoginForm({ ...loginForm, email: e.target.value })
              }
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full border p-2 rounded"
              value={loginForm.password}
              onChange={(e) =>
                setLoginForm({ ...loginForm, password: e.target.value })
              }
            />

            <button className="w-full bg-red-600 text-white p-2 rounded">
              Login
            </button>
          </form>
        ) : (
          // SIGNUP
          <form onSubmit={handleSignup} className="space-y-3">

            <input
              placeholder="Full Name"
              className="w-full border p-2 rounded"
              value={signupForm.fullName}
              onChange={(e) =>
                setSignupForm({ ...signupForm, fullName: e.target.value })
              }
            />

            <input
              placeholder="Phone"
              className="w-full border p-2 rounded"
              value={signupForm.phone}
              onChange={(e) =>
                setSignupForm({ ...signupForm, phone: e.target.value })
              }
            />

            <input
              placeholder="Email"
              className="w-full border p-2 rounded"
              value={signupForm.email}
              onChange={(e) =>
                setSignupForm({ ...signupForm, email: e.target.value })
              }
            />

            <input
              placeholder="City"
              className="w-full border p-2 rounded"
              value={signupForm.city}
              onChange={(e) =>
                setSignupForm({ ...signupForm, city: e.target.value })
              }
            />

            <input
              placeholder="Blood Group (A+, B+...)"
              className="w-full border p-2 rounded"
              value={signupForm.bloodGroup}
              onChange={(e) =>
                setSignupForm({ ...signupForm, bloodGroup: e.target.value })
              }
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full border p-2 rounded"
              value={signupForm.password}
              onChange={(e) =>
                setSignupForm({ ...signupForm, password: e.target.value })
              }
            />

            <button className="w-full bg-red-600 text-white p-2 rounded">
              Create Account
            </button>
          </form>
        )}
      </div>
    </div>
  );
}