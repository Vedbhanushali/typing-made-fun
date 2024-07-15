import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const sideBarMenu = [
  {
    title: "Dashboard",
    link: "#",
  },
  {
    title: "Typing Test",
    link: "#",
  },
  {
    title: "Block List",
    link: "#",
  },
  {
    title: "About Me",
    link: "#",
  },
];

export default function DashboardLayout({ tab }: { tab: string }) {
  console.log(tab);
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
              <h3 className="text-foreground text-2xl font-semibold tracking-tight">
                Typing Made Fun
              </h3>
              {sideBarMenu.map((s) => (
                <a
                  href={s.link}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {s.title}
                </a>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
        <h3 className="text-foreground text-2xl font-semibold tracking-tight">
          Typing Made Fun
        </h3>
      </header>
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-background p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <nav className="hidden md:block" x-chunk="dashboard-04-chunk-0">
            <div className="grid gap-4 text-sm text-muted-foreground">
              {sideBarMenu.map((s) => (
                <a href={s.link} className="font-semibold text-primary">
                  {s.title}
                </a>
              ))}
            </div>
          </nav>
          <div className="grid gap-6">
            <Card x-chunk="dashboard-04-chunk-1">
              <CardHeader>
                <CardTitle>Store Name</CardTitle>
                <CardDescription>
                  Used to identify your store in the marketplace.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <h1>Test</h1>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <Button>Save</Button>
              </CardFooter>
            </Card>
            <Card x-chunk="dashboard-04-chunk-2">
              <CardHeader>
                <CardTitle>Plugins Directory</CardTitle>
                <CardDescription>
                  The directory within your project, in which your plugins are
                  located.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="flex flex-col gap-4">
                  {/* <Input
                    placeholder="Project Name"
                    defaultValue="/content/plugins"
                  /> */}
                  <div className="flex items-center space-x-2">
                    {/* <Checkbox id="include" defaultChecked /> */}
                    <label
                      htmlFor="include"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Allow administrators to change the directory.
                    </label>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <Button>Save</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
