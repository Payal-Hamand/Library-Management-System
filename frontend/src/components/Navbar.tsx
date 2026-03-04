// // import { useContext } from "react";
// // import { AuthContext } from "../context/AuthContext";

// // const Navbar = () => {
// //   const { user, logout } = useContext(AuthContext);

// //   return (
// //     <div className="bg-gray-800 text-white p-4 flex justify-between">
// //       <h1 className="font-bold text-lg">Library System</h1>

// //       <div className="flex gap-4 items-center">
// //         <span className="text-sm">Role: {user?.role}</span>
// //         <button
// //           onClick={logout}
// //           className="bg-red-500 px-3 py-1 rounded"
// //         >
// //           Logout
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Navbar;

// import { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";

// const Navbar = () => {
//   const { user, logout } = useContext(AuthContext);

//   return (
//     <div className="bg-white shadow p-4 flex justify-between items-center">
//       <h1 className="text-xl font-bold text-blue-600">
//         Library Dashboard
//       </h1>

//       <div className="flex items-center gap-4">
//         <span className="text-sm text-gray-600">
//           Role: <span className="font-semibold">{user?.role}</span>
//         </span>

//         <button
//           onClick={logout}
//           className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600 transition"
//         >
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Navbar;
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { BookIcon, LogoutIcon } from "./Icons";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-slate-900 border-b border-slate-700/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center text-white">
            <BookIcon />
          </div>
          <span className="text-white font-bold text-lg tracking-tight">
            Library<span className="text-teal-400">MS</span>
          </span>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
            <span className="text-slate-400 text-sm">{user?.username || "User"}</span>
            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider border
              ${user?.role === "admin"
                ? "bg-amber-400/10 text-amber-400 border-amber-400/20"
                : "bg-teal-400/10 text-teal-400 border-teal-400/20"
              }`}
            >
              {user?.role}
            </span>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-slate-800 hover:bg-red-500/10 border border-slate-700 hover:border-red-500/40 text-slate-300 hover:text-red-400 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
          >
            <LogoutIcon />
            Logout
          </button>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
