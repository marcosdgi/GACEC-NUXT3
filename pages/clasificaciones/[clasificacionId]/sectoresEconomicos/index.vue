<script setup lang="ts">

const isDrawerOpen = ref<boolean>(false)
const handleDrawerOpen = () => {
  if(isDrawerOpen.value===false){
    isDrawerOpen.value = true
  }else{
    isDrawerOpen.value = false
  }
}
const {$api}= useNuxtApp()
const {data: sectoresEconomicos, execute} = useAsyncData(async()=>{
  return await $api.sectorEconomico.obtenerSectoresEconomicos()
})
const handleCreation = () => {
  execute()
}
</script>
<template lang="pug">
.grid.items-start.w-full.bg-white.p-4.rounded-md(class="h-[600px]")
    .flex.flex-row.items-center.gap-3.h-10
            ElButton(text @click="$router.push('/')")
                Icon(name="tabler:arrow-left" size="25").text-green-800
            Icon(name="tabler:align-box-bottom-center" size="35").text-green-400
            p.text-3xl.font-semibold.text-green-800 Sectores económicos
            ElTooltip(content="Agregar nuevo sector económico" placement="top-start")
                ElButton(type="primary" circle @click="handleDrawerOpen" size="large").ml-2.shadow-xl
                    Icon(name="tabler:plus" size="35")
    hr.mt-2
    .grid.items-center.p-2(v-if="sectoresEconomicos?.length")
        ClasificacionesSectoresEconomicosSectorEconomicoTable(:sectores-economicos="sectoresEconomicos")
        ClasificacionesSectoresEconomicosSectorEconomicoDrawer(
            :isDrawerOpen="isDrawerOpen"
            @close="isDrawerOpen=false"
            @onChange="handleCreation"
        )

</template>