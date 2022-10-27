import LayoutAdmin from "../layouts/LayoutAdmin";
import LayoutBasic from "../layouts/GeneralLayout";
/* Importamos los pages */
import AdminHome from "../pages/Admin";
import AdminSignIn from "../pages/Admin/SignIn";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound/NotFound";
import Contact from "../pages/Contact";

const routesAdmin = [
  {
    path: "/admin/*",
    layout: LayoutAdmin,
    component: AdminHome,
  },
  {
    path: "/admin/login/*",
    layout: LayoutAdmin,
    component: AdminSignIn,
  },
];

/* Ruta home, notfound */
const routesClient = [
  {
    path: "/",
    layout: LayoutBasic,
    component: Home,
  },
  {
    path: "/contact",
    layout: LayoutBasic,
    component: Contact,
  },
];

const routeNotFound = [
  {
    path: "*",
    layout: LayoutBasic,
    component: NotFound,
  },
];

const routes = [...routesAdmin, ...routesClient, ...routeNotFound];
export default routes;


// import LayoutAdmin from "../layouts/LayoutAdmin";

// import AdminHome from "../pages/Admin";
// import AdminSignIn from "../pages/Admin/signIn";
// import Home from "../pages/home";
// import AdminHome from "../pages/Admin";
// import NotFound from "../pages/NotFound/NotFound";
// import SignIn from "../pages/Admin/SignIn/SignIn";
// import Contact from "../pages/contact"
// import GeneralLayout from "../layouts/GeneralLayout";
// import LayoutAdmin from "../layouts/LayoutAdmin"

// const routesAdmin = [
//     {
//       path: "/admin",
//       layout: LayoutAdmin,
//       component: AdminHome,
//     },
//     {
//       path: "/admin/login/*",
//       layout: LayoutAdmin,
//       component: SignIn,
//     },
// ];

// const routesGeneral = [
//     {
//       path: "/",
//       layout: GeneralLayout,
//       component: Home,
//     },
//     {
//       path: "/admin/contact",
//       layout: GeneralLayout,
//       component: Contact,
//     },
//     {
//       path: "/*",
//       layout: GeneralLayout,
//       component: NotFound,
//     },
// ];

// const projectRoutes = [...routesAdmin, ...routesGeneral];
// export default projectRoutes;