import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { BookOpen, Search, Filter, Star, Check, Clock, BookMarked } from "lucide-react";
import { format, parseISO, isBefore, isAfter, differenceInDays } from "date-fns";
import { es } from "date-fns/locale";
import { readingBlocks } from "@/data/readingPlan";
import { cn } from "@/lib/utils";

export default function ReadingPage() {
  const { books, toggleBookComplete, setBooks } = useApp();
  const [search, setSearch] = useState("");
  const [blockFilter, setBlockFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedBook, setSelectedBook] = useState<string | null>(null);

  const today = new Date();

  const filteredBooks = books.filter((book) => {
    if (search) {
      const searchLower = search.toLowerCase();
      if (
        !book.title.toLowerCase().includes(searchLower) &&
        !book.author.toLowerCase().includes(searchLower)
      ) {
        return false;
      }
    }
    if (blockFilter !== "all" && book.block.toString() !== blockFilter) return false;
    if (statusFilter === "completed" && !book.completed) return false;
    if (statusFilter === "pending" && book.completed) return false;
    if (statusFilter === "current") {
      const start = parseISO(book.startDate);
      const end = parseISO(book.endDate);
      return !book.completed && today >= start && today <= end;
    }
    return true;
  });

  const completedCount = books.filter((b) => b.completed).length;
  const totalPages = books.reduce((acc, b) => acc + b.pages, 0);
  const readPages = books.filter((b) => b.completed).reduce((acc, b) => acc + b.pages, 0);
  const currentBook = books.find((b) => {
    const start = parseISO(b.startDate);
    const end = parseISO(b.endDate);
    return !b.completed && today >= start && today <= end;
  });

  const updateBookNotes = (bookId: string, notes: string) => {
    setBooks(books.map((b) => (b.id === bookId ? { ...b, notes } : b)));
  };

  const updateBookRating = (bookId: string, rating: number) => {
    setBooks(books.map((b) => (b.id === bookId ? { ...b, rating } : b)));
  };

  const getBookStatus = (book: typeof books[0]) => {
    if (book.completed) return "completed";
    const start = parseISO(book.startDate);
    const end = parseISO(book.endDate);
    if (isBefore(today, start)) return "upcoming";
    if (isAfter(today, end)) return "overdue";
    return "current";
  };

  const statusColors = {
    completed: "bg-success/20 text-success border-success/30",
    current: "bg-primary/20 text-primary border-primary/30",
    upcoming: "bg-muted text-muted-foreground border-muted",
    overdue: "bg-destructive/20 text-destructive border-destructive/30",
  };

  const statusLabels = {
    completed: "Completado",
    current: "En curso",
    upcoming: "Próximo",
    overdue: "Atrasado",
  };

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl lg:text-4xl font-display font-bold">
              Plan de Lectura 2026
            </h1>
            <p className="text-muted-foreground mt-1">
              El año del criterio — 52 semanas, 52 libros
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-display font-bold">{completedCount}/52</p>
                <p className="text-xs text-muted-foreground">Libros leídos</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-success/10">
                <BookMarked className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-display font-bold">
                  {readPages.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground">Páginas leídas</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-chart-3/10">
                <Clock className="h-5 w-5 text-chart-3" />
              </div>
              <div>
                <p className="text-2xl font-display font-bold">
                  {Math.round((completedCount / 52) * 100)}%
                </p>
                <p className="text-xs text-muted-foreground">Progreso anual</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-chart-4/10">
                <Star className="h-5 w-5 text-chart-4" />
              </div>
              <div>
                <p className="text-2xl font-display font-bold">
                  {books.filter((b) => (b.rating || 0) >= 4).length}
                </p>
                <p className="text-xs text-muted-foreground">Libros destacados</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Current Book Highlight */}
        {currentBook && (
          <Card className="p-6 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1">
                <Badge variant="outline" className="bg-primary/20 text-primary border-primary/30 mb-3">
                  📖 Lectura actual — Semana {currentBook.week}
                </Badge>
                <h2 className="text-2xl font-display font-bold mb-2">
                  {currentBook.title}
                </h2>
                <p className="text-muted-foreground mb-4">{currentBook.author}</p>
                <p className="text-sm mb-4">{currentBook.reason}</p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">{currentBook.pages} páginas</Badge>
                  <Badge variant="outline">{currentBook.blockName}</Badge>
                  <Badge variant="secondary">
                    {format(parseISO(currentBook.startDate), "d MMM", { locale: es })} -{" "}
                    {format(parseISO(currentBook.endDate), "d MMM", { locale: es })}
                  </Badge>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center gap-4">
                <Button
                  size="lg"
                  onClick={() => toggleBookComplete(currentBook.id)}
                  className="gap-2"
                >
                  <Check className="h-5 w-5" />
                  Marcar como leído
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Blocks Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="font-display">Bloques de lectura</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {readingBlocks.map((block) => {
                const blockBooks = books.filter((b) => b.block === block.id);
                const completed = blockBooks.filter((b) => b.completed).length;
                const total = blockBooks.length;
                const progress = (completed / total) * 100;

                return (
                  <button
                    key={block.id}
                    onClick={() => setBlockFilter(block.id.toString())}
                    className={cn(
                      "p-4 rounded-lg text-left transition-all hover:shadow-md",
                      blockFilter === block.id.toString()
                        ? "bg-primary/10 border-2 border-primary"
                        : "bg-muted hover:bg-muted/80 border border-transparent"
                    )}
                  >
                    <p className="text-xs text-muted-foreground mb-1">
                      Semanas {block.weeks}
                    </p>
                    <p className="font-medium text-sm mb-2">{block.name}</p>
                    <Progress value={progress} className="h-1.5 mb-1" />
                    <p className="text-xs text-muted-foreground">
                      {completed}/{total} libros
                    </p>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por título o autor..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={blockFilter} onValueChange={setBlockFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Bloque" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los bloques</SelectItem>
              {readingBlocks.map((block) => (
                <SelectItem key={block.id} value={block.id.toString()}>
                  {block.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="current">En curso</SelectItem>
              <SelectItem value="completed">Completados</SelectItem>
              <SelectItem value="pending">Pendientes</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Books List */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBooks.map((book) => {
            const status = getBookStatus(book);
            const daysLeft = differenceInDays(parseISO(book.endDate), today);

            return (
              <Card
                key={book.id}
                className={cn(
                  "card-hover cursor-pointer",
                  book.completed && "opacity-80"
                )}
                onClick={() => setSelectedBook(book.id)}
              >
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <Badge variant="outline" className={statusColors[status]}>
                      {statusLabels[status]}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      Semana {book.week}
                    </span>
                  </div>
                  <h3 className={cn(
                    "font-display font-semibold text-lg mb-1",
                    book.completed && "line-through"
                  )}>
                    {book.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-3">{book.author}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{book.pages} páginas</span>
                    {book.rating && (
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-warning fill-warning" />
                        <span>{book.rating}</span>
                      </div>
                    )}
                  </div>
                  {status === "current" && daysLeft >= 0 && (
                    <p className="text-xs text-primary mt-2">
                      {daysLeft} días restantes
                    </p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredBooks.length === 0 && (
          <Card className="p-12 text-center">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              No hay libros que coincidan con tu búsqueda
            </p>
          </Card>
        )}

        {/* Book Detail Dialog */}
        <Dialog
          open={!!selectedBook}
          onOpenChange={() => setSelectedBook(null)}
        >
          <DialogContent className="sm:max-w-lg">
            {selectedBook && (() => {
              const book = books.find((b) => b.id === selectedBook)!;
              const status = getBookStatus(book);

              return (
                <>
                  <DialogHeader>
                    <DialogTitle className="font-display text-xl">
                      {book.title}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 pt-2">
                    <div className="flex items-center justify-between">
                      <p className="text-muted-foreground">{book.author}</p>
                      <Badge variant="outline" className={statusColors[status]}>
                        {statusLabels[status]}
                      </Badge>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">Semana {book.week}</Badge>
                      <Badge variant="secondary">{book.pages} páginas</Badge>
                      <Badge variant="outline">{book.blockName}</Badge>
                    </div>

                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm font-medium mb-1">Por qué leerlo:</p>
                      <p className="text-sm text-muted-foreground">{book.reason}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Calificación:</span>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => updateBookRating(book.id, star)}
                            className="p-1"
                          >
                            <Star
                              className={cn(
                                "h-5 w-5 transition-colors",
                                (book.rating || 0) >= star
                                  ? "text-warning fill-warning"
                                  : "text-muted-foreground"
                              )}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Notas personales</label>
                      <Textarea
                        value={book.notes}
                        onChange={(e) => updateBookNotes(book.id, e.target.value)}
                        placeholder="Tus reflexiones sobre el libro..."
                        rows={3}
                      />
                    </div>

                    <div className="flex gap-3">
                      <Button
                        variant={book.completed ? "secondary" : "default"}
                        className="flex-1"
                        onClick={() => toggleBookComplete(book.id)}
                      >
                        {book.completed ? "Marcar como pendiente" : "Marcar como leído"}
                      </Button>
                    </div>
                  </div>
                </>
              );
            })()}
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
}
