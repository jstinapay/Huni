"use client";

import { usePathname } from "next/navigation";
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
} from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

interface MenuItem {
  title: string;
  url?: string;
  icon: LucideIcon;
  onClick?: () => void;
  disabled?: boolean;
  badge?: string;
  tooltip?: string;
}

interface NavSectionProps {
  label?: string;
  items: MenuItem[];
  pathname: string;
}

function NavSection({ label, items, pathname }: NavSectionProps) {
  return (
    <SidebarGroup>
      {label && (
        <SidebarGroupLabel className="text-[13px] uppercase text-muted-foreground">
          {label}
        </SidebarGroupLabel>
      )}
      <SidebarGroupContent>
        <SidebarMenu className="gap-1">
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
                  className="relative h-9 rounded-lg border border-transparent px-3 py-2 text-[13px] font-medium tracking-tight text-sidebar-foreground/82 hover:border-sidebar-border/70 hover:bg-sidebar-accent/70 hover:text-sidebar-accent-foreground data-[active=true]:border-sidebar-border data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground data-[active=true]:shadow-[0px_1px_1px_0px_rgba(44,54,53,0.03),inset_0px_0px_0px_1px_white] before:absolute before:left-1 before:top-1/2 before:hidden before:h-4 before:w-0.5 before:-translate-y-1/2 before:rounded-full before:bg-sidebar-primary data-[active=true]:before:block [&>svg]:text-sidebar-foreground/65 data-[active=true]:[&>svg]:text-sidebar-primary"
                >
                  <item.icon />
                  <span>{item.title}</span>
                </SidebarMenuButton>
                {item.badge && (
                  <SidebarMenuBadge className="right-2 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
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

export function DashboardSidebar() {
  const pathname = usePathname();
  const clerk = useClerk();

  const mainMenuItems: MenuItem[] = [
    {
      title: "Dashboard",
      url: "/",
      icon: Home,
    },
    {
      title: "Explore",
      url: "/voices",
      icon: LayoutGrid,
    },
    {
      title: "Text to speech",
      url: "/text-to-speech",
      icon: AudioLines,
    },
    {
      title: "Voice Cloning",
      url: "/voice-cloning",
      icon: Volume2,
    },
  ];

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

  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-sidebar-border/80 bg-sidebar"
    >
      <SidebarHeader className="gap-3 px-3 py-4">
        <div className="flex h-9 items-center gap-2 group-data-[collapsible=icon]:justify-center">
          <Link
            href="/"
            aria-label="Go to dashboard"
            className="flex min-w-0 flex-1 items-center gap-2 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring group-data-[collapsible=icon]:flex-none"
          >
            <Image
              src="/logo.svg"
              alt="Huni"
              width={28}
              height={28}
              className="size-7 rounded-lg shadow-[0px_1px_2px_rgba(15,23,42,0.08)]"
            />
            <span className="truncate text-lg font-extrabold tracking-tight text-foreground group-data-[collapsible=icon]:hidden">
              huni 
            </span>
          </Link>
        </div>
        <SidebarMenu>
          <SidebarMenuItem>
            <OrganizationSwitcher
              hidePersonal
              fallback={
                <Skeleton className="h-8.5 w-full group-data-[collapsible=icon]:size-8 rounded-md border bg-white" />
              }
              appearance={{
                elements: {
                  rootBox:
                    "w-full! group-data-[collapsible=icon]:w-auto! group-data-[collapsible=icon]:flex! group-data-[collapsible=icon]:justify-center!",
                  organizationSwitcherTrigger:
                    "w-full! justify-between! bg-background! border! border-sidebar-border! rounded-lg! pl-1! pr-2! py-1! gap-3! group-data-[collapsible=icon]:w-auto! group-data-[collapsible=icon]:p-1! shadow-[0px_1px_1.5px_0px_rgba(44,54,53,0.03)]! hover:bg-sidebar-accent/60!",
                  organizationPreview: "gap-2!",
                  organizationPreviewAvatarBox: "size-6! rounded-sm!",
                  organizationPreviewTextContainer:
                    "text-xs! tracking-tight! font-medium! text-foreground! group-data-[collapsible=icon]:hidden!",
                  organizationPreviewMainIdentifier: "text-[13px]!",
                  organizationSwitcherTriggerIcon:
                    "size-4! text-sidebar-foreground! group-data-[collapsible=icon]:hidden!",
                },
              }}
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <div className="border-b border-dashed border-sidebar-border" />
      <SidebarContent className="py-2">
        <NavSection items={mainMenuItems} pathname={pathname} />
        <NavSection
          label="Support"
          items={otherMenuItems}
          pathname={pathname}
        />
      </SidebarContent>
      <div className="border-t border-dashed border-sidebar-border" />
      <SidebarFooter className="gap-3 py-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <UserButton
              showName
              fallback={
                <Skeleton className="h-8.5 w-full group-data-[collapsible=icon]:size-8 rounded-md border border-border bg-white" />
              }
              appearance={{
                elements: {
                  rootBox:
                    "w-full! group-data-[collapsible=icon]:w-auto! group-data-[collapsible=icon]:flex! group-data-[collapsible=icon]:justify-center!",
                  userButtonTrigger:
                    "w-full! justify-between! bg-background! border! border-sidebar-border! rounded-lg! pl-1! pr-2! py-1! shadow-[0px_1px_1.5px_0px_rgba(44,54,53,0.03)]! hover:bg-sidebar-accent/60! group-data-[collapsible=icon]:w-auto! group-data-[collapsible=icon]:p-1! group-data-[collapsible=icon]:after:hidden! [--border:color-mix(in_srgb,transparent,var(--clerk-color-neutral,#000000)_15%)]!",
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
  );
}
