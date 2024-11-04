<script setup lang="ts">
interface Props{
    isDrawerOpen: boolean
}
export interface ICreationActividadCnae{
    nombre: string
    descripcion : string
}
const emit = defineEmits(['close', 'onChange'])
const props = defineProps<Props>()
const isDrawerOpenRef = ref<boolean>(props.isDrawerOpen)
const formCreationActividadCnae = ref<ICreationActividadCnae>({
    nombre: '',
    descripcion:'',
})
const handleClose = (done: () => void) => {
  emit('close', false)
}
const {$api} = useNuxtApp()
const createActividadCnae = async()=>{
    if(formCreationActividadCnae.value.nombre.trim()!=='' && formCreationActividadCnae.value.descripcion.trim()!==''){
        const response = await $api.actividadEconomicaCNAE.crearActividadEconomica(formCreationActividadCnae.value)
        if(response){
            ElNotification({
                title:"Completado",
                type:'success',
                message:"Su clasificación de Actividad económica principal (CNAE) ha sido creada correctamente"
            })
            emit('onChange')
            emit('close')
        }
    }else{
        ElNotification({
                title:"Advertencia",
                type:'warning',
                message:"Su clasificación de Actividad económica principal (CNAE) no contiene los datos necesarios"
            })
    }
}

watch(()=>props.isDrawerOpen, (newVal) => {
    isDrawerOpenRef.value = newVal
},{deep:true})

</script>
<template lang="pug">
ElDrawer(
    v-model="isDrawerOpenRef"
    :before-close="handleClose"
)
    .flex.flex-row.items-center.w-full.justify-center
        Icon(name="tabler:copy-plus" size="30").text-green-800
        p.text-xl.font-semibold.text-center Crea una nueva actividad económica (CNAE)
    .bg-green-100.p-2.rounded-md.mt-3
        p.text-md En esta sección puedes agregar una nueva actividad económica (CNAE) para clasificar a tus actores económicos según la actividad económica que realizan

    .grid.items-center.w-full.mt-10.gap-6
        .flex.flex-row.justify-center.items-center.gap-2
            p.text-md.font-semibold Nombre: 
            ElInput(type="text" v-model="formCreationActividadCnae.nombre" style="width:220px" placeholder="Nombre de la actividad económica")
        
        .flex.flex-row.justify-center.items-center.gap-2
            p.text-md.font-semibold Descripción: 
            ElInput(type="textarea" v-model="formCreationActividadCnae.descripcion" style="width:220px" placeholder="Describa su actividad económica")

        .w-full.items-center.justify-center.flex.mt-5   
            ElButton(type="success" @click="createActividadCnae" size="large").w-64.items-center.gap-2
                Icon(name="tabler:upload" size="25").text-white
                span Guardar actividad económica (CNAE)
</template>