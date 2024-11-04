<script setup lang="ts">
import type { TabsPaneContext } from 'element-plus'
import { h } from 'vue'
import { ElNotification } from 'element-plus'
import 'animate.css'

definePageMeta({
    layout:'login'
})
interface ILoginForm {
    username: string;
    password: string;
}
const activeName = ref<string>('first')
const loginForm = ref<ILoginForm>({
    username: '',
    password: '',
})
const handleClick = (tab: TabsPaneContext, event: Event) => {
    console.log(tab, event)
}
const authStore = useAuthUserStore()
const iniciarSesion = async () => {
    let isLoggedIn = await authStore.login({
        username: loginForm.value.username,
        password: loginForm.value.password
    })
    
    if (isLoggedIn) {
        ElNotification.success({
            title: 'Completado',
            message: 'Sesión iniciada correctamente',
            duration: 0,
            customClass:'bg-green-400'
        })
        await navigateTo('/')
    } else {
        ElNotification.error({
            title: 'Error',
            message: 'Credenciales inválidas',
            duration: 0,
            customClass:'bg-red-400'
        })
    }

}
</script>
<template lang="pug">
.flex-row.flex.mt-6.rounded-md.justify-between.items-center.bg-white.shadow-xl(class="h-[80vh] animate__animated animate__fadeInTopRight")
    .w-auto.h-auto.p-20.items-center.rounded-full(class="animate__animated animate__slideInLeft")
        img(src="/logo.png" width="450px")
    .flex.flex-col.items-center.justify-center.gap-4.bg-green-800.p-4.h-full.w-full.rounded-l-full(class="w-[50%] animate__animated animate__slideInRight")
            ElTabs(v-model="activeName" @tab-click="handleClick").bg-white.p-4.rounded-md.h-96.w-96
                ElTabPane(label="Iniciar sesión" name="first")
                    .flex.justify-center.mt-2.flex-row.items-center.w-full.rounded-md
                    .grid.items-center.gap-7.items-start
                        .flex.items-center.justify-center.flex-col
                            .flex.flex-col.items-start.gap-2.justify-start
                                p.text-md.text-green-800 Usuario
                                ElInput(style="width:240px" v-model="loginForm.username" placeholder="usuario...") 
                        .flex.items-center.justify-center.flex-col
                            .flex.flex-col.items-start.gap-2.justify-start
                                p.text-md.text-green-800 Contraseña
                                ElInput(style="width:240px" show-password placeholder="Introduzca su contraseña" type="password" v-model="loginForm.password") 
                        .w-44.flex.justify-center.w-full
                            ElButton(type="success" @click="iniciarSesion")
                                Icon(name="tabler:door-enter" size="27")
                                span Ingresar
                ElTabPane(label="Registrarse" name="second")
                    .bg-green-100.p-2.rounded-md
                        p.text-md.text-green-800 Para registrarse en el sistema, porfavor póngase en contacto con el administrador para la asignación de credenciales y permisos
                        NuxtLink(to="#") 
                            p.text-green-400 Hágalo aqui
</template>
<style scoped>
.animate__slideInRight {
    animation-duration: 1.5s;
}

.animate__slideInLeft {
    animation-duration: 1.5s;
}

.demo-tabs>.el-tabs__content {
    padding: 32px;
    color: #ed0000;
    font-size: 32px;
    font-weight: 600;
}
</style>