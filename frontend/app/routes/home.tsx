import type { Route } from "./+types/home";

import Hero from "../../components/sections/Hero";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Purabi General Insurance" },
    { name: "description", content: "Welcome to Purabi General Insurance!" },
  ];
}

export default function Home() {
  return <Hero />;
}
