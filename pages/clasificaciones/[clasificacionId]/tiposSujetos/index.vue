<script setup lang="ts">

const isDrawerOpen = ref<boolean>(false)
const handleDrawerOpen = () => {
  if(isDrawerOpen.value===false){
    isDrawerOpen.value = true
  }else{
    isDrawerOpen.value = false
  }
}
const {$api} = useNuxtApp()
const {data: tiposSujetos, execute} = useAsyncData(async()=>{
  return await $api.tipoSujeto.obtenerTiposSujetos()
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
            p.text-3xl.font-semibold.text-green-800 Tipos de sujetos
            ElTooltip(content="Agregar nuevo tipo de sujeto" placement="top-start")
                ElButton(type="primary" circle @click="handleDrawerOpen" size="large").ml-2.shadow-xl
                    Icon(name="tabler:plus" size="35")
    hr.mt-2
    .grid.items-center.p-2(v-if="tiposSujetos?.length")
        ClasificacionesTiposSujetosTipoSujetoTable(:tipos-sujetos="tiposSujetos")
        ClasificacionesTiposSujetosTipoSujetoDrawer(
            :isDrawerOpen="isDrawerOpen"
            @close="isDrawerOpen=false"
            @onChange="handleCreation"
        )

</template>