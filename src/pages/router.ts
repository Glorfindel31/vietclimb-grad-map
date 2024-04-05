import {createMemoryHistory, createRouter, useRouter} from 'vue-router';
import Home from '@/pages/Home.vue';
import About from '@/pages/About.vue';
import Map from '@/pages/Map.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/about',
        name: 'About',
        component: About,
    },
    {
        path: '/map',
        name: 'Map',
        component: Map,
    },
];

const router = createRouter({
    history: createMemoryHistory(),
    routes,
});

export function navigateTo(routeName: string) {
    const router = useRouter();
    router.push({name: routeName});
}

export default router;
