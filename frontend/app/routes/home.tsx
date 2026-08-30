import type { Route } from "./+types/home";

import Hero from "../../components/sections/Hero";
import QuickQuoteBar from "../../components/sections/QuickQuoteBar";
import Categories from "../../components/sections/Categories";
import ClaimCoverage from "../../components/sections/ClaimCoverage";

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
      <Categories />
      <ClaimCoverage />
    </>
  );
}
