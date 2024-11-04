<script setup lang="ts">
interface Props{
    isDrawerOpen: boolean
}
export interface ICreationActividadEconomica{
    nombre: string
    descripcion : string
    codigo: string
}
const emit = defineEmits(['close', 'onChange'])
const props = defineProps<Props>()
const isDrawerOpenRef = ref<boolean>(props.isDrawerOpen)
const formCreationActividadEconomica = ref<ICreationActividadEconomica>({
    nombre: '',
    descripcion:'',
    codigo:''
})
const handleClose = (done: () => void) => {
  emit('close', false)
}
const {$api} = useNuxtApp()
const createActividadEconomica = async()=>{
    if(formCreationActividadEconomica.value.nombre.trim()!=='' 
    && formCreationActividadEconomica.value.descripcion.trim()!=='' 
    && formCreationActividadEconomica.value.codigo.trim()!=='' 
        )
        {
        const response = await $api.actividadEconomica.crearActividadEconomica(formCreationActividadEconomica.value)
            if(response){
                ElNotification({
                    title:"Completado",
                    type:'success',
                    message:"Su clasificación actividad económica ha sido creada correctamente"
                })
                emit('onChange')
                emit('close')
            }
    }else{
        ElNotification({
                title:"Advertencia",
                type:'warning',
                message:"Su clasificación actividad económica no contiene los datos necesarios"
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
        p.text-xl.font-semibold.text-center Crea una nueva actividad económica 
    .bg-green-100.p-2.rounded-md.mt-3
        p.text-md En esta sección puedes agregar una nueva actividad económica para clasificar a tus actores económicos

    .grid.items-center.w-full.mt-10.gap-6
        .flex.flex-row.justify-center.items-center.gap-2
            p.text-md.font-semibold Nombre: 
            ElInput(type="text" v-model="formCreationActividadEconomica.nombre" style="width:220px" placeholder="Nombre del nuevo tipo actividad económica")
        
        .flex.flex-row.justify-center.items-center.gap-2
            p.text-md.font-semibold Descripción: 
            ElInput(type="textarea" v-model="formCreationActividadEconomica.descripcion" style="width:220px" placeholder="Describa su tipo actividad económica")
        
        .flex.flex-row.justify-center.items-center.gap-2
            p.text-md.font-semibold Código: 
            ElInput(type="textarea" v-model="formCreationActividadEconomica.codigo" style="width:220px" placeholder="Introduzca el código de su actividad económica")

        .w-full.items-center.justify-center.flex.mt-5   
            ElButton(type="success" @click="createActividadEconomica" size="large").w-52.items-center.gap-2
                Icon(name="tabler:upload" size="25").text-white
                span Guardar actividad económica
</template>