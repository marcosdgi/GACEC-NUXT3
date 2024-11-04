<script setup lang="ts">
onMounted(()=>{
    const {clasificacionId} = useRoute().params
    const router = useRouter()
    if(Number(clasificacionId) === 1) {
        router.push('denominaciones/')
    }else if(Number(clasificacionId) === 2) {
        router.push('actividadesEconomicasPrincipales/')
    }else if(Number(clasificacionId) === 3) {
        router.push('actividadesEconomicasPrincipalesCnae/')
    }else if(Number(clasificacionId) === 4) {
        router.push('origenes/')
    }else if(Number(clasificacionId) === 5) {
        router.push('tiposMipymes/')
    } else if(Number(clasificacionId)=== 6){
        router.push('tiposSujetos/')
    }else if(Number(clasificacionId)=== 7){
        router.push('sectoresEconomicos/')
    }
})

</script>
<template lang="pug">
    div
        NuxtPage
</template>