import { BorrowIcon, ReturnIcon, EditIcon, TrashIcon } from "./Icons";

export interface Book {
  _id: string;
  title: string;
  author: string;
  publishedYear: string;
  status: "available" | "borrowed";
}

interface BookCardProps {
  book: Book;
  isAdmin: boolean;
  onToggle: (id: string, status: string) => void;
  onDelete: (id: string) => void;
  onEdit: (book: Book) => void;
}

const BookCard = ({ book, isAdmin, onToggle, onDelete, onEdit }: BookCardProps) => {
  const avail = book.status === "available";

  return (
    <div className="bg-slate-800 border border-slate-700/60 rounded-2xl overflow-hidden hover:border-slate-600 transition-all duration-200 hover:shadow-xl hover:shadow-black/20 flex flex-col">
      {/* Top accent bar */}
      <div className={`h-1 ${avail ? "bg-teal-500" : "bg-orange-500"}`} />

      <div className="p-5 flex flex-col flex-1">
        {/* Status badge */}
        <span
          className={`self-start text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full mb-3 border
            ${avail
              ? "bg-teal-500/10 text-teal-400 border-teal-500/20"
              : "bg-orange-500/10 text-orange-400 border-orange-500/20"
            }`}
        >
          {avail ? "● Available" : "● Borrowed"}
        </span>

        <h3 className="text-white font-semibold text-base leading-snug mb-1">{book.title}</h3>
        <p className="text-slate-400 text-sm">
          {book.author}
          {book.publishedYear && (
            <span className="text-slate-600"> · {book.publishedYear}</span>
          )}
        </p>
      </div>

      {/* Action footer */}
      <div className="px-5 py-4 border-t border-slate-700/50 flex items-center gap-2">
        <button
          onClick={() => onToggle(book._id, book.status)}
          className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition
            ${avail
              ? "bg-slate-700 hover:bg-slate-600 text-white"
              : "bg-teal-500/10 hover:bg-teal-500/20 text-teal-400 border border-teal-500/20"
            }`}
        >
          {avail ? <><BorrowIcon /> Borrow</> : <><ReturnIcon /> Return</>}
        </button>

        {isAdmin && (
          <>
            <button
              onClick={() => onEdit(book)}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-blue-500/10 hover:text-blue-400 text-slate-300 border border-transparent hover:border-blue-500/20 transition"
            >
              <EditIcon /> Edit
            </button>

            <button
              onClick={() => onDelete(book._id)}
              className="ml-auto flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition"
            >
              <TrashIcon /> Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default BookCard;
