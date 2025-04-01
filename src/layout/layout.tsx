"use client";
import React, { ReactNode, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Logo,
  HomeIcon,
  AnalyticsIcon,
  RevenueIcon,
  CRMIcon,
  AppsIcon,
  NotificationIcon,
  ChatIcon,
  MenuIcon,
} from "mainstack-library";
import { useGetUserQuery } from "@/redux/user/user.service";
import { IoLogOutOutline, IoSettingsOutline } from "react-icons/io5";
import { MdOutlineCardGiftcard, MdOutlineSwitchAccount } from "react-icons/md";
import { GoBug } from "react-icons/go";
import { GrAppsRounded } from "react-icons/gr";
import { PiNoteLight } from "react-icons/pi";

interface LayoutProps {
  children: ReactNode;
}

const Links = [
  { href: "/", label: "Home", Icon: HomeIcon, type: "link", disabled: true },
  {
    href: "/analytics",
    label: "Analytics",
    Icon: AnalyticsIcon,
    type: "link",
    disabled: true,
  },
  {
    href: "/revenue",
    label: "Revenue",
    Icon: RevenueIcon,
    type: "link",
    disabled: false,
  },
  { href: "/crm", label: "CRM", Icon: CRMIcon, type: "link", disabled: true },
  {
    href: "/apps",
    label: "Apps",
    Icon: AppsIcon,
    type: "dialogue",
    disabled: true,
  },
];

const Navigation = () => {
  const pathname = usePathname();

  return (
    <nav className="">
      <div className="flex items-center gap-2">
        {Links.map(({ Icon, disabled, ...link }, index) => {
          const isActive = pathname === link.href;

          return (
            <Link
              key={index}
              href={disabled ? "#" : link.href}
              className={`flex text-base gap-1 py-1 px-4 rounded-full transition-colors duration-200 
          ${isActive ? "text-white bg-black" : "bg-white text-[#56616B]"}
          ${
            disabled
              ? "opacity-50 cursor-not-allowed hover:bg-white! hover:text-[#56616B]!"
              : "hover:text-white! hover:bg-black!"
          }`}
              onClick={(e) => disabled && e.preventDefault()}
            >
              <Icon className="w-5 h-5 text-current group-hover:text-white" />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

const DashboardLayout: React.FC<LayoutProps> = ({ children }) => {
  const { data } = useGetUserQuery(null);

  const [isOpen, setOpen] = useState(false);
  function toggleOpen() {
    setOpen((prev) => !prev);
  }

  return (
    <div className="layout p-2">
      <header className="bg-white py-2 px-4 rounded-full shadow-lg">
        <div className="flex justify-between">
          <div>
            <Logo />
          </div>
          <Navigation />
          <div className="flex items-center gap-4">
            <NotificationIcon />
            <ChatIcon />
            <div className="flex items-center gap-2 bg-[#EFF1F6] rounded-full p-1">
              <div className="w-6 h-6 flex items-center justify-center rounded-full text-white bg-gradient-to-r from-[#5C6670] to-[#131316] text-sm">
                {data
                  ? `${data.first_name[0].toUpperCase()}${data.last_name[0].toUpperCase()}`
                  : null}
              </div>
              <div
                className="pr-2 relative cursor-pointer"
                onClick={toggleOpen}
              >
                <MenuIcon />
                {isOpen && (
                  <div className="absolute top-8 -right-4 mt-2 border border-[#D0D5DD] bg-[#FFF] shadow-md! rounded-xl z-50 transition duration-200 ease-out p-4 w-2xs space-y-6">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 flex items-center justify-center rounded-full text-white bg-gradient-to-r from-[#5C6670] to-[#131316] text-sm">
                        {data
                          ? `${data.first_name[0].toUpperCase()}${data.last_name[0].toUpperCase()}`
                          : null}
                      </div>
                      <div>
                        <p className="text-sm font-bold">
                          {data ? `${data.first_name}${data.last_name}` : null}
                        </p>
                        <p className="text-xs">{data?.email}</p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="flex items-center gap-2 py-1">
                        <IoSettingsOutline className="text-sm" />
                        <p className="text-sm font-semibold">Settings</p>
                      </div>
                      <div className="flex items-center gap-2 py-1">
                        <PiNoteLight className="text-sm" />
                        <p className="text-sm font-semibold">
                          Purchase History
                        </p>
                      </div>
                      <div className="flex items-center gap-2 py-1">
                        <MdOutlineCardGiftcard className="text-sm" />
                        <p className="text-sm font-semibold">Refer and Earn</p>
                      </div>
                      <div className="flex items-center gap-2 py-1">
                        <GrAppsRounded className="text-sm" />
                        <p className="text-sm font-semibold">Integrations</p>
                      </div>
                      <div className="flex items-center gap-2 py-1">
                        <GoBug className="text-sm" />
                        <p className="text-sm font-semibold">Report Bug</p>
                      </div>
                      <div className="flex items-center gap-2 py-1">
                        <MdOutlineSwitchAccount className="text-sm" />
                        <p className="text-sm font-semibold">Switch Account</p>
                      </div>
                      <div className="flex items-center gap-2 py-1">
                        <IoLogOutOutline className="text-sm" />
                        <p className="text-sm font-semibold">Sign Out</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="main">{children}</main>
    </div>
  );
};

export default DashboardLayout;
