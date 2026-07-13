// app/not-found.tsx
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center px-6">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">404</h1>
      <p className="text-(--text-description) mb-6">
        The page you are looking for does not exist.
      </p>
      <Button href="/" label="Go Home" />
    </div>
  );
}
