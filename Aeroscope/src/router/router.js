import { createRouter, createWebHistory } from "vue-router";
import Home from "@/pages/Home.vue";
import InfoAvion from "@/pages/InfoAvion.vue";

const routes = [
    {path: '/', name: 'Home', component: Home},
    {path: '/info/:code', name: 'InfoAvion', component: InfoAvion},

    
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;