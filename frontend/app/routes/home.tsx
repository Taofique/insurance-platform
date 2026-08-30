import type { Route } from "./+types/home";

import Hero from "../../components/sections/Hero";
import QuickQuoteBar from "../../components/sections/QuickQuoteBar";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Purabi General Insurance" },
    { name: "description", content: "Welcome to Purabi General Insurance!" },
  ];
}

export default function Home() {
  return (
    <>
      <Hero />
      <QuickQuoteBar />
    </>
  );
}
