export default function Topbar() {
  return (
    <header className="h-16 bg-linear-to-r from-purple-600 to-pink-500 flex items-center justify-between px-6 text-white">
      <h1 className="font-semibold">Dashboard</h1>
      <div className="flex items-center gap-4">
        <span>User</span>
        <div className="w-8 h-8 rounded-full bg-white/30" />
      </div>
    </header>
  );
}
