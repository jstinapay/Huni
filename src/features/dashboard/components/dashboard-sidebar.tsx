"use client";

import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { OrganizationSwitcher, UserButton, useClerk } from "@clerk/nextjs";
import {
  type LucideIcon,
  Home,
  LayoutGrid,
  AudioLines,
  Volume2,
  Settings,
  Mail,
  Search,
  Sun,
  Moon,
} from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { Kbd } from "@/components/ui/kbd";
import {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useModifier } from "@/hooks/use-modifier";

interface MenuItem {
  title: string;
  url?: string;
  icon: LucideIcon;
  onClick?: () => void;
  disabled?: boolean;
  badge?: string;
  tooltip?: string;
  shortcutKey?: string;
}

interface NavSectionProps {
  label?: string;
  items: MenuItem[];
  pathname: string;
}

function NavSection({ label, items, pathname }: NavSectionProps) {
  const mod = useModifier();
  return (
    <SidebarGroup>
      {label && (
        <SidebarGroupLabel className="text-[11px] font-semibold uppercase tracking-widest text-sidebar-foreground/50 group-data-[collapsible=icon]:sr-only">
          {label}
        </SidebarGroupLabel>
      )}
      <SidebarGroupContent>
        <SidebarMenu className="gap-0.5">
          {items.map((item) => {
            const isActive = item.url
              ? item.url === "/"
                ? pathname === "/"
                : pathname.startsWith(item.url)
              : false;
            const isExternal = item.url?.startsWith("mailto:");

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  render={
                    item.url ? (
                      isExternal ? (
                        <a href={item.url} />
                      ) : (
                        <Link href={item.url} />
                      )
                    ) : undefined
                  }
                  isActive={isActive}
                  onClick={item.onClick}
                  tooltip={item.tooltip ?? item.title}
                  aria-current={isActive ? "page" : undefined}
                  aria-disabled={item.disabled}
                  disabled={item.disabled}
                  size="lg"
                  className="group/menu-button relative h-10 rounded-xl border border-transparent px-3 py-2 text-[13px] font-medium tracking-tight text-sidebar-foreground/75 transition-all duration-150 hover:translate-x-0.5 hover:border-sidebar-border/60 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-[active=true]:border-sidebar-border/80 data-[active=true]:bg-sidebar-accent/90 data-[active=true]:text-sidebar-accent-foreground data-[active=true]:font-semibold data-[active=true]:shadow-[0px_1px_2px_0px_rgba(44,54,53,0.04),inset_0px_0px_0px_1px_rgba(255,255,255,0.7)] data-[active=true]:dark:shadow-[0px_1px_2px_0px_rgba(0,0,0,0.2),inset_0px_0px_0px_1px_rgba(255,255,255,0.08)] before:absolute before:left-1 before:top-1/2 before:h-0 before:w-0.5 before:-translate-y-1/2 before:rounded-full before:bg-sidebar-primary before:transition-all before:duration-200 data-[active=true]:before:h-4 data-[active=true]:before:opacity-100 group-data-[collapsible=icon]:h-10 group-data-[collapsible=icon]:w-10 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:mx-auto"
                >
                  <item.icon className="size-4 shrink-0 text-sidebar-foreground/50 transition-colors duration-150 group-data-[active=true]/menu-button:text-sidebar-primary" />
                  <span className="group-data-[collapsible=icon]:hidden">{item.title}</span>
                  {item.shortcutKey && (
                    <span className="ml-auto hidden items-center gap-0.5 group-data-[collapsible=icon]:hidden md:flex">
                      <Kbd className="h-5 min-w-5 rounded-md border border-sidebar-border/40 bg-sidebar-accent/50 px-1 text-[10px] font-medium text-sidebar-foreground/40">
                        <span className="text-[9px]">{mod}</span>
                        {item.shortcutKey}
                      </Kbd>
                    </span>
                  )}
                </SidebarMenuButton>
                {item.badge && (
                  <SidebarMenuBadge className="right-2 text-[10px] font-semibold uppercase tracking-wider text-sidebar-foreground/40">
                    {item.badge}
                  </SidebarMenuBadge>
                )}
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

const MAIN_MENU_ITEMS: MenuItem[] = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
    shortcutKey: "1",
  },
  {
    title: "Explore",
    url: "/voices",
    icon: LayoutGrid,
    shortcutKey: "2",
  },
  {
    title: "Text to speech",
    url: "/text-to-speech",
    icon: AudioLines,
    shortcutKey: "3",
  },
  {
    title: "Voice Cloning",
    url: "/voice-cloning",
    icon: Volume2,
    shortcutKey: "4",
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const clerk = useClerk();
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);

  useEffect(() => { setMounted(true) }, []);

  const otherMenuItems: MenuItem[] = [
    {
      title: "Settings",
      icon: Settings,
      tooltip: "Organization settings",
      onClick: () => clerk.openOrganizationProfile(),
    },
    {
      title: "Help & support",
      url: "mailto:justin_custodio@dlsu.edu.ph",
      icon: Mail,
      badge: "Email",
    },
  ];

  const mod = useModifier();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!(e.metaKey || e.ctrlKey)) return;
      if (e.shiftKey || e.altKey) return;
      const key = e.key;
      if (key === "k") {
        e.preventDefault();
        setCommandOpen(true);
        return;
      }
      const idx = ["1", "2", "3", "4"].indexOf(key);
      if (idx !== -1) {
        e.preventDefault();
        const item = MAIN_MENU_ITEMS[idx];
        if (item.url && !item.disabled) {
          router.push(item.url);
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [router]);

  return (
    <>
      <Sidebar
        collapsible="icon"
        className="border-r border-sidebar-border/70 bg-gradient-to-b from-sidebar/80 to-sidebar"
      >
        <SidebarHeader className="gap-3 px-3 py-4">
          <div className="flex h-10 items-center gap-2.5 group-data-[collapsible=icon]:justify-center">
            <Link
              href="/"
              aria-label="Go to dashboard"
              className="flex min-w-0 flex-1 items-center gap-2.5 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring group-data-[collapsible=icon]:flex-none group-data-[collapsible=icon]:gap-0"
            >
              <Image
                src="/logo.svg"
                alt="Huni"
                width={28}
                height={28}
                className="size-7 shrink-0 rounded-lg shadow-[0px_1px_3px_rgba(15,23,42,0.1)]"
              />
              <span className="truncate text-lg font-extrabold tracking-tight text-foreground transition-opacity duration-200 group-data-[collapsible=icon]:w-0 group-data-[collapsible=icon]:opacity-0">
                huni
              </span>
            </Link>
          </div>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip="Search"
                onClick={() => setCommandOpen(true)}
                size="lg"
                className="h-10 rounded-xl border border-dashed border-sidebar-border/50 bg-sidebar-accent/30 px-3 text-[13px] font-medium text-sidebar-foreground/60 transition-all duration-150 hover:border-sidebar-border/70 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground group-data-[collapsible=icon]:h-10 group-data-[collapsible=icon]:w-10 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:mx-auto"
              >
                <Search className="size-4 shrink-0 text-sidebar-foreground/40" />
                <span className="flex flex-1 items-center justify-between group-data-[collapsible=icon]:hidden">
                  <span>Search</span>
                  <Kbd className="hidden h-5 rounded-md border border-sidebar-border/40 bg-sidebar-accent/50 px-1.5 text-[10px] font-medium text-sidebar-foreground/40 md:inline-flex">
                    <span className="text-[9px]">{mod}</span>K
                  </Kbd>
                </span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent className="py-3">
          <NavSection items={MAIN_MENU_ITEMS} pathname={pathname} />
          <SidebarGroup>
            <SidebarGroupLabel className="text-[11px] font-semibold uppercase tracking-widest text-sidebar-foreground/50 group-data-[collapsible=icon]:sr-only">
              Others
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="gap-0.5">
                <SidebarMenuItem>
                  <SidebarMenuButton
                    tooltip="Toggle theme"
                    size="lg"
                    onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                    className="group/menu-button relative h-10 rounded-xl border border-transparent px-3 py-2 text-[13px] font-medium tracking-tight text-sidebar-foreground/75 transition-all duration-150 hover:translate-x-0.5 hover:border-sidebar-border/60 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:h-10 group-data-[collapsible=icon]:w-10 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:mx-auto"
                  >
                    <Sun className="size-4 shrink-0 scale-100 transition-all dark:scale-0" />
                    <Moon className="absolute size-4 shrink-0 scale-0 transition-all dark:scale-100" />
                    <span className="group-data-[collapsible=icon]:hidden">Appearance</span>
                  </SidebarMenuButton>
                  <SidebarMenuBadge className="right-2 text-[10px] font-semibold uppercase tracking-wider text-sidebar-foreground/40">
                    {mounted ? (resolvedTheme === "dark" ? "Dark" : "Light") : "Light"}
                  </SidebarMenuBadge>
                </SidebarMenuItem>
                {otherMenuItems.map((item) => {
                  const isActive = item.url
                    ? item.url === "/"
                      ? pathname === "/"
                      : pathname.startsWith(item.url)
                    : false;
                  const isExternal = item.url?.startsWith("mailto:");

                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        render={
                          item.url ? (
                            isExternal ? (
                              <a href={item.url} />
                            ) : (
                              <Link href={item.url} />
                            )
                          ) : undefined
                        }
                        isActive={isActive}
                        onClick={item.onClick}
                        tooltip={item.tooltip ?? item.title}
                        aria-current={isActive ? "page" : undefined}
                        aria-disabled={item.disabled}
                        disabled={item.disabled}
                        size="lg"
                        className="group/menu-button relative h-10 rounded-xl border border-transparent px-3 py-2 text-[13px] font-medium tracking-tight text-sidebar-foreground/75 transition-all duration-150 hover:translate-x-0.5 hover:border-sidebar-border/60 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-[active=true]:border-sidebar-border/80 data-[active=true]:bg-sidebar-accent/90 data-[active=true]:text-sidebar-accent-foreground data-[active=true]:font-semibold data-[active=true]:shadow-[0px_1px_2px_0px_rgba(44,54,53,0.04),inset_0px_0px_0px_1px_rgba(255,255,255,0.7)] data-[active=true]:dark:shadow-[0px_1px_2px_0px_rgba(0,0,0,0.2),inset_0px_0px_0px_1px_rgba(255,255,255,0.08)] before:absolute before:left-1 before:top-1/2 before:h-0 before:w-0.5 before:-translate-y-1/2 before:rounded-full before:bg-sidebar-primary before:transition-all before:duration-200 data-[active=true]:before:h-4 data-[active=true]:before:opacity-100 group-data-[collapsible=icon]:h-10 group-data-[collapsible=icon]:w-10 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:mx-auto"
                      >
                        <item.icon className="size-4 shrink-0 text-sidebar-foreground/50 transition-colors duration-150 group-data-[active=true]/menu-button:text-sidebar-primary" />
                        <span className="group-data-[collapsible=icon]:hidden">{item.title}</span>
                        {item.badge && (
                          <SidebarMenuBadge className="right-2 text-[10px] font-semibold uppercase tracking-wider text-sidebar-foreground/40">
                            {item.badge}
                          </SidebarMenuBadge>
                        )}
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <div className="mx-3 border-t border-dashed border-sidebar-border/50" />
        <SidebarFooter className="gap-3 py-3">
          <SidebarMenu className="gap-0.5">
            <SidebarMenuItem>
              <OrganizationSwitcher
                hidePersonal
                fallback={
                  <Skeleton className="h-10 w-full group-data-[collapsible=icon]:size-9 rounded-xl border bg-sidebar-accent/50" />
                }
                appearance={{
                  elements: {
                    rootBox:
                      "w-full! group-data-[collapsible=icon]:w-auto! group-data-[collapsible=icon]:flex! group-data-[collapsible=icon]:justify-center!",
                    organizationSwitcherTrigger:
                      "w-full! justify-between! bg-sidebar-accent/40! border! border-sidebar-border/60! rounded-xl! pl-1.5! pr-2! py-1.5! gap-3! group-data-[collapsible=icon]:w-9! group-data-[collapsible=icon]:h-9! group-data-[collapsible=icon]:p-0! group-data-[collapsible=icon]:justify-center! shadow-[0px_1px_1.5px_0px_rgba(44,54,53,0.03)]! hover:bg-sidebar-accent! transition-colors! duration-150!",
                    organizationPreview: "gap-2!",
                    organizationPreviewAvatarBox: "size-6! rounded-md!",
                    organizationPreviewTextContainer:
                      "text-xs! tracking-tight! font-medium! text-foreground! group-data-[collapsible=icon]:hidden!",
                    organizationPreviewMainIdentifier: "text-[13px]!",
                    organizationSwitcherTriggerIcon:
                      "size-4! text-sidebar-foreground/50! group-data-[collapsible=icon]:hidden!",
                  },
                }}
              />
            </SidebarMenuItem>
            <SidebarMenuItem>
              <UserButton
                showName
                fallback={
                  <Skeleton className="h-10 w-full group-data-[collapsible=icon]:size-9 rounded-xl border border-sidebar-border/50 bg-sidebar-accent/50" />
                }
                appearance={{
                  elements: {
                    rootBox:
                      "w-full! group-data-[collapsible=icon]:w-auto! group-data-[collapsible=icon]:flex! group-data-[collapsible=icon]:justify-center!",
                    userButtonTrigger:
                      "w-full! justify-between! bg-sidebar-accent/30! border! border-sidebar-border/50! rounded-xl! pl-1.5! pr-2! py-1.5! shadow-[0px_1px_1.5px_0px_rgba(44,54,53,0.03)]! hover:bg-sidebar-accent/70! transition-colors! duration-150! group-data-[collapsible=icon]:w-9! group-data-[collapsible=icon]:h-9! group-data-[collapsible=icon]:p-0! group-data-[collapsible=icon]:justify-center! group-data-[collapsible=icon]:after:hidden! [--border:color-mix(in_srgb,transparent,var(--clerk-color-neutral,#000000)_15%)]!",
                    userButtonBox: "flex-row-reverse! gap-2!",
                    userButtonOuterIdentifier:
                      "text-[13px]! tracking-tight! font-medium! text-foreground! pl-0! group-data-[collapsible=icon]:hidden!",
                    userButtonAvatarBox: "size-6!",
                  },
                }}
              />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>

      <CommandDialog open={commandOpen} onOpenChange={setCommandOpen}>
        <Command>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Navigation">
              <CommandItem onSelect={() => { setCommandOpen(false); router.push("/"); }}>
                <Home className="size-4" />
                <span>Dashboard</span>
              </CommandItem>
              <CommandItem onSelect={() => { setCommandOpen(false); router.push("/voices"); }}>
                <LayoutGrid className="size-4" />
                <span>Explore</span>
              </CommandItem>
              <CommandItem onSelect={() => { setCommandOpen(false); router.push("/text-to-speech"); }}>
                <AudioLines className="size-4" />
                <span>Text to speech</span>
              </CommandItem>
              <CommandItem onSelect={() => { setCommandOpen(false); router.push("/voice-cloning"); }}>
                <Volume2 className="size-4" />
                <span>Voice Cloning</span>
              </CommandItem>
            </CommandGroup>
            <CommandGroup heading="Actions">
              <CommandItem onSelect={() => { setCommandOpen(false); clerk.openOrganizationProfile(); }}>
                <Settings className="size-4" />
                <span>Organization settings</span>
              </CommandItem>
              <CommandItem onSelect={() => { setCommandOpen(false); router.push("mailto:justin_custodio@dlsu.edu.ph"); }}>
                <Mail className="size-4" />
                <span>Help & support</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
}
