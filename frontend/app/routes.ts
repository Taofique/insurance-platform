import {
  type RouteConfig,
  index,
  route,
  layout,
} from "@react-router/dev/routes";

export default [
  layout("../layouts/MainLayout.tsx", [
    index("./routes/home.tsx"),
    route("about", "./routes/about.tsx"),
    route("blogs", "./routes/blogs.tsx"),
    route("contact", "./routes/contact.tsx"),
    route("health-insurance", "./routes/healthInsurance.tsx"),
  ]),
] satisfies RouteConfig;
