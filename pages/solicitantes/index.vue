<script setup lang="ts">
import "animate.css";
const {$api} = useNuxtApp()
const visibilityDrawer = ref<boolean>(false)
const {data, execute} = useAsyncData(async()=>{
    const [solicitantes, tiposMipymes] = await Promise.all([
     $api.solicitante.obtenerSolicitantes(),
     $api.tipoMipyme.obtenerTiposMipymes()
    ])
    return {
        solicitantes,
        tiposMipymes
    }
})
const handleChange = () => {
    execute()
}
const handleClose = () => {
    visibilityDrawer.value = false
}
</script>
<template lang="pug">
div()
    SolicitantesSolicitanteDrawer(v-if="data?.tiposMipymes?.length" @close="handleClose" @onChange="handleChange" :isDrawerOpen="visibilityDrawer" :tipos-mipymes="data?.tiposMipymes")
    .w-full.grid.items-center.bg-white.gap-4.p-4.rounded-md(class="animate__animated animate__fadeInLeftBig h-[620px] overflow-y-auto")
        .flex.flex-row.items-center.gap-2
            ElButton(text @click="$router.go(-1)").gap-2.items-center.flex.flex-row
                Icon(name="tabler:arrow-left" size="30").text-green-600
            p.text-2xl Solicitantes / Representantes
            ElTooltip(content="Añadir solicitante" placement='top-start')
                ElButton(type="primary" @click="visibilityDrawer=true")
                    Icon(name="tabler:plus")
        hr.text-green-400.w-full
        .grid.items-center.w-full.px-2.mt-4.gap-y-2(v-if="data && data.solicitantes?.length &&  data.tiposMipymes?.length")
            template(v-for="solicitante in data.solicitantes" :key="solicitante.id")
                SolicitantesSolicitanteItem(:solicitante="solicitante" @change="handleChange" :tipos-mipymes="data.tiposMipymes")
        ElEmpty(v-else description="No hay solicitudes registradas en el sistema")
</template>
