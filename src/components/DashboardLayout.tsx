import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import DashBoard from "./Dashboard";
import TypingTest from "./TypingTest";
import AboutMe from "./AboutMe";
import BlockList from "./BlockList";

const sideBarMenu = [
  {
    title: "Dashboard",
    link: "?tab=dashboard",
  },
  {
    title: "Typing Test",
    link: "?tab=typing-test",
  },
  {
    title: "Block List",
    link: "?tab=block-list",
  },
  {
    title: "About Me",
    link: "?tab=about-me",
  },
];

export default function DashboardLayout({ tab }: { tab: string }) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <h3 className="text-foreground hover:text-primary text-2xl font-semibold tracking-tight">
                Typing Made Fun
              </h3>
              {sideBarMenu.map((s) => (
                <a href={s.link} className="text-foreground hover:text-primary">
                  {s.title}
                </a>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
        <h3 className="text-foreground hover:text-primary text-2xl font-semibold tracking-tight">
          Typing Made Fun
        </h3>
      </header>
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-background p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <nav className="hidden md:block" x-chunk="dashboard-04-chunk-0">
            <div className="grid gap-4 text-sm text-muted-foreground">
              {sideBarMenu.map((s) => (
                <a
                  href={s.link}
                  className="font-semibold text-foreground hover:text-primary"
                >
                  {s.title}
                </a>
              ))}
            </div>
          </nav>
          <div className="grid gap-6">
            {tab === "dashboard" && <DashBoard />}
            {tab === "typing-test" && <TypingTest />}
            {tab === "block-list" && <BlockList />}
            {tab === "about-me" && <AboutMe />}
          </div>
        </div>
      </main>
    </div>
  );
}
