<script setup lang="ts">
import {
  Check,
  Delete,
  Edit,
  Message,
  Search,
  Star,
} from '@element-plus/icons-vue'
import type { ICreationTipoSujeto } from '~/components/Clasificaciones/TiposSujetos/TipoSujetoDrawer.vue';
import type { ITipoMIPYMEResponse, ITipoSujetoResponse } from '~/models/models';
const {tipoSujetoId} = useRoute().params
const editMode = ref<boolean>(false)
const router = useRouter()
const {$api} = useNuxtApp()
const isComplete = ref<boolean>(false)
const {data:tipoSujetoData, execute} = useAsyncData(async()=>{
    return await $api.tipoSujeto.obtenerTipoSujeto(Number(tipoSujetoId))
})
const tipoSujeto = ref<ICreationTipoSujeto>({
    nombre: tipoSujetoData.value?.nombre ?? '',
    descripcion:tipoSujetoData.value?.descripcion ?? '',
})
const clicked = ref<boolean>(false)
function onCancel() {
  clicked.value = true
}
const editTipoSujeto = async() => {
    const loading = ElLoading.service({
    lock: true,
    text: "Actualizando tipo de sujeto...",
    background: "rgba(0, 0, 0, 0.7)",
  });
  
    if(isComplete.value){
        const response = await $api.tipoSujeto.actualizarTipoSujeto(Number(tipoSujetoId), tipoSujeto.value)
        if(response.id){
            ElNotification(({
                type:'success',
                title:"Completado",
                message:"Se ha actualizado el tipo de sujeto correctamente"
            }))
            loading.close()
            router.go(-1)
        }
    }else{
        ElNotification({
            title: 'Advertencia',
            type:'warning',
            message: "No se han completado los datos necesarios para actualizar el tipo de sujeto"
        })
        loading.close()
    }
}

const deleteTipoSujeto = async() => {
    await $api.tipoSujeto.eliminarTipoSujeto(Number(tipoSujetoId))
    router.go(-1)
}

watch(()=> tipoSujeto.value, (newValue)=>{
    tipoSujeto.value = newValue
    if(tipoSujeto.value.nombre.trim()!=='' && tipoSujeto.value.descripcion.trim()!==''){
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
                p.text-3xl.font-semibold.text-green-800 {{tipoSujetoData?.nombre}}
                ElTooltip(content="Editar tipo de sujeto" placement="top-start")
                        ElButton(type="primary" @click="editMode = !editMode" :icon="Edit").gap-2.items-center.flex.flex-row
                ElTooltip(content="Confirmar" placement="top-start")
                    ElButton(type="success" @click="editTipoSujeto" :icon="Check" v-show="editMode && isComplete").gap-2.items-center.flex.flex-row
                ElPopconfirm(title="¿Está seguro que desea eliminar este tipo de sujeto?" 
                            @cancel="onCancel" 
                            @confirm="deleteTipoSujeto"
                            confirm-button-text="Si"
                            cancel-button-text="No"
                            )
                    template(#reference)
                        ElButton(type="danger" :icon="Delete").gap-2.items-center.flex.flex-row
            hr.mt-2
        
        .bg-white.grid.items-start.container.mx-auto.justify-center.mt-5.gap-4(class="w-[60%] shadow-md p-4 rounded-md")
                .flex.flex-row.items-center.gap-2
                    p.text-md.font-semibold Nombre:
                    ElInput(type="text" v-if="editMode" v-model="tipoSujeto.nombre" style="width:300px")
                    p.text-md(v-else) {{tipoSujetoData?.nombre}}
                .flex.flex-row.items-center.gap-2
                    p.text-md.font-semibold Descripción:
                    ElInput(type="textarea" v-if="editMode" v-model="tipoSujeto.descripcion" style="width:300px")
                    p.text-md(v-else) {{tipoSujetoData?.descripcion}}
                
                

</template>