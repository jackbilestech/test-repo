/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import AboutMe from "views/AboutJack.jsx";
import List from "views/GitHubList.jsx";

const dashboardRoutes = [
  {
    path: "/jack",
    name: "About Jack",
    icon: "pe-7s-user",
    component: AboutMe,
    layout: "/admin"
  },
  {
    path: "/repos",
    name: "Repos",
    icon: "pe-7s-user",
    component: List,
    layout: "/admin"
  }
];

export default dashboardRoutes;
