import {
  type RouteConfig,
  index,
  route,
  layout,
} from "@react-router/dev/routes";

import MainLayout from "../layouts/MainLayout";
import Home from "./routes/home";

export default [
  layout("../layouts/MainLayout.tsx", [
    index("./routes/home.tsx"),
    route("about", "./routes/about.tsx"),
  ]),
] satisfies RouteConfig;
