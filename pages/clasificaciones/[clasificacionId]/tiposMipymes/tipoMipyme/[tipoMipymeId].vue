<script setup lang="ts">
import {
  Check,
  Delete,
  Edit,
  Message,
  Search,
  Star,
} from '@element-plus/icons-vue'
import type { ICreationTipoMipyme } from '~/components/Clasificaciones/TiposMipymes/TipoMipymeDrawer.vue';
import type { ITipoMIPYMEResponse } from '~/models/models';
const {tipoMipymeId} = useRoute().params
const router = useRouter()
const editMode = ref<boolean>(false)
const {$api} = useNuxtApp()
const isComplete = ref<boolean>(false)
const {data:tipoMipymeData, execute} = useAsyncData(async()=>{
    return await $api.tipoMipyme.obtenerTipoMipyme(Number(tipoMipymeId))
})
const tipoMipyme = ref<ICreationTipoMipyme>({
    nombre: tipoMipymeData.value?.nombre ?? '',
    descripcion:tipoMipymeData.value?.descripcion ?? '',
})
const clicked = ref<boolean>(false)
function onCancel() {
  clicked.value = true
}
const editTipoMipyme = async() => {
    const loading = ElLoading.service({
    lock: true,
    text: "Actualizando tipo de mipyme...",
    background: "rgba(0, 0, 0, 0.7)",
  });
  
    if(isComplete.value){
        const response = await $api.tipoMipyme.actualizarTipoMipyme(Number(tipoMipymeId), tipoMipyme.value)
        if(response.id){
            ElNotification(({
                type:'success',
                title:"Completado",
                message:"Se ha actualizado el tipo de mipyme correctamente"
            }))
            loading.close()
            router.go(-1)
        }
    }else{
        ElNotification({
            title: 'Advertencia',
            type:'warning',
            message: "No se han completado los datos necesarios para actualizar el tipo de mipyme"
        })
        loading.close()
    }
}

const deleteTipoMipyme = async() => {
    await $api.tipoMipyme.eliminarTipoMipyme(Number(tipoMipymeId))
    router.go(-1)
}

watch(()=> tipoMipyme.value, (newValue)=>{
    tipoMipyme.value = newValue
    if(tipoMipyme.value.nombre.trim()!=='' && tipoMipyme.value.descripcion.trim()!==''){
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
                p.text-3xl.font-semibold.text-green-800 {{tipoMipymeData?.nombre}}
                ElTooltip(content="Editar tipo de mipyme" placement="top-start")
                        ElButton(type="primary" @click="editMode = !editMode" :icon="Edit").gap-2.items-center.flex.flex-row
                ElTooltip(content="Confirmar" placement="top-start")
                    ElButton(type="success" @click="editTipoMipyme" :icon="Check" v-show="editMode && isComplete").gap-2.items-center.flex.flex-row
                ElPopconfirm(title="¿Está seguro que desea eliminar este tipo de mipyme?" 
                        @cancel="onCancel" 
                        @confirm="deleteTipoMipyme"
                        confirm-button-text="Si"
                        cancel-button-text="No"
                            )
                    template(#reference)
                        ElButton(type="danger" :icon="Delete").gap-2.items-center.flex.flex-row
            hr.mt-2
        
        .bg-white.grid.items-start.container.mx-auto.justify-center.mt-5.gap-4(class="w-[60%] shadow-md p-4 rounded-md")
                .flex.flex-row.items-center.gap-2
                    p.text-md.font-semibold Nombre:
                    ElInput(type="text" v-if="editMode" v-model="tipoMipyme.nombre" style="width:300px")
                    p.text-md(v-else) {{tipoMipymeData?.nombre}}
                .flex.flex-row.items-center.gap-2
                    p.text-md.font-semibold Descripción:
                    ElInput(type="textarea" v-if="editMode" v-model="tipoMipyme.descripcion" style="width:300px")
                    p.text-md(v-else) {{tipoMipymeData?.descripcion}}
                
                

</template>