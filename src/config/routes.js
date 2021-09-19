// Layout
import LayoutAdmin from "../layouts/LayoutAdmin";
import LayoutBasic from "../layouts/LayoutBasic";

// Admin Pages
import AdminHome from "../pages/admin";
import AdminSingIn from "../pages/admin/SingIn";
import AdminUsers from "../pages/admin/Users";
import MenuWeb from "../pages/admin/MenuWeb";
import AdminCourses from "../pages/admin/Courses";
import AdminBlog from "../pages/admin/Blog";
import Blog from "../pages/Blog";

// Pages
import Home from "../pages/Home";
import Contact from "../pages/Contact";
import Courses from "../pages/Courses";

// Others
import Error from "../pages/Error404";

// Array of objects
const routes = [
  {
    path: "/admin",
    component: LayoutAdmin,
    exact: false,
    routes: [
      {
        path: "/admin",
        exact: true,
        component: AdminHome,
      },
      {
        path: "/admin/login",
        exact: true,
        component: AdminSingIn,
      },
      {
        path: "/admin/users",
        exact: true,
        component: AdminUsers,
      },
      {
        path: "/admin/menu",
        exact: true,
        component: MenuWeb,
      },
      {
        path: "/admin/courses",
        exact: true,
        component: AdminCourses,
      },
      {
        path: "/admin/blog",
        exact: true,
        component: AdminBlog,
      },
      {
        component: Error,
      },
    ],
  },
  {
    path: "/",
    component: LayoutBasic,
    exact: false,
    routes: [
      {
        path: "/",
        exact: true,
        component: Home,
      },
      {
        path: "/contact",
        exact: true,
        component: Contact,
      },
      {
        path: "/courses",
        exact: true,
        component: Courses,
      },
      {
        path: "/blog",
        exact: true,
        component: Blog,
      },
      {
        path: "/blog/:url",
        exact: true,
        component: Blog,
      },
      {
        component: Error,
      },
    ],
  },
];

export default routes;
