"use client";

import { MainView } from "@/components/calendar/MainView";
import Header from "@/components/header/Header";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />

      <MainView />
    </div>
  );
}
