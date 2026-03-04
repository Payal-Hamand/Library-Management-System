import { CheckIcon, WarnIcon } from "./Icons";

interface AlertProps {
  type: "error" | "success";
  message: string;
}

const Alert = ({ type, message }: AlertProps) => {
  if (!message) return null;

  const styles =
    type === "error"
      ? "bg-red-500/10 border-red-500/20 text-red-400"
      : "bg-teal-500/10 border-teal-500/20 text-teal-400";

  return (
    <div className={`flex items-center gap-2 border rounded-xl px-4 py-3 text-sm mb-5 ${styles}`}>
      {type === "error" ? <WarnIcon /> : <CheckIcon />}
      {message}
    </div>
  );
};

export default Alert;
