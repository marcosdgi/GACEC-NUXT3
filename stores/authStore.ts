import { defineStore } from 'pinia';

export const useAuthUserStore = defineStore('auth', {
    state: () => ({
        accessToken: localStorage.getItem('access_token') || null,
        refreshToken: localStorage.getItem('refresh_token') || null,
        isLoggedIn: false
    }),
    getters: {
        isLogged: (state) => !!state.accessToken && localStorage.getItem('isLoggeado') === 'true',
    },
    actions: {
        initializeAuth() {
            // Actualiza el estado isLoggedIn con el valor almacenado
            this.isLoggedIn = localStorage.getItem('isLoggeado') === 'true';
            this.accessToken = localStorage.getItem('access_token');
            this.refreshToken = localStorage.getItem('refresh_token');
        },
        async login(loginForm: { username: string; password: string }) {

            try {
                const baseURL = useRuntimeConfig().public.apiURL
                const response = await fetch(`${baseURL}/v1/auth/iniciarSesion/token/`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "Application/json",
                    },
                    body: JSON.stringify(loginForm),
                });
                if (!response.ok) {
                    if (response.status === 401) {
                        return false;
                    }
                    const errorText = await response.text();
                    throw new Error(`Error en el inicio de sesión: ${errorText}`);
                }

                const data = await response.json();
                this.accessToken = data.access;
                this.refreshToken = data.refresh;
                this.isLoggedIn = true
                localStorage.setItem('access_token', this.accessToken ?? '');
                localStorage.setItem('refresh_token', this.refreshToken ?? '');
                localStorage.setItem('isLoggeado', 'true');
                return true
            } catch (error) {
                console.error('Error en el inicio de sesión:', error);
                throw error;
            }
        },
        async refresh() {
            if (!this.refreshToken) return null;
            const baseURL = useRuntimeConfig().public.apiURL
            try {
                const response = await fetch(`${baseURL}/v1/auth/token/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ refresh: this.refreshToken }),
                });

                if (!response.ok) {
                    throw new Error('Error al refrescar el token');
                }

                const data = await response.json();
                this.accessToken = data.access;
                localStorage.setItem('access_token', this.accessToken ?? '');
            } catch (error) {
                console.error('Error al refrescar el token:', error);
                this.logout();
            }
        },
        logout() {
            const router = useRouter()
            this.accessToken = null;
            this.refreshToken = null;
            this.isLoggedIn = false
            localStorage.removeItem('isLoggeado');
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            router.push('/login')
        },
        isAuthenticated() {
            return this.accessToken !== null || this.accessToken !== '';
        },
        checkLoginStatus() {
            if (localStorage.getItem('access_token')) {
                this.accessToken = localStorage.getItem('access_token');
            }
        },
    }
})
