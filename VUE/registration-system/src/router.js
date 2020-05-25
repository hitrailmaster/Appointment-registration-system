


import Vue from 'vue';
import Router from 'vue-router';
import LoginPage from './views/LoginPage';
import HomePage from './views/HomePage';


import OnlineAppointmentPage from './views/OnlineAppointmentPage';
import PersonListPage from './views/PersonListPage';
import AddPersonPage from './views/AddPersonPage';
import AlreadyAppointmentPage from './views/AlreadyAppointmentPage';
import AppointmentListPage from './views/AppointmentListPage';
import ArrangePage from './views/ArrangePage';
import OfficeManagePage from './views/OfficeManagePage';
import ArrangeManagePage from './views/ArrangeManagePage';
import ModifyArrange from './views/ModifyArrange';
import AddTemporaryArrangePage from './views/AddTemporaryArrangePage';
import AppointmentAllListPage from './views/AppointmentAllListPage';

Vue.use(Router);

export default new Router({
  routes: [{
    path: '/',
    name: 'LoginPage',
    component: LoginPage
  }, {
    path: "/HomePage",
    name: "HomePage",
    component: HomePage,
    children: [
      {
        path: "OnlineAppointmentPage",
        name: "OnlineAppointmentPage",
        component: OnlineAppointmentPage
      },
      {
        path: "PersonListPage",
        name: "PersonListPage",
        component: PersonListPage
      },
      {
        path: "AddPersonPage",
        name: "AddPersonPage",
        component: AddPersonPage
      },
      {
        path: "AlreadyAppointmentPage",
        name: "AlreadyAppointmentPage",
        component: AlreadyAppointmentPage
      },
      {
        path: "AppointmentListPage",
        name: "AppointmentListPage",
        component: AppointmentListPage
      },
      {
        path: "ArrangePage",
        name: "ArrangePage",
        component: ArrangePage
      },
      {
        path: "OfficeManagePage",
        name: "OfficeManagePage",
        component: OfficeManagePage
      },
      {
        path: "ArrangeManagePage",
        name: "ArrangeManagePage",
        component: ArrangeManagePage
      },
      {
        path: "ModifyArrange",
        name: "ModifyArrange",
        component: ModifyArrange
      },
      {
        path: "AddTemporaryArrangePage",
        name: "AddTemporaryArrangePage",
        component: AddTemporaryArrangePage
      },
      {
        path: "AppointmentAllListPage",
        name: "AppointmentAllListPage",
        component: AppointmentAllListPage
      }
    ]
  }]
})