export default function Loader() {
  return (
    <div className="min-h-screen grid place-items-center">
      <div className="flex items-center gap-3 text-gray-700">
        <span className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-transparent" />
        <span className="text-sm font-medium">Cargando…</span>
      </div>
    </div>
  );
}
