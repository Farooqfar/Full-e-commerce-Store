import { Loader2Icon } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

export function ButtonLoading({ type, text, loading, className, onClick }) {
  return (
    <Button
      className={cn("", className)}
      type={type}
      disabled={loading}
      onClick={onClick}
    >
      {loading && <Loader2Icon className="animate-spin" />}
      {text}
    </Button>
  );
}
