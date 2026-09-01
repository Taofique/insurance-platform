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
    route("blogs/:id", "./routes/blogDetail.tsx"),
    route("contact", "./routes/contact.tsx"),
    route("health-insurance", "./routes/healthInsurance.tsx"),
    route("get-a-quote", "./routes/get-quote.tsx"),
  ]),
  route("login", "./routes/login.tsx"),
  route("signup", "./routes/signup.tsx"),

  layout("../layouts/CustomerPortalLayout.tsx", [
    route("customer/dashboard", "./routes/customer/dashboard.tsx"),
  ]),

  layout("../layouts/AgentPortalLayout.tsx", [
    route("agent/dashboard", "./routes/agent/dashboard.tsx"),
  ]),
] satisfies RouteConfig;
