<script setup lang="ts">
import {Chart} from 'chart.js'
import "animate.css";
import type { ButtonInstance } from "element-plus";
const btnRef2 = ref<ButtonInstance>();
const btnRef3 = ref<ButtonInstance>();
const btnRef4 = ref<ButtonInstance>();
const btnRef5 = ref<ButtonInstance>();
const open = ref<boolean>(false);
const {$api} = useNuxtApp()

const {data:estadisticas} = useAsyncData(async()=>{
    return await $api.estadistica.obtenerEstadisticas('2024')
})


</script>

<template lang="pug">
div.bg-white.w-full.rounded-lg.p-6.shadow-lg(class="h-[620px]  overflow-auto animate__animated animate__fadeInLeftBig")
    div.h-12.w-full.flex.justify-center.mb-4
        .flex.flex-row.items-center.gap-3
            Icon(name="tabler:adjustments-horizontal" size="30").text-emerald-500
            p.text-3xl.font-semibold.text-gray-800 Menú principal
            ElButton(type="primary" @click="open=true")
                Icon(name="tabler:automation" size="25px").text-white
                p Tutorial 
    ElTour(v-model="open")
      
        ElTourStep(title="Clasificaciones" description="Gestionará todas las clasificaciones existentes dentro del sistema que luego serán utilizadas para clasificar a sus actores económicos locales" :target="btnRef2.$el")
            div(class="flex flex-row items-center justify-center")
                img(src="/tutorial/clasificaciones.jfif" width="200px")
                p Gestionará todas las clasificaciones existentes dentro del sistema que luego serán utilizadas para clasificar a sus actores económicos locales
        ElTourStep(title="Solicitantes" description="Administrará los solicitantes y representantes de actores dentro del sistema" :target="btnRef3.$el")
            div(class="flex flex-row items-center justify-center")
                img(src="/tutorial/solicitantes.jpg" width="200px")
                p Administrará los solicitantes y representantes de actores dentro del sistema
        ElTourStep(title="Reportes" description="Generar reportes en fechas concretas para centralizar la información a travéz de documentos PDF" :target="btnRef4.$el")
            div(class="flex flex-row items-center justify-center")
                img(src="/tutorial/reportes.jpg" width="200px")
                p Generar reportes en fechas concretas para centralizar la información a travéz de documentos PDF
        ElTourStep(title="Actores económicos" description="Gestionar información referente a los actores económicos locales" :target="btnRef5.$el")
            div(class="flex flex-row items-center justify-center")
                img(src="/tutorial/actoresEconomicos.jpg" width="200px")
                p Gestionar información referente a los actores económicos locales    
    .grid.items-start.w-full.gap-8.grid-cols-2
        ElScrollbar
            .flex.flex-col.gap-8.overflow-auto.bg-green-700.p-4.rounded-md(class="h-[50%]")
                //- Tarjeta de Clasificaciones
                .col-span-6.rounded-lg.transition-all.duration-300.ease-in-out.bg-green-50.h-auto.p-6.shadow-md.items-center.border-l-4.border-green-400(class="hover:shadow-lg.hover:scale-105")
                    .grid.items-center.gap-4
                        .flex.flex-row.justify-center.items-center
                            Icon(name="tabler:album" size="100" class="text-emerald-500")
                            .flex.flex-col.items-center.gap-4
                                .flex.flex-row.justify-center.gap-2
                                    ElPopover(
                                        placement="top-start"
                                        title="Información"
                                        :width="200"
                                        trigger="hover"
                                        content="Esta sección permite clasificar los distintos parámetros en los que se separan los actores y su gestión")
                                        template(#reference)
                                            ElButton(text circle).text-slate-800.transition-all.duration-300.ease-in-out(class="hover:bg-green-100")
                                                Icon(name="tabler:exclamation-circle" size="25").text-slate-800
                                    p.text-green-800.text-2xl.font-semibold Clasificaciones
                                div.flex.justify-center
                                    ElButton(ref="btnRef2" type="success" class="w-52 h-10 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out hover:bg-emerald-600 hover:scale-105" @click="$router.push('clasificaciones/')")
                                        p.font-medium.text-white Ir

                //- Tarjeta de Solicitantes
                .col-span-6.rounded-lg.transition-all.duration-300.ease-in-out.bg-green-50.h-auto.p-6.shadow-md.items-center.border-l-4.border-blue-400(class="hover:shadow-lg.hover:scale-105")
                    .grid.items-center.gap-4
                        .flex.flex-row.justify-center.items-center
                            Icon(name="tabler:award" size="100" class="text-blue-500")
                            .flex.flex-col.items-center.gap-4
                                .flex.flex-row.justify-center.gap-2
                                    ElPopover(
                                        placement="top-start"
                                        title="Información"
                                        :width="200"
                                        trigger="hover"
                                        content="Esta sección permite gestionar los registros de solicitantes adyacentes a la Dirección de desarrollo")
                                        template(#reference)
                                            ElButton(text circle).text-slate-800.transition-all.duration-300.ease-in-out(class="hover:bg-blue-100")
                                                Icon(name="tabler:exclamation-circle" size="25").text-slate-800
                                    p.text-green-800.text-2xl.font-semibold Solicitantes / Representantes
                                div.flex.justify-center
                                    ElButton(ref="btnRef3" type="primary" class="w-52 h-10 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out hover:bg-blue-600 hover:scale-105" @click="$router.push('solicitantes/')")
                                        p.font-medium.text-white Ir

                //- Tarjeta de Reportes
                .col-span-6.rounded-lg.transition-all.duration-300.ease-in-out.bg-green-50.h-auto.p-6.shadow-md.items-center.border-l-4.border-blue-400(class="hover:shadow-lg.hover:scale-105")
                    .grid.items-center.gap-4
                        .flex.flex-row.justify-center.items-center
                            Icon(name="tabler:file-check" size="100" class="text-blue-500")
                            .flex.flex-col.items-center.gap-4
                                .flex.flex-row.justify-center.gap-2
                                    ElPopover(
                                        placement="top-start"
                                        title="Información"
                                        :width="200"
                                        trigger="hover"
                                        content="Esta sección permite gestionar y configurar los reportes basados en la información registrada")
                                        template(#reference)
                                            ElButton(text circle).text-slate-800.transition-all.duration-300.ease-in-out(class="hover:bg-blue-100")
                                                Icon(name="tabler:exclamation-circle" size="25").text-slate-800
                                    p.text-green-800.text-2xl.font-semibold Reportes
                                div.flex.justify-center
                                    ElButton(ref="btnRef4" type="primary" class="w-52 h-10 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out hover:bg-blue-600 hover:scale-105" @click="$router.push('reportes/')")
                                        p.font-medium.text-white Ir

                //- Tarjeta de Actores locales
                .col-span-6.rounded-lg.transition-all.duration-300.ease-in-out.bg-green-50.h-auto.p-6.shadow-md.items-center.border-l-4.border-blue-400(class="hover:shadow-lg.hover:scale-105")
                    .flex.flex-row.justify-center.items-center.gap-6
                        Icon(name="tabler:folder-dollar" size="100" class="text-blue-500")
                        .flex.flex-col.items-center.gap-4
                            .flex.flex-row.justify-center.gap-2
                                ElPopover(
                                    placement="top-start"
                                    title="Información"
                                    :width="200"
                                    trigger="hover"
                                    content="Esta sección permite gestionar y clasificar a los actores económicos del municipio")
                                    template(#reference)
                                        ElButton(text circle).text-slate-800.transition-all.duration-300.ease-in-out(class="hover:bg-blue-100")
                                            Icon(name="tabler:exclamation-circle" size="25").text-slate-800
                                p.text-green-800.text-2xl.font-semibold Actores locales
                            div.flex.justify-center
                                ElButton(ref="btnRef5" type="primary" class="w-52 h-10 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 ease-in-out hover:bg-blue-600 hover:scale-105" @click="$router.push('/actoresLocales')")
                                    p.font-medium.text-white Ir
        .flex.flex-col.gap-8.overflow-auto.items-start.h-full
            .grid.items-center.w-full
                p.text-2xl.text-center.text-green-800.font-semibold Cantidad de actores registrados en GACEC por mes
                HomeBarChart
            .grid.items-center.w-full
                p.text-2xl.text-center.text-green-800.font-semibold Estado de sus actores locales
                HomeDonutChart.mt-10
</template>
