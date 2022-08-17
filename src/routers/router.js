// import Vue from 'vue'
// import VueRouter from 'vue-router'
import {createRouter, createWebHistory} from 'vue-router'
import EmptyPage from '../views/EmptyPage.vue'
import EmployeePage from '../views/EmployeePage.vue'
import Home from '../views/HomePage.vue'

const routes = [
    {path: '/', component: Home},
    {path: '/employeepage', component: EmployeePage},
    {path: '/emptypage', component: EmptyPage}
]

const router = createRouter( {
    history: createWebHistory(),
    routes,
})
 
export default router