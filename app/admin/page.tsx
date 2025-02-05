"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ Basic validation
    if (email === "pubgali125.com@gmail.com" ) {
    // if (email === "pubgali125.com@gmail.com" && password === "securePassword123") {    //ager pasword dey kar enter hona ho tu
    
    localStorage.setItem("isLoggedIn", "true"); // ✅ Set login status
      router.push("/admin/dashboard"); // ✅ Redirect to the dashboard
   
      //jab pasword dain gy to else b dain gy
      // } else {
    //   alert("Invalid email or password"); // ❌ Invalid credentials
     }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">Admin Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600 transition duration-200"
        >
          Login
        </button>
      </form>
    </div>
  );
}
