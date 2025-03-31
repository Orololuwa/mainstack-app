"use client";
import React, { ReactNode } from "react";
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
                OJ
              </div>
              <MenuIcon />
            </div>
          </div>
        </div>
      </header>

      <main className="main">{children}</main>
    </div>
  );
};

export default DashboardLayout;
