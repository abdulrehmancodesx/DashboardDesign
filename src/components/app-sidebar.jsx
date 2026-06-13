import * as React from "react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  SquaresFourIcon,
  MegaphoneIcon,
  ChartLineIcon,
  BellIcon,
  WalletIcon,
  PlugIcon,
  GearIcon,
  CommandIcon,
} from "@phosphor-icons/react"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/v2",
      icon: <SquaresFourIcon />,
    },
    {
      title: "Campaigns",
      url: "/v2/campaigns",
      icon: <MegaphoneIcon />,
    },
    {
      title: "AI Report",
      url: "/v2/ai-report",
      icon: <ChartLineIcon />,
    },
    {
      title: "Alert",
      url: "/v2/alert",
      icon: <BellIcon />,
    },
    {
      title: "Budget Saver",
      url: "/v2/budget-saver",
      icon: <WalletIcon />,
    },
    {
      title: "Integration",
      url: "/v2/integration",
      icon: <PlugIcon />,
    },
    {
      title: "CRM Setting",
      url: "/v2/crm-setting",
      icon: <GearIcon />,
    },
  ],
}

export function AppSidebar({
  ...props
}) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center justify-between gap-2">
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:p-1.5! w-auto flex-1 group-data-[collapsible=icon]:hidden">
              <a href="#">
                <CommandIcon className="size-5!" />
                <span className="text-base font-semibold">HINT</span>
              </a>
            </SidebarMenuButton>
            <SidebarTrigger className="group-data-[collapsible=icon]:mx-auto" />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="justify-center">
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
