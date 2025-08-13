import AccessibleBookPlayer from "@/components/AccessibleBookPlayer";
import { books } from "@/lib/booksData";

export default function BooksPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Accessible Books</h1>
      <AccessibleBookPlayer books={books} />
    </div>
  );
}
