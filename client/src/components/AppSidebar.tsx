"use client"
import { usePathname } from 'next/navigation'
import React, { useMemo } from 'react'
import { BadgeAlert, Building, FileText, Heart, Home, LayoutDashboard, Menu, Settings, X, User, Shield, AlertTriangle, CheckCircle, Users, BarChart } from 'lucide-react';
import { NAVBAR_HEIGHT } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar';
import Link from 'next/link';

interface AppSidebarProps {
    userType: "landlord" | "tenant" | "admin";
}

interface NavLink {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    href: string;
    disabled?: boolean;
}

const AppSidebar = React.memo(({userType}: AppSidebarProps) => {
    const pathname = usePathname();
    const {toggleSidebar, open}= useSidebar();
    
    const navLinks = useMemo(() => {
        if (userType === "admin") {
            return [
                {icon: LayoutDashboard, label: "Dashboard", href: "/admins/dashboard" },
                {icon: CheckCircle, label: "Verification", href: "/admins/verification" },
                {icon: Shield, label: "Safety", href: "/admins/safety" },
                {icon: Users, label: "Users", href: "/admins/users" },
                {icon: Building, label: "Properties", href: "/admins/properties", disabled: true },
                {icon: BarChart, label: "Reports", href: "/admins/reports", disabled: true },
            ];
        } else if (userType === "landlord") {
            return [ 
                {icon: LayoutDashboard, label: "Dashboard", href: "/landlords/dashboard" },
                {icon: Building, label: "Properties", href: "/landlords/properties" },
                {icon: FileText, label: "Applications", href: "/landlords/applications" },
                {icon: AlertTriangle, label: "Termination Requests", href: "/landlords/termination-requests" },
                {icon: BadgeAlert, label: "Verify", href: "/landlords/verify" },
                {icon: User, label: "Profile", href: "/landlords/profile" },
                {icon: Settings, label: "Settings", href: "/landlords/settings" },
            ];
        } else {
            return [ 
                {icon: LayoutDashboard, label: "Dashboard", href: "/tenants/dashboard" },
                {icon: Heart, label: "Favorites", href: "/tenants/favorites" },
                {icon: FileText, label: "Applications", href: "/tenants/applications" },
                {icon: Home, label: "Residences", href: "/tenants/residences" },
                {icon: AlertTriangle, label: "Termination Requests", href: "/tenants/termination-requests" },
                {icon: Shield, label: "Safety Feedback", href: "/tenants/safety-feedback" },
                {icon: User, label: "Profile", href: "/tenants/profile" },
                {icon: Settings, label: "Settings", href: "/tenants/settings" },
            ];
        }
    }, [userType]);

  return (
    <Sidebar
    collapsible="icon"
    className="fixed left-0  bg-white shadow-lg"
    style={{top: `${NAVBAR_HEIGHT}px`,
        height: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
            }}    
   >
    <SidebarHeader>
        <SidebarMenu>
            <SidebarMenuItem>
                <div className={cn(
                    "flex min-h-[56px] w-full items-center pt-3 mb-3",
                    open ? "justify-between px-6" : "justify-center"
                )}>
                   {
                    open ? (
                        <>
                        <h1 className="text-xl font-bold text-gray-800">
                            {userType === "admin" ? "Admin Panel" : userType === "landlord" ? "Landlord Panel" : "Tenant Panel"}
                        </h1>
                        <button className="hover:bg-gray-100 p-2 rounded-md"
                        onClick={()=>toggleSidebar()}>
                            <X className="h-6 w-6 text-gray-600"/>

                        </button>
                        </>
                    ): (
                        <button className="hover:bg-gray-100 p-2 rounded-md"
                        onClick={()=>toggleSidebar()}>
                            <Menu className="h-6 w-6 text-gray-600"/>

                        </button>
                    )
                   }
                </div>
            </SidebarMenuItem>
        </SidebarMenu>
    </SidebarHeader>
    <SidebarContent>
        <SidebarMenu>
            {
                navLinks.map((link)=>{
                    const isActive = pathname === link.href;
                    const isDisabled = link.disabled;
                    
                    return (<SidebarMenuItem key={link.href}>
                        <SidebarMenuButton
                        asChild={!isDisabled}
                    className={cn(
                        "flex items-center px-7 py-7",
                        isActive ? "bg-gray-100" : "text-gray-600 hover:bg-gray-100",
                        isDisabled ? "opacity-50 cursor-not-allowed hover:bg-transparent" : "",
                        open ? "text-teal-600" : "ml-[5px]"
                    )}
                        >
                        {isDisabled ? (
                            <div className="w-full flex items-center gap-3">
                                <link.icon 
                                className="h-6 w-6 text-gray-400"/>
                                <span className="font-medium text-gray-400">
                                    {link.label}
                                </span>
                                {open && (
                                    <span className="text-xs text-gray-400 ml-auto">
                                        Coming Soon
                                    </span>
                                )}
                            </div>
                        ) : (
                            <Link 
                                href={link.href}
                                className="w-full" 
                                scroll={false}
                                prefetch={false}
                            >
                                <div className="flex items-center gap-3">
                                    <link.icon 
                                    className={`h-6 w-6 ${
                                        isActive ? "text-teal-600" : "text-gray-600"
                                    }`}/>
                                    <span className={`font-medium ${
                                        isActive ? "text-teal-600" : "text-gray-600"
                                    }`}
                                    >{link.label}</span>
                                </div>
                            </Link>
                        )}
                        </SidebarMenuButton>
                    </SidebarMenuItem>)
                })
            }
        </SidebarMenu>
    </SidebarContent>
   </Sidebar>
  )
});

AppSidebar.displayName = 'AppSidebar';

export default AppSidebar