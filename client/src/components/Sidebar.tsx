"use client";

function Sidebar() {
  return (
    <aside className="hidden w-64 flex-col border-r border-slate-800 bg-slate-900 md:flex">
      <div className="flex h-16 items-center border-b border-slate-800 px-6 font-bold text-xl tracking-tight">
        SublimeHub
      </div>

      <nav className="flex-1 space-y-1 p-4">
        <div className="text-xs font-semibold text-slate-500 uppercase px-2 mb-2">
          Modules
        </div>

        <div className="px-2 py-2 hover:bg-slate-800 rounded-md cursor-pointer">
          Finance
        </div>
        <div className="px-2 py-2 hover:bg-slate-800 rounded-md cursor-pointer">
          Uptime Monitor
        </div>
        <div className="px-2 py-2 hover:bg-slate-800 rounded-md cursor-pointer">
          Crypto Tracker
        </div>
      </nav>

      <div className="border-t border-slate-800 p-4 text-sm text-slate-400">
        User Profile / Logout
      </div>
    </aside>
  );
}

export default Sidebar;
