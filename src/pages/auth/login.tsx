import React, { useEffect, useState } from "react";
import useLogin from "../../hooks/useAuthLogin";

export default function Login() {
  const { handleLogin, handleEmailChange, handlePasswordChange } = useLogin();
  return (
    <div>
      <h1>Login</h1>
      <form>
        <input type="email" placeholder="Email" onChange={handleEmailChange} />
        <input
          type="password"
          placeholder="Password"
          onChange={handlePasswordChange}
        />
        <button
          onClick={(e: React.FormEvent<HTMLButtonElement>) => {
            handleLogin(e);
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}
