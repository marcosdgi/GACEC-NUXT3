<script setup lang="ts">
interface Props{
    isDrawerOpen: boolean
}
export interface ICreationDenominacion{
    nombre: string
    descripcion : string
}
const {$api} = useNuxtApp()
const emit = defineEmits(['close', 'onChange'])
const props = defineProps<Props>()
const isDrawerOpenRef = ref<boolean>(props.isDrawerOpen)

const handleClose = (done: () => void) => {
  emit('close', false)
}

const formCreationDenominacion = ref<ICreationDenominacion>({
    nombre: '',
    descripcion:'',
})
const createDenominacion = async()=>{
    if(formCreationDenominacion.value.nombre.trim()!=='' && formCreationDenominacion.value.descripcion.trim()!==''){
        const response = await $api.denominacion.crearDenominacion(formCreationDenominacion.value)
        if(response){
            ElNotification({
                title:"Completado",
                type:'success',
                message:"Su clasificación de denominación ha sido creada correctamente"
            })
            emit('onChange')
            emit('close')
        }
    }else{
        ElNotification({
                title:"Advertencia",
                type:'warning',
                message:"Su clasificación de denominación no contiene los datos necesarios"
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
        p.text-xl.font-semibold.text-center Crea una nueva denominación
    .bg-green-100.p-2.rounded-md.mt-3
        p.text-md En esta sección puedes agregar una nueva denominación para clasificar a tus actores económicos

    .grid.items-center.w-full.mt-10.gap-6
        .flex.flex-row.justify-center.items-center.gap-2
            p.text-md.font-semibold Nombre: 
            ElInput(type="text" v-model="formCreationDenominacion.nombre" style="width:220px" placeholder="Nombre de la denominación")
        
        .flex.flex-row.justify-center.items-center.gap-2
            p.text-md.font-semibold Descripción: 
            ElInput(type="textarea" v-model="formCreationDenominacion.descripcion"  style="width:220px" placeholder="Describa su denominación")

        .w-full.items-center.justify-center.flex.mt-5   
            ElButton(type="success" @click="createDenominacion" size="large").w-52.items-center.gap-2
                Icon(name="tabler:upload" size="25").text-white
                span Guardar denominación
</template>