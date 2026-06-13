import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { SiteHeader } from '@/components/site-header';
import { SectionCards } from '@/components/section-cards';
import { ChartAreaInteractive } from '@/components/chart-area-interactive';
import { DataTable } from '@/components/data-table';
import { SunIcon, MoonIcon, CaretDownIcon, CheckIcon, UserCircleIcon, CreditCardIcon, BellIcon, SignOutIcon } from '@phosphor-icons/react';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import data from '@/app/dashboard/data.json';

const CURRENCIES = [
  { code: "USD", label: "US Dollar", symbol: "$", badge: "$" },
  { code: "EUR", label: "Euro", symbol: "€", badge: "€" },
  { code: "GBP", label: "Pound Sterling", symbol: "£", badge: "£" },
  { code: "AED", label: "UAE Dirham", symbol: "AED", badge: "coins" },
  { code: "PKR", label: "Pakistani Rupee", symbol: "Rs", badge: "coins" },
  { code: "INR", label: "Indian Rupee", symbol: "₹", badge: "₹" },
];

export default function V2Dashboard() {
  const { subpage } = useParams();
  const [theme, setTheme] = useState('light');
  const [selectedCurrency, setSelectedCurrency] = useState('AED');

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const getPageTitle = (sub) => {
    if (!sub) return "Dashboard";
    return sub.charAt(0).toUpperCase() + sub.slice(1).replace(/-/g, " ");
  };

  return (
    <div className={`v2-workspace min-h-screen w-full transition-colors duration-300 ${theme}`}>
      <TooltipProvider>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <SiteHeader>
              <div className="flex items-center gap-2.5">
                <Button variant="outline" asChild className="cursor-pointer gap-1.5 h-8">
                  <Link to="/dashboard">Go to V1</Link>
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-1.5 cursor-pointer">
                      All Accounts
                      <CaretDownIcon className="size-3.5 opacity-60" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-64 p-2 rounded-2xl" align="end">
                    <DropdownMenuLabel className="px-2.5 py-2 text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
                      Filter Accounts
                    </DropdownMenuLabel>
                    
                    {/* Item 1: All Accounts (Checked) */}
                    <DropdownMenuItem className="flex items-center gap-3 px-2.5 py-2 rounded-xl cursor-pointer bg-accent/60 text-foreground hover:bg-accent/80 focus:bg-accent/80 font-medium">
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-foreground text-background">
                        <CheckIcon className="size-3 stroke-[3]" />
                      </div>
                      <span className="text-sm font-medium">All Accounts</span>
                    </DropdownMenuItem>

                    {/* Item 2: BuyAnyInsurance Ads (Unchecked) */}
                    <DropdownMenuItem className="flex items-center gap-3 px-2.5 py-2 rounded-xl cursor-pointer text-foreground hover:bg-accent/40 focus:bg-accent/40 mt-1">
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-border">
                        {/* Empty box */}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium leading-none">BuyAnyInsurance Ads</span>
                        <span className="text-[11px] text-muted-foreground mt-1.5 font-normal">Meta</span>
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Currency Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-1.5 cursor-pointer">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="size-4 text-muted-foreground">
                        <circle cx="9" cy="12" r="4.5" />
                        <circle cx="15" cy="12" r="4.5" />
                      </svg>
                      {selectedCurrency}
                      <CaretDownIcon className="size-3.5 opacity-60" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-64 p-2 rounded-2xl max-h-80 overflow-y-auto" align="end">
                    <DropdownMenuLabel className="px-2.5 py-2 text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
                      Ad Budget Currency
                    </DropdownMenuLabel>
                    {CURRENCIES.map((curr) => {
                      const isSelected = selectedCurrency === curr.code;
                      return (
                        <DropdownMenuItem
                          key={curr.code}
                          onClick={() => setSelectedCurrency(curr.code)}
                          className={cn(
                            "flex items-center justify-between px-2.5 py-2 rounded-xl cursor-pointer text-foreground mt-0.5",
                            isSelected ? "bg-accent/60 font-semibold" : "hover:bg-accent/40 focus:bg-accent/40"
                          )}
                        >
                          <div className="flex items-center gap-3">
                            <div className={cn(
                              "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-sm font-medium",
                              isSelected ? "bg-background shadow-xs text-foreground" : "bg-muted/10 text-muted-foreground"
                            )}>
                              {curr.badge === "coins" ? (
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="size-3.5 text-muted-foreground">
                                  <circle cx="9" cy="12" r="4.5" />
                                  <circle cx="15" cy="12" r="4.5" />
                                </svg>
                              ) : (
                                <span className="text-[11px] text-muted-foreground/80 font-mono">{curr.badge}</span>
                              )}
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm">{curr.code}</span>
                              <span className="text-[10px] text-muted-foreground font-normal mt-0.5">{curr.label}</span>
                            </div>
                          </div>
                          <span className="text-xs font-mono text-muted-foreground">{curr.symbol}</span>
                        </DropdownMenuItem>
                      );
                    })}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Search Input without Button */}
                <div className="relative w-44 shrink-0">
                  <Input
                    type="search"
                    placeholder="Search..."
                    className="h-8 pl-8 pr-2.5 w-full bg-input/50 border border-transparent focus-visible:border-border cursor-text"
                  />
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground/60"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </div>

                <button
                  onClick={toggleTheme}
                  className="flex items-center justify-center w-9 h-9 rounded-full border border-border bg-card text-card-foreground hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer shrink-0"
                  aria-label="Toggle Theme"
                >
                  {theme === 'light' ? (
                    <MoonIcon className="size-4.5" />
                  ) : (
                    <SunIcon className="size-4.5" />
                  )}
                </button>

                {/* Profile Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full size-9 p-0 cursor-pointer overflow-hidden border border-border">
                      <Avatar className="size-full">
                        <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-52 p-2 rounded-2xl" align="end">
                    <DropdownMenuGroup>
                      <DropdownMenuItem className="flex items-center gap-2 px-2.5 py-2 rounded-xl cursor-pointer">
                        <UserCircleIcon className="size-4" />
                        <span className="text-sm font-medium">Account</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center gap-2 px-2.5 py-2 rounded-xl cursor-pointer">
                        <CreditCardIcon className="size-4" />
                        <span className="text-sm font-medium">Billing</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex items-center gap-2 px-2.5 py-2 rounded-xl cursor-pointer">
                        <BellIcon className="size-4" />
                        <span className="text-sm font-medium">Notifications</span>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator className="my-1 bg-border/50" />
                    <DropdownMenuItem className="flex items-center gap-2 px-2.5 py-2 rounded-xl cursor-pointer text-destructive focus:bg-destructive/10 focus:text-destructive dark:focus:bg-destructive/20">
                      <SignOutIcon className="size-4 text-destructive" />
                      <span className="text-sm font-medium text-destructive">Sign Out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </SiteHeader>
            <div className="flex flex-col gap-6 py-6 overflow-x-hidden">
              {!subpage ? (
                <>
                  <SectionCards />
                  <div className="px-4 lg:px-6">
                    <ChartAreaInteractive />
                  </div>
                  <DataTable data={data} />
                </>
              ) : (
                <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-8">
                  <h2 className="text-2xl font-bold tracking-tight text-foreground mb-2">
                    {getPageTitle(subpage)} Section
                  </h2>
                  <p className="text-sm text-muted-foreground max-w-sm">
                    This is the custom workspace design layout for the {getPageTitle(subpage)} subpage.
                  </p>
                  <div className="text-xs text-zinc-500 font-mono bg-muted px-3 py-1.5 rounded border border-border mt-4 inline-block">
                    Route: /v2/{subpage}
                  </div>
                </div>
              )}
            </div>
          </SidebarInset>
        </SidebarProvider>
      </TooltipProvider>
    </div>
  );
}
