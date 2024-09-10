import { useState, PropsWithChildren, ReactNode, useEffect } from "react"
import ApplicationLogo from "@/Components/ApplicationLogo"
import Dropdown from "@/Components/Dropdown"
import NavLink from "@/Components/NavLink"
import ResponsiveNavLink from "@/Components/ResponsiveNavLink"
import { Link, usePage } from "@inertiajs/react"
import { User } from "@/types"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu"
import { Bell } from "lucide-react"
import NotificationButton from "@/Components/NotificationButton"
import echo from "@/echo"

interface Notification {
    id: string;
    ticket_id: number;
    nomor_ticket: string;
    type: string
}

export default function Authenticated({ user, header, children }: PropsWithChildren<{ user: User; header?: ReactNode }>) {
  const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false)
  const { flash, auth }: any = usePage().props

  useEffect(() => {
    if (flash.success) {
      toast.success(flash.success)
    }
    if (flash.error) {
      toast.error(flash.error)
    }
  }, [flash])

  return (

    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <nav className="bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="shrink-0 flex items-center">
                <Link href="/">
                  <img src="/img/logo.png" alt="Logo" className="block h-9 w-auto" />
                </Link>
              </div>

              <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                <NavLink href={route("dashboard")} active={route().current("dashboard")}>
                  Dashboard
                </NavLink>
              </div>

              {user.role_id === 1 && (
                <>
                <div className="hidden sm:flex sm:items-center sm:ms-6">
                  <div className="ms-3 relative">
                    <Dropdown>
                      <Dropdown.Trigger>
                        <span className="inline-flex rounded-md">
                          <button type="button" className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150">
                            Level Jabatan
                            <svg className="ms-2 -me-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </span>
                      </Dropdown.Trigger>

                      <Dropdown.Content>
                        <Dropdown.Link href={route("skala_level.index")}>Skala Level</Dropdown.Link>
                        <Dropdown.Link href={route("master_jabatan.index")}>Jabatan</Dropdown.Link>
                      </Dropdown.Content>
                    </Dropdown>
                  </div>
                </div>

                <div className="hidden sm:flex sm:items-center sm:ms-6">
                  <div className="ms-3 relative">
                    <Dropdown>
                      <Dropdown.Trigger>
                        <span className="inline-flex rounded-md">
                          <button type="button" className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150">
                            Akun

                            <svg className="ms-2 -me-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </span>
                      </Dropdown.Trigger>

                      <Dropdown.Content>
                        <Dropdown.Link href={route("akun_karyawan.index")}>Akun Karyawan</Dropdown.Link>
                        <Dropdown.Link href={route("teknisi.index")}>Akun Teknisi</Dropdown.Link>
                      </Dropdown.Content>
                    </Dropdown>
                  </div>
                </div>

                <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                  <NavLink href={route("case_category.index")} active={route().current("case_category.*")}>
                    Kategori
                  </NavLink>
                </div>

                <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                  <NavLink href={route("ticket.open")} active={route().current("ticket.open")}>
                    Laporan
                  </NavLink>
                </div>

                <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                <DropdownMenu>
                  <DropdownMenuTrigger>Monitoring Ticket</DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <Link href={route("ticket.new")}>Tiket Baru</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href={route("ticket.proses")}>Tiket In Progress</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href={route("ticket.solved")}>Tiket Resolved</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                </div>
                </>
              )}

              {user.role_id === 2 && (
                <>
                <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                  <NavLink href={route("pelaporan")} active={route().current("pelaporan")}>
                    Pelaporan
                  </NavLink>
                </div>

                <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                  <NavLink href={route("ticket.monitor")} active={route().current("ticket.monitor")}>
                  Monitoring Ticket
                  </NavLink>
                </div>
                </>
              )}

              {user.role_id === 3 && (
                <>
                <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                <DropdownMenu>
                  <DropdownMenuTrigger>Monitoring Ticket</DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <Link href={route("ticketMasuk")}>Tiket Baru</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href={route("ticketProgress")}>Tiket In Progress</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href={route("ticketSelesai")}>Tiket Resolved</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                </div>
                </>
              )}

            </div>

            <div className="hidden sm:flex sm:items-center sm:ms-6">
            <div className="relative">
                <NotificationButton userId={auth.user.id} />
            </div>
              <div className="ms-3 relative">
                <Dropdown>
                  <Dropdown.Trigger>
                    <span className="inline-flex rounded-md">
                      <button type="button" className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150">
                        {user.name}

                        <svg className="ms-2 -me-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </span>
                  </Dropdown.Trigger>

                  <Dropdown.Content>
                    <Dropdown.Link href={route("profile.edit")}>Profile</Dropdown.Link>
                    <Dropdown.Link href={route("logout")} method="post" as="button">
                      Log Out
                    </Dropdown.Link>
                  </Dropdown.Content>
                </Dropdown>
              </div>
            </div>

            <div className="-me-2 flex items-center sm:hidden">
              <button onClick={() => setShowingNavigationDropdown((previousState) => !previousState)} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-900 focus:text-gray-500 dark:focus:text-gray-400 transition duration-150 ease-in-out">
                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path className={!showingNavigationDropdown ? "inline-flex" : "hidden"} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  <path className={showingNavigationDropdown ? "inline-flex" : "hidden"} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className={(showingNavigationDropdown ? "block" : "hidden") + " sm:hidden"}>
          <div className="pt-2 pb-3 space-y-1">
            <ResponsiveNavLink href={route("dashboard")} active={route().current("dashboard")}>
              Dashboard
            </ResponsiveNavLink>
          </div>

          <div className="pt-4 pb-1 border-t border-gray-200 dark:border-gray-600">
            <div className="px-4">
              <div className="font-medium text-base text-gray-800 dark:text-gray-200">{user.name}</div>
              <div className="font-medium text-sm text-gray-500">{user.email}</div>
            </div>

            <div className="mt-3 space-y-1">
              <ResponsiveNavLink href={route("profile.edit")}>Profile</ResponsiveNavLink>
              <ResponsiveNavLink method="post" href={route("logout")} as="button">
                Log Out
              </ResponsiveNavLink>
            </div>
          </div>
        </div>
      </nav>

      {header && (
        <header className="bg-white dark:bg-gray-800 shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
        </header>
      )}

      <main>
        <ToastContainer autoClose={3000} position="top-right" />
        {children}
      </main>
    </div>
  )
}
