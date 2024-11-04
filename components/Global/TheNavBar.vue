<script setup lang="ts">
const authStore = useAuthUserStore();
const isLoggedInRef = ref<boolean>(authStore.isAuthenticated());
const logout = () => {
  authStore?.logout();
};
const colorMode = useColorMode();
const toggleColorMode = () => {
  colorMode.value = colorMode.value === "dark" ? "light" : "dark";
};
</script>

<template lang="pug">
div.w-full.h-12.p-4.bg-white.py-2.justify-between.flex.sticky
    div.flex.items-center.gap-2
      //- .bg-green-800.items-center.rounded-full.flex
        Icon(name="tabler:galaxy" size="30").text-white
      p.text-xl.font-semibold GACEC

    div.flex-row.flex
      .flex.flex-row.gap-2
        el-dropdown( placement="bottom")
          el-button(text).gap-4.flex.flex-row
            p.text-green-800.text-md Acceso rápido
            Icon(name="tabler:accessible" size="25").text-green-800
          template(#dropdown)
              el-dropdown-menu
                el-dropdown-item(@click="$router.push('/')").gap-2 
                  Icon(name="tabler:home" size="25").text-green-800
                  p Inicio
                
                el-dropdown-item(@click="$router.push('/login')" v-if="!isLoggedInRef").gap-2 
                  Icon(name="tabler:user-check" size="25")
                  p Iniciar sesión 
                
                el-dropdown-item(@click="logout" v-else).gap-2 
                  Icon(name="tabler:user-cancel" size="25").text-green-800
                  p Cerrar sesión 
                  
                el-dropdown-item(@click="$router.push('/actoresLocales/')")
                  Icon(name="tabler:activity" size="25").text-green-800 
                  p Actores en gestión
                
                el-dropdown-item(@click="$router.push('/clasificaciones/')")
                  Icon(name="tabler:album" size="25").text-green-800 
                  p Clasificaciones
                
        
</template>
<style>
body {
  background-color: #fff;
  color: rgba(0, 0, 0, 0.8);
}

.dark-mode body {
  background-color: #091a28;
  color: #ebf4f1;
}
</style>
