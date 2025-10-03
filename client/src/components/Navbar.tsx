"use client";
import { NAVBAR_HEIGHT } from '@/lib/constants'
import Image from 'next/image'
import Link from 'next/link'
import React, { use } from 'react'
import { Button } from './ui/button'
import { useGetAuthUserQuery } from '@/state/api'
import { usePathname, useRouter } from 'next/navigation'
import { signOut } from 'aws-amplify/auth'
import { MessageCircle, Plus, Search } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { SidebarTrigger } from '@/components/ui/sidebar'
import NotificationCenter from './NotificationCenter'

const Navbar = () => {
  const { data: authUser} = useGetAuthUserQuery();
  const router = useRouter();
  const pathname = usePathname();
  const isDashboardPage = pathname.includes("/landlords") || pathname.includes("/tenants") || pathname.includes("/admins");
  const handleSignOut = async () =>{
     await signOut();
     window.location.href = "/";
  }
  return (
    <div className="fixed top-0 left-0 w-full z-50 shadow-xl" style={{height: `${NAVBAR_HEIGHT}px`}}
    >
        <div className="flex justify-between items-center w-full py-3 px-8 bg-[#FFFFFF] text-teal-500 dark:bg-gray-800 dark:text-white">
           <div className="flex items-center gap-4 md:gap-6">
            { isDashboardPage && (
              <div className="md:hidden">
                <SidebarTrigger/>
              </div>
            )}
            <Link href="/"
             className="cursor-pointer hover:text-teal-400"
             scroll={false}
             >
              <div className="flex items-center gap-3">
                 <div className="flex md:text-xl  font-bold">
                   Home Quest
                 </div>
              </div>
            </Link>
            {/* console.log({ isDashboardPage, authUser }); */}

            {isDashboardPage && authUser && (
              
              <Button
               variant="secondary"
               className="md:ml-4 bg-primary-50 text-primary-700 hover:bg-teal-500 hover:text-primary-50"
                onClick={() => {
                      router.push(
                       authUser.userRole?.toLowerCase() === "landlord"
                       ? "/landlords/newproperty"
                       : "/search"
                   );
            }}
         >
                {
                  authUser?.userRole?.toLowerCase() === "landlord"
                  ? (
                    <>
        
                        <Plus className="h-4 w-4"/>
                        <span className="hidden md:block ml-2">Add Property</span>
                      
                     
                    </>
                  ) : (
                    <>
                    <Search className="h-4 w-4"/>
                    <span className="hidden md:block ml-2">Search Property</span>
                    </>
                  )
                }
              </Button>
            )}
           </div>
           <div className="flex items-center gap-4 md:gap-6">
             {authUser? (
              <>
                
                <div className="relative md:block">
                  <NotificationCenter />
                </div>
                <DropdownMenu>
                   <DropdownMenuTrigger className="flex items-center gap-2 focus:outline-none" >
                    <p className="text-primary-700 hidden md:block">
                        {authUser.userInfo?.name}
                     </p>
                     <Avatar>
                       <AvatarImage src={authUser.userInfo?.image}/>
                       <AvatarFallback className="bg-teal-600 text-white text-xl font-bold" >
                        {authUser.userRole?.[0].toUpperCase()}
                       </AvatarFallback>
                     </Avatar>
                   </DropdownMenuTrigger>
                   <DropdownMenuContent className="bg-white text-primary-700">
                        <DropdownMenuItem
                         className="cursor-pointer hover:!bg-primary-700 hover:!text-white"
                         onClick={()=>
                          router.push(
                            authUser.userRole?.toLowerCase() === "landlord"
                            ? "/landlords/dashboard"
                            : authUser.userRole?.toLowerCase() === "admin"
                            ? "/admins/dashboard"
                            : "/tenants/dashboard",
                            {scroll: false}
                          )
                         }
                         >
                          Go Dashboard
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className=" bg-primary-200"/>
                        <DropdownMenuItem
                         className="cursor-pointer hover:!bg-primary-700 hover:!text-white"
                         onClick={()=>
                          router.push(
                            `/${authUser.userRole?.toLowerCase()}s/settings`,
                            {scroll: false}
                          )
                         }
                         >
                          Settings
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className=" bg-primary-200"/>
                        <DropdownMenuItem
                         className="cursor-pointer hover:!bg-primary-700 hover:!text-white"
                         onClick={handleSignOut}
                         >
                          Sign Out
                        </DropdownMenuItem>
                        
                   </DropdownMenuContent>
                </DropdownMenu>
              </>
             ):(
             <>
             <Link href="/signin">
              <Button
              variant="outline"
              className="text-base font-bold text-teal-500 bg-transparent border-teal-500 hover:bg-teal-500 hover:text-white"
              >Sign in</Button>
             </Link>
              <Link href="/signup">
              <Button
              variant="outline"
              className="text-base font-bold text-white bg-teal-500 border-teal-500 hover:bg-white hover:text-teal-500"
              >Sign up</Button>
             </Link>
             </>
             )}
           </div>
        </div>
    </div>
  )
}

export default Navbar