"use client";
import { Button } from "mainstack-library";

export default function Lib() {
  return (
    <div className="h-screen w-full flex items-center justify-center gap-2">
      <div className="text-blue-500">header</div>
      <Button variant="primary" onClick={() => alert("clicked")}>
        test
      </Button>
    </div>
  );
}
