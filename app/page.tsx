"use client";

import Header from "@/components/header/Header";
import { MainView } from "@/components/layout/MainView";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <MainView />
    </div>
  );
}
