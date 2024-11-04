<script setup lang="ts">
import {
  Check,
  Delete,
  Edit,
  Message,
  Search,
  Star,
} from '@element-plus/icons-vue'
import type { ICreationActividadEconomica } from '~/components/Clasificaciones/ActividadesEconomicasPrincipales/ActividadEconomicaPrincipalDrawer.vue';
import type { IActividadEconomicaResponse } from '~/models/models';
const {actividadEconomicaPrincipalId} = useRoute().params
const editMode = ref<boolean>(false)
    const router = useRouter()
const {$api} = useNuxtApp()
const isComplete = ref<boolean>(false)
const {data:actividadEconomicaPrincipalData, execute} = useAsyncData(async()=>{
    return await $api.actividadEconomica.obtenerActividadEconomica(Number(actividadEconomicaPrincipalId))
})
const actividadEconomicaPrincipal = ref<ICreationActividadEconomica>({
    nombre: actividadEconomicaPrincipalData.value?.nombre ?? '',
    descripcion:actividadEconomicaPrincipalData.value?.descripcion ?? '',
    codigo: actividadEconomicaPrincipalData.value?.descripcion ?? ''
})
const clicked = ref<boolean>(false)
function onCancel() {
  clicked.value = true
}
const editActividadEconomica = async() => {
    const loading = ElLoading.service({
    lock: true,
    text: "Actualizando actividad económica...",
    background: "rgba(0, 0, 0, 0.7)",
  });
  
    if(isComplete.value){
        const response = await $api.actividadEconomica.actualizarActividadEconomica(Number(actividadEconomicaPrincipalId), actividadEconomicaPrincipal.value)
        if(response.id){
            ElNotification(({
                type:'success',
                title:"Completado",
                message:"Se ha actualizado la actividad económica principal correctamente"
            }))
            loading.close()
            router.go(-1)
        }
    }else{
        ElNotification({
            title: 'Advertencia',
            type:'warning',
            message: "No se han completado los datos necesarios para actualizar la actividad económica principal "
        })
        loading.close()
    }
}

const deleteActividadEconomica = async() => {
    await $api.actividadEconomica.eliminarActividadEconomica(Number(actividadEconomicaPrincipalId))
    router.go(-1)
}

watch(()=> actividadEconomicaPrincipal.value, (newValue)=>{
    actividadEconomicaPrincipal.value = newValue
    if(actividadEconomicaPrincipal.value.nombre.trim()!=='' && actividadEconomicaPrincipal.value.descripcion.trim()!==''){
        isComplete.value = true
    }
},{deep:true})
onMounted(() => {
  const loading = ElLoading.service({
    lock: true,
    text: "Cargando datos...",
    background: "rgba(0, 0, 0, 0.7)",
  });
  setTimeout(() => {
    loading.close();
  }, 2000);
});
</script>
<template lang="pug">
    div
        .grid.items-center.w-full.bg-white.rounded-md.p-4
            .flex.flex-row.items-center.w-full.gap-2
                ElButton(text @click="$router.back(-1)")
                    Icon(name="tabler:arrow-left" size="35").text-green-400
                p.text-3xl.font-semibold.text-green-800 {{actividadEconomicaPrincipalData?.nombre}}
                ElTooltip(content="Editar actividad económica" placement="top-start")
                        ElButton(type="primary" @click="editMode = !editMode" :icon="Edit").gap-2.items-center.flex.flex-row
                ElTooltip(content="Confirmar" placement="top-start")
                    ElButton(type="success" @click="editActividadEconomica" :icon="Check" v-show="editMode && isComplete").gap-2.items-center.flex.flex-row
                ElPopconfirm(title="¿Está seguro que desea eliminar esta actividad principal?" 
                            @cancel="onCancel" 
                            @confirm="deleteActividadEconomica"
                            confirm-button-text="Si"
                            cancel-button-text="No"
                            )
                    template(#reference)
                        ElButton(type="danger" :icon="Delete").gap-2.items-center.flex.flex-row
            hr.mt-2
        
        .bg-white.grid.items-start.container.mx-auto.justify-center.mt-5.gap-4(class="w-[60%] shadow-md p-4 rounded-md")
                .flex.flex-row.items-center.gap-2
                    p.text-md.font-semibold Nombre:
                    ElInput(type="text" v-if="editMode" v-model="actividadEconomicaPrincipal.nombre" style="width:300px")
                    p.text-md(v-else) {{actividadEconomicaPrincipalData?.nombre}}
                .flex.flex-row.items-center.gap-2
                    p.text-md.font-semibold Descripción:
                    ElInput(type="textarea" v-if="editMode" v-model="actividadEconomicaPrincipal.descripcion" style="width:300px")
                    p.text-md(v-else) {{actividadEconomicaPrincipalData?.descripcion}}
                
                .flex.flex-row.items-center.gap-2
                    p.text-md.font-semibold Código:
                    ElInput(type="text" v-if="editMode" v-model="actividadEconomicaPrincipal.codigo" style="width:100px")
                    p.text-md(v-else) {{actividadEconomicaPrincipalData?.codigo}}
                
                

</template>