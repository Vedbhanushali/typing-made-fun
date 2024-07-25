import React, { Suspense } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
const DashBoard = React.lazy(() => import("./Dashboard"));
const TypingTest = React.lazy(() => import("./TypingTest"));
const AboutMe = React.lazy(() => import("./AboutMe"));
const BlockList = React.lazy(() => import("./BlockList"));

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
              <Menu className="h-5 w-5 text-icon-color" />
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
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] gap-4 bg-background p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-8xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <nav
            className="hidden md:flex flex-col justify-between h-full max-h-screen gap-2"
            x-chunk="dashboard-04-chunk-0"
          >
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
            <div className="pr-4">
              <Card x-chunk="dashboard-02-chunk-0" className="rounded-md">
                <CardHeader className="p-2 pt-0 md:p-4">
                  <CardTitle>Feedback</CardTitle>
                  <CardDescription>
                    Leave your feedback or report an issue of this Open source
                    Project on GitHub.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                  <Button
                    size="default"
                    className="w-full"
                    onClick={() => {
                      chrome.tabs.create({
                        url: "https://github.com/Vedbhanushali/typing-made-fun",
                      });
                    }}
                  >
                    Github
                  </Button>
                </CardContent>
              </Card>
            </div>
          </nav>
          {tab === "dashboard" && (
            <Suspense fallback={<div>Loading...</div>}>
              <DashBoard />
            </Suspense>
          )}
          {tab === "typing-test" && (
            <Suspense fallback={<div>Loading...</div>}>
              <TypingTest />
            </Suspense>
          )}
          {tab === "block-list" && (
            <Suspense fallback={<div>Loading...</div>}>
              <BlockList />
            </Suspense>
          )}
          {tab === "about-me" && (
            <Suspense fallback={<div>Loading...</div>}>
              <AboutMe />
            </Suspense>
          )}
        </div>
      </main>
    </div>
  );
}
