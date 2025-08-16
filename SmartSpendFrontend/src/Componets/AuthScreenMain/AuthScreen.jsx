import { useState } from "react";
import { useAuth } from "../../auth/authContext";
import { signInWithEmailPassword, signUpWithEmailPassword } from "../../auth/authService";

export default function AuthScreen() {
  const { setUser } = useAuth();
  const [tab, setTab] = useState("login"); // 'login' | 'register'

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-lg rounded-2xl p-6 md:p-8">
          <h1 className="text-2xl font-semibold text-gray-900 text-center">SmartSpend</h1>

          {/* Tabs */}
          <div className="mt-6 grid grid-cols-2 rounded-xl border border-gray-200 p-1 bg-gray-50">
            <button
              className={`py-2 text-sm font-medium rounded-lg ${
                tab === "login" ? "bg-white shadow border border-gray-200" : "text-gray-500"
              }`}
              onClick={() => setTab("login")}
            >
              Iniciar sesión
            </button>
            <button
              className={`py-2 text-sm font-medium rounded-lg ${
                tab === "register" ? "bg-white shadow border border-gray-200" : "text-gray-500"
              }`}
              onClick={() => setTab("register")}
            >
              Crear cuenta
            </button>
          </div>

          <div className="mt-6">
            {tab === "login" ? <LoginForm onSuccess={setUser} /> : <RegisterForm onSuccess={setUser} />}
          </div>
        </div>
      </div>
    </div>
  );
}

function LoginForm({ onSuccess }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const onChange = (e) => setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      const u = await signInWithEmailPassword(form.email, form.password);
      onSuccess(u);
    } catch (error) {
      setErr(error?.response?.data?.message || error?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label htmlFor="email-login" className="block text-sm font-medium text-gray-700">Email</label>
        <input
          id="email-login"
          name="email"
          type="email"
          required
          value={form.email}
          onChange={onChange}
          className="mt-1 block w-full rounded-xl border border-gray-300 px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="you@example.com"
          autoComplete="email"
        />
      </div>

      <div>
        <label htmlFor="password-login" className="block text-sm font-medium text-gray-700">Contraseña</label>
        <input
          id="password-login"
          name="password"
          type="password"
          required
          value={form.password}
          onChange={onChange}
          className="mt-1 block w-full rounded-xl border border-gray-300 px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="••••••••"
          autoComplete="current-password"
        />
      </div>

      {err && <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{err}</div>}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-indigo-600 px-4 py-2.5 text-white font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? "Entrando…" : "Entrar"}
      </button>
    </form>
  );
}

function RegisterForm({ onSuccess }) {
  const [form, setForm] = useState({ email: "", password: "", confirm: "", username: "" });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const onChange = (e) => setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    if (form.password.length < 6) return setErr("La contraseña debe tener al menos 6 caracteres.");
    if (form.password !== form.confirm) return setErr("Las contraseñas no coinciden.");

    setLoading(true);
    try {
      const u = await signUpWithEmailPassword(form.email, form.password, form.username || undefined);
      onSuccess(u);
    } catch (error) {
      const msg = error?.response?.data?.message || error?.code || error?.message || "No se pudo completar el registro";
      setErr(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username (opcional)</label>
        <input
          id="username"
          name="username"
          value={form.username}
          onChange={onChange}
          className="mt-1 block w-full rounded-xl border border-gray-300 px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="tu-usuario"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={form.email}
          onChange={onChange}
          className="mt-1 block w-full rounded-xl border border-gray-300 px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="you@example.com"
          autoComplete="email"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
        <input
          id="password"
          name="password"
          type="password"
          required
          value={form.password}
          onChange={onChange}
          className="mt-1 block w-full rounded-xl border border-gray-300 px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="••••••••"
          autoComplete="new-password"
        />
      </div>

      <div>
        <label htmlFor="confirm" className="block text-sm font-medium text-gray-700">Repite la contraseña</label>
        <input
          id="confirm"
          name="confirm"
          type="password"
          required
          value={form.confirm}
          onChange={onChange}
          className="mt-1 block w-full rounded-xl border border-gray-300 px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="••••••••"
          autoComplete="new-password"
        />
      </div>

      {err && <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{err}</div>}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-indigo-600 px-4 py-2.5 text-white font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? "Creando cuenta…" : "Registrarme"}
      </button>
    </form>
  );
}
