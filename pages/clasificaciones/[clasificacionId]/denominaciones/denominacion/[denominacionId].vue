<script setup lang="ts">
import {
  Check,
  Delete,
  Edit,
  Message,
  Search,
  Star,
} from '@element-plus/icons-vue'
import type { ICreationDenominacion } from '~/components/Clasificaciones/Denominaciones/DenominacionDrawer.vue';
const {denominacionId} = useRoute().params
const router = useRouter()
const {$api} = useNuxtApp()
const isComplete = ref<boolean>(false)
const {data:denominacionData, execute} = useAsyncData(async()=>{
    return await $api.denominacion.obtenerDenominacionById(Number(denominacionId))
})
const editMode = ref<boolean>(false)
const clicked = ref<boolean>(false)
function onCancel() {
  clicked.value = true
}
const denominacion = ref<ICreationDenominacion>({
    nombre: denominacionData.value?.nombre ?? '',
    descripcion:denominacionData.value?.descripcion ?? '',
})
const editDenominacion = async() => {
    const loading = ElLoading.service({
    lock: true,
    text: "Actualizando denominación...",
    background: "rgba(0, 0, 0, 0.7)",
  });
  
    if(isComplete.value){
        const response = await $api.denominacion.actualizarDenominacion(Number(denominacionId), denominacion.value)
        if(response.id){
            ElNotification(({
                type:'success',
                title:"Completado",
                message:"Se ha actualizado la denominación correctamente"
            }))
            loading.close()
            router.go(-1)
        }
    }else{
        ElNotification({
            title: 'Advertencia',
            type:'warning',
            message: "No se han completado los datos necesarios para actualizar la denominación"
        })
        loading.close()
    }
}

const deleteDenominacion = async() => {
    await $api.denominacion.eliminarDenominacion(Number(denominacionId))
    router.go(-1)
}

watch(()=> denominacion.value, (newValue)=>{
    denominacion.value = newValue
    if(denominacion.value.nombre.trim()!=='' && denominacion.value.descripcion.trim()!==''){
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
                p.text-3xl.font-semibold.text-green-800 {{denominacionData.nombre}}
                ElTooltip(content="Editar denominación" placement="top-start")
                        ElButton(type="primary" @click="editMode = !editMode" :icon="Edit").gap-2.items-center.flex.flex-row
                ElTooltip(content="Confirmar" placement="top-start")
                    ElButton(type="success" @click="editDenominacion" :icon="Check" v-show="editMode && isComplete").gap-2.items-center.flex.flex-row
                ElPopconfirm(title="¿Está seguro que desea eliminar esta denominación?" 
                        @cancel="onCancel" 
                        @confirm="deleteDenominacion"
                        confirm-button-text="Si"
                        cancel-button-text="No"
                            )
                    template(#reference)
                        ElButton(type="danger" :icon="Delete").gap-2.items-center.flex.flex-row
            hr.mt-2
        
        .bg-white.grid.items-start.container.mx-auto.justify-center.mt-5.gap-4(class="w-[60%] shadow-md p-4 rounded-md")
                .flex.flex-row.items-center.gap-2
                    p.text-md.font-semibold Nombre:
                    ElInput(type="text" v-if="editMode" v-model="denominacion.nombre" style="width:300px")
                    p.text-md(v-else) {{denominacionData.nombre}}
                .flex.flex-row.items-center.gap-2
                    p.text-md.font-semibold Descripción:
                    ElInput(type="textarea" v-if="editMode" v-model="denominacion.descripcion" style="width:300px")
                    p.text-md(v-else) {{denominacionData.descripcion}}
                
                

</template>