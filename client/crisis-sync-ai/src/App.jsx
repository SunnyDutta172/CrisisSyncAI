import { useState } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import GuestPage from "./pages/auth/GuestPage";
import AdminPage from "./pages/dashboard/AdminPage";
import StaffPage from "./pages/dashboard/StaffPage";
import GuestDashboard from "./pages/dashboard/GuestDashboard";

// Inner component so we can use useAuth hook
function AppRouter() {
  const { user } = useAuth();
  const [page, setPage] = useState("login"); // "login" | "signup" | "guest"
  const [activeRole, setActiveRole] = useState(null);

  // Once logged in, show dashboards
  if (user) {
    const role = activeRole ?? user.role;
    const handleSwitch = (newRole) => setActiveRole(newRole);

    if (role === "admin") return <AdminPage onSwitch={handleSwitch} />;
    if (role === "staff") return <StaffPage onSwitch={handleSwitch} />;
    if (role === "guest") return <GuestDashboard onSwitch={handleSwitch} />;
  }

  // Auth pages
  return (
    <>
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
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </ThemeProvider>
  );
}
