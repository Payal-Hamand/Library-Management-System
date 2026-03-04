// import { useContext, useEffect, useState } from "react";
// import Navbar from "../components/Navbar";
// import BookForm from "../components/BookForm";
// import BookList from "../components/BookList";
// import { AuthContext } from "../context/AuthContext";
// import API from "../api/axios";

// const Dashboard = () => {
//   const { user } = useContext(AuthContext);
//   const [refresh, setRefresh] = useState(false);
//   const [stats, setStats] = useState({
//     total: 0,
//     available: 0,
//     borrowed: 0,
//   });
//   console.log("User in Dashboard:", user);

//   const refreshBooks = () => {
//     setRefresh(!refresh);
//   };

//   useEffect(() => {
//     const fetchStats = async () => {
//       const res = await API.get("/books");
//       const books = res.data.data || res.data;

//       setStats({
//         total: books.length,
//         available: books.filter((b: any) => b.status === "available").length,
//         borrowed: books.filter((b: any) => b.status === "borrowed").length,
//       });
//     };

//     fetchStats();
//   }, [refresh]);

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <Navbar />

//       <div className="p-6 max-w-6xl mx-auto">

   
//         <div className="mb-6">
//           <h2 className="text-2xl font-bold text-gray-800">
//             Welcome, {user?.role === "admin" ? "Admin" : "User"}
//           </h2>
//           <p className="text-gray-500 text-sm">
//             Manage your library books easily
//           </p>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          
//           <div className="bg-white p-5 rounded-xl shadow">
//             <h3 className="text-gray-500 text-sm">Total Books</h3>
//             <p className="text-2xl font-bold text-gray-800">
//               {stats.total}
//             </p>
//           </div>

//           <div className="bg-white p-5 rounded-xl shadow">
//             <h3 className="text-gray-500 text-sm">Available</h3>
//             <p className="text-2xl font-bold text-green-600">
//               {stats.available}
//             </p>
//           </div>

//           <div className="bg-white p-5 rounded-xl shadow">
//             <h3 className="text-gray-500 text-sm">Borrowed</h3>
//             <p className="text-2xl font-bold text-red-600">
//               {stats.borrowed}
//             </p>
//           </div>

//         </div>

      
//         {user?.role === "admin" && (
//           <BookForm refresh={refreshBooks} />
//         )}

       
//         <BookList refresh={refresh} />

//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../api/axios";
import Navbar from "../components/Navbar";
import BookForm from "../components/BookForm";
import BookList from "../components/BookList";
import StatsCard from "../components/StatsCard";
import { SearchIcon } from "../components/Icons";

interface Stats {
  total: number;
  available: number;
  borrowed: number;
}

const FILTERS = [
  { key: "all" as const, label: "All Books" },
  { key: "available" as const, label: "Available" },
  { key: "borrowed" as const, label: "Borrowed" },
];

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [refresh, setRefresh] = useState(false);
  const [stats, setStats] = useState<Stats>({ total: 0, available: 0, borrowed: 0 });
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "available" | "borrowed">("all");

  const triggerRefresh = () => setRefresh((prev) => !prev);

  useEffect(() => {
    const fetchStats = async () => {
      const res = await API.get("/books");
      const books = res.data.data || res.data;
      setStats({
        total: books.length,
        available: books.filter((b: any) => b.status === "available").length,
        borrowed: books.filter((b: any) => b.status === "borrowed").length,
      });
    };
    fetchStats();
  }, [refresh]);

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-8">

        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-white text-2xl font-bold">
            Good day, {user?.role === "admin" ? "Administrator 👋" : `Reader 👋`}
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            {user?.role === "admin"
              ? "Manage your library catalogue and book inventory."
              : "Browse available books and manage your borrowings."}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <StatsCard
            label="Total Books"
            value={stats.total}
            colorClass="text-slate-300"
            bgClass="bg-slate-700/50"
            borderClass="border-slate-700/60"
            icon={
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
              </svg>
            }
          />
          <StatsCard
            label="Available"
            value={stats.available}
            colorClass="text-teal-400"
            bgClass="bg-teal-500/10"
            borderClass="border-teal-500/20"
            icon={
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            }
          />
          <StatsCard
            label="Borrowed"
            value={stats.borrowed}
            colorClass="text-orange-400"
            bgClass="bg-orange-500/10"
            borderClass="border-orange-500/20"
            icon={
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
              </svg>
            }
          />
        </div>

        {/* Add Book (admin only) */}
        {user?.role === "admin" && <BookForm onRefresh={triggerRefresh} />}

        {/* Search + Filter toolbar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
              <SearchIcon />
            </div>
            <input
              type="text"
              placeholder="Search by title or author…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-500 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/40 focus:border-teal-500 transition"
            />
          </div>

          <div className="flex gap-2">
            {FILTERS.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setFilterStatus(key)}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all
                  ${filterStatus === key
                    ? "bg-teal-500 text-white"
                    : "bg-slate-800 border border-slate-700 text-slate-400 hover:text-white hover:border-slate-600"
                  }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Book grid */}
        <BookList
          refresh={refresh}
          searchQuery={search}
          filterStatus={filterStatus}
        />

      </main>
    </div>
  );
};

export default Dashboard;
