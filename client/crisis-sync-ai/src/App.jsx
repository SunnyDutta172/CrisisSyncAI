import { useState } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";

// Replace this simple state-based router with React Router when ready:
// npm install react-router-dom
// Then use <BrowserRouter>, <Routes>, <Route> instead.

export default function App() {
  const [page, setPage] = useState("login"); // "login" | "signup"

  return (
    <ThemeProvider>
      <AuthProvider>
        {page === "login" && (
          <LoginPage onNavigateSignup={() => setPage("signup")} />
        )}
        {page === "signup" && (
          <SignupPage onNavigateLogin={() => setPage("login")} />
        )}
      </AuthProvider>
    </ThemeProvider>
  );
}
