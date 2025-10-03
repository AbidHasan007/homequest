"use client";
import Navbar from '@/components/Navbar';
import { NAVBAR_HEIGHT } from '@/lib/constants';
import Sidebar from "@/components/AppSidebar"
import React, { useEffect, useState } from 'react'
import { useGetAuthUserQuery } from '@/state/api';
import { usePathname, useRouter } from 'next/navigation';

const DashboardLayout=({children}:{children: React.ReactNode})=> {
    const router = useRouter();
    const pathname = usePathname();
    const publicRoutes = ["/landlords/profile/"];
    const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));

    const { data: authUser, isLoading: authLoading} = useGetAuthUserQuery(undefined, {
      skip: isPublicRoute,
    });

    const [isLoading, setIsLoading]= useState(!isPublicRoute);

    useEffect(() => {
      if (isPublicRoute) {
        setIsLoading(false);
        return;
      }

      if (authLoading) {
        return;
      }

      if (!authUser) {
        setIsLoading(false);
        return;
      }

      const userRole = authUser.userRole?.toLowerCase();
      const isLandlordOnTenantRoute =
        userRole === "landlord" && pathname.startsWith("/tenants");
      const isTenantOnLandlordRoute =
        userRole === "tenant" && pathname.startsWith("/landlords");

      if (isLandlordOnTenantRoute || isTenantOnLandlordRoute) {
        router.push(
          userRole === "landlord" ? "/landlords/dashboard" : "/tenants/dashboard",
          { scroll: false }
        );
      } else {
        setIsLoading(false);
      }
    }, [authUser, authLoading, isPublicRoute, pathname, router]);

    if (isPublicRoute) {
      return <>{children}</>; // No Redux for public routes
    }

    if (authLoading || isLoading) return <>Loading...</>; 
    if(!authUser?.userRole) return null;

  return (
  <div className="min-h-screen w-full bg-primary-100">
          <Navbar />
          <div style={ { paddingTop: `${NAVBAR_HEIGHT}px`}}>
             <main className="flex">
               {authUser && <Sidebar userType={authUser.userRole.toLowerCase() as "admin" | "landlord" | "tenant"} />}
                <div className="flex-grow transition-all duration-300">
                  {children}
                </div>
             </main>
          </div>
    </div>
  )
}

export default DashboardLayout;