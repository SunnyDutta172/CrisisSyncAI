import { useState } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import GuestPage from "./pages/auth/GuestPage";

// Replace this simple state-based router with React Router when ready:
// npm install react-router-dom
// Then use <BrowserRouter>, <Routes>, <Route> instead.

export default function App() {
  const [page, setPage] = useState("login"); // "login" | "signup" | "guest"

  return (
    <ThemeProvider>
      <AuthProvider>
        {page === "login" && (
          <LoginPage
            onNavigateSignup={() => setPage("signup")}
            onNavigateGuest={() => setPage("guest")}
          />
        )}
        {page === "signup" && (
          <SignupPage onNavigateLogin={() => setPage("login")} />
        )}
        {page === "guest" && (
          <GuestPage onNavigateLogin={() => setPage("login")} />
        )}
      </AuthProvider>
    </ThemeProvider>
  );
}
