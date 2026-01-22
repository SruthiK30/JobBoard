import { useNavigate } from "react-router-dom";
import { useRole } from "../context/RoleContext";

const RoleSelect = () => {
  const navigate = useNavigate();
  const { setRole } = useRole();

  const selectRole = (role: "user" | "admin") => {
    document.cookie = `role=${role}; path=/`;
    setRole(role);
    navigate("/jobs");
  };

  return (
    <div className="h-screen flex items-center justify-center gap-6">
      <button
        onClick={() => selectRole("user")}
        className="px-6 py-3 bg-blue-600 text-white rounded"
      >
        Continue as User
      </button>

      <button
        onClick={() => selectRole("admin")}
        className="px-6 py-3 bg-green-600 text-white rounded"
      >
        Continue as Admin
      </button>
    </div>
  );
};

export default RoleSelect;
