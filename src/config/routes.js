import LayoutAdmin from "../layouts/LayoutAdmin";
import GeneralLayout from "../layouts/GeneralLayout";
/* Importamos los pages */
import AdminHome from "../pages/Admin";
import AdminSignIn from "../pages/Admin/SignIn";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound/NotFound";
import ListParkingLots from "../pages/Admin/ParkingLots/ListParkingLots";
import ListSupervisors from "../pages/Admin/Supervisors/ListSupervisors";

const routesAdmin = [
  {
    path: "/home/",
    layout: LayoutAdmin,
    component: AdminHome,
  },
  {
    path: "/login/*",
    layout: LayoutAdmin,
    component: AdminSignIn,
  },
  {
    path: "/ParkingLots",
    layout: GeneralLayout,
    component: ListParkingLots,
  },
  {
    path: "/Supervisors",
    layout: GeneralLayout,
    component: ListSupervisors,
  },
];

/* Ruta home, notfound */
const routesClient = [
  {
    path: "/",
    layout: GeneralLayout,
    component: Home,
  },
];

const routeNotFound = [
  {
    path: "*",
    layout: GeneralLayout,
    component: NotFound,
  },
];

const routes = [...routesAdmin, ...routesClient, ...routeNotFound];
export default routes;