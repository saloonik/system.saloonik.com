import { AppSidebarFooter } from "./app-sidebar-footer";
import { AppSidebarHeader } from "./app-sidebar-header";
import { ThemeSwitcher } from "@/components/theme-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Briefcase, Calendar, Home, Users, Scissors } from "lucide-react";
import Link from "next/link";

// Menu items.
const items = [
  {
    title: "Strona główna",
    url: "#",
    icon: Home,
  },
  {
    title: "Klienci",
    url: "#",
    icon: Users,
  },
  {
    title: "Pracownicy",
    url: "#",
    icon: Briefcase,
  },
  {
    title: "Usługi",
    url: "#",
    icon: Scissors,
  },
  {
    title: "Rezerwacje",
    url: "#",
    icon: Calendar,
  },
];

export function AppSidebar() {
  return (
    <Sidebar variant="floating" collapsible="icon">
      <AppSidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Aplikacja</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <ThemeSwitcher />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <AppSidebarFooter />
    </Sidebar>
  );
}
