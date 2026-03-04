import { useState } from "react";
import { Book } from "./BookCard";

interface EditBookCardProps {
  book: Book;
  onSave: (id: string, form: Partial<Book>) => void;
  onCancel: () => void;
}

const EditBookCard = ({ book, onSave, onCancel }: EditBookCardProps) => {
  const [form, setForm] = useState({
    title: book.title,
    author: book.author,
    publishedYear: book.publishedYear,
  });

  const fields: Array<{ key: keyof typeof form; label: string }> = [
    { key: "title", label: "Title" },
    { key: "author", label: "Author" },
    { key: "publishedYear", label: "Year" },
  ];

  return (
    <div className="bg-slate-800 border border-teal-500/30 rounded-2xl overflow-hidden flex flex-col">
      <div className={`h-1 ${book.status === "available" ? "bg-teal-500" : "bg-orange-500"}`} />

      <div className="p-5 space-y-3 flex-1">
        <p className="text-xs text-teal-400 font-semibold uppercase tracking-wider">Editing Book</p>

        {fields.map(({ key, label }) => (
          <div key={key}>
            <label className="block text-xs text-slate-500 mb-1">{label}</label>
            <input
              value={form[key]}
              onChange={(e) => setForm({ ...form, [key]: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition"
            />
          </div>
        ))}

        <div className="flex gap-2 pt-1">
          <button
            onClick={() => onSave(book._id, form)}
            className="flex-1 bg-teal-500 hover:bg-teal-400 text-white text-sm font-semibold py-2 rounded-lg transition"
          >
            Save Changes
          </button>
          <button
            onClick={onCancel}
            className="flex-1 bg-slate-700 hover:bg-slate-600 text-slate-300 text-sm font-medium py-2 rounded-lg transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditBookCard;
