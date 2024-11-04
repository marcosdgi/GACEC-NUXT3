<script setup lang="ts">
import {
  Check,
  Delete,
  Edit,
  Message,
  Search,
  Star,
} from '@element-plus/icons-vue'
import type { ICreationOrigen } from '~/components/Clasificaciones/Origenes/OrigenDrawer.vue';
import type {  IOrigenResponse } from '~/models/models';
const {origenId} = useRoute().params
const editMode = ref<boolean>(false)
    const router = useRouter()
const {$api} = useNuxtApp()
const isComplete = ref<boolean>(false)
const {data:origenData, execute} = useAsyncData(async()=>{
    return await $api.origen.obtenerOrigen(Number(origenId))
})
const clicked = ref<boolean>(false)
function onCancel() {
  clicked.value = true
}
const origen = ref<ICreationOrigen>({
    nombre: origenData.value?.nombre ?? '',
    descripcion:origenData.value?.descripcion ?? '',
})
const editOrigen = async() => {
    const loading = ElLoading.service({
    lock: true,
    text: "Actualizando denominación...",
    background: "rgba(0, 0, 0, 0.7)",
  });
  
    if(isComplete.value){
        const response = await $api.origen.actualizarOrigen(Number(origenId), origen.value)
        if(response.id){
            ElNotification(({
                type:'success',
                title:"Completado",
                message:"Se ha actualizado el origen correctamente"
            }))
            loading.close()
            router.go(-1)
        }
    }else{
        ElNotification({
            title: 'Advertencia',
            type:'warning',
            message: "No se han completado los datos necesarios para actualizar el origen"
        })
        loading.close()
    }
}

const deleteOrigen = async() => {
    await $api.origen.eliminarOrigen(Number(origenId))
    router.go(-1)
}

watch(()=> origen.value, (newValue)=>{
    origen.value = newValue
    if(origen.value.nombre.trim()!=='' && origen.value.descripcion.trim()!==''){
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
                p.text-3xl.font-semibold.text-green-800 {{origenData?.nombre}}
                ElTooltip(content="Editar origen" placement="top-start")
                        ElButton(type="primary" @click="editMode = !editMode" :icon="Edit").gap-2.items-center.flex.flex-row
                ElTooltip(content="Confirmar" placement="top-start")
                    ElButton(type="success" @click="editOrigen" :icon="Check" v-show="editMode").gap-2.items-center.flex.flex-row
                ElPopconfirm(title="¿Está seguro que desea eliminar este origen?" 
                        @cancel="onCancel" 
                        @confirm="deleteOrigen"
                        confirm-button-text="Si"
                        cancel-button-text="No"
                            )
                    template(#reference)
                        ElButton(type="danger" :icon="Delete").gap-2.items-center.flex.flex-row
            hr.mt-2
        
        .bg-white.grid.items-start.container.mx-auto.justify-center.mt-5.gap-4(class="w-[60%] shadow-md p-4 rounded-md")
                .flex.flex-row.items-center.gap-2
                    p.text-md.font-semibold Nombre:
                    ElInput(type="text" v-if="editMode" v-model="origen.nombre" style="width:300px")
                    p.text-md(v-else) {{origenData?.nombre}}
                .flex.flex-row.items-center.gap-2
                    p.text-md.font-semibold Descripción:
                    ElInput(type="textarea" v-if="editMode" v-model="origen.descripcion" style="width:300px")
                    p.text-md(v-else) {{origenData?.descripcion}}
                
                

</template>