import { useAuth } from "../../auth/authContext";
import { signOutEverywhere } from "../../auth/authService";

export default function DashBoard() {
     const { user, setUser } = useAuth();

    const onLogout = async () => {
    await signOutEverywhere();
    setUser(null); // sin usuario → App vuelve a mostrar AuthScreen
  };


  return (
    <div>
      <h1>panel de control</h1>
      <button onClick={onLogout} className="bg-red-600 text-white px-3 py-2 rounded-lg">
        Cerrar sesión
      </button>
    </div>
  );
}
