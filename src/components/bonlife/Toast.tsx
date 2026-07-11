import { Toaster as SonnerToaster, toast } from "sonner";

export function BonlifeToaster() {
  return (
    <SonnerToaster
      position="bottom-right"
      toastOptions={{
        style: {
          background: "var(--navy-900)",
          color: "#fff",
          border: "none",
          fontFamily: "var(--font-body)",
          borderRadius: "12px",
        },
      }}
    />
  );
}

export { toast };
