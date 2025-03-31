"use client";
import { Button, Logo } from "mainstack-library";

export default function Lib() {
  return (
    <div className="h-screen w-full flex items-center justify-center gap-2">
      <Logo />
      <div className="text-blue-500">header</div>
      <Button variant="secondary" size="sm" onClick={() => alert("clicked")}>
        test
      </Button>
    </div>
  );
}
