import { defineNuxtRouteMiddleware, navigateTo } from 'nuxt/app'

export default defineNuxtRouteMiddleware((to, from) => {
    const authStore = useAuthUserStore();
    authStore.initializeAuth(); // Llama al método de inicialización

    if (!authStore.isLoggedIn && to.path !== '/login') {
        return navigateTo('/login');
    }
});