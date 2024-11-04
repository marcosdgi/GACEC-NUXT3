<script setup lang="ts">
interface Props{
    isDrawerOpen: boolean
}
export interface ICreationTipoSujeto{
    nombre: string
    descripcion : string
}
const emit = defineEmits(['close', 'onChange'])
const props = defineProps<Props>()
const isDrawerOpenRef = ref<boolean>(props.isDrawerOpen)
const formCreationTipoSujeto = ref<ICreationTipoSujeto>({
    nombre: '',
    descripcion:'',
})
const handleClose = (done: () => void) => {
  emit('close', false)
}
const {$api} = useNuxtApp()
const createTipoSujeto = async()=>{
    if(formCreationTipoSujeto.value.nombre.trim()!=='' && formCreationTipoSujeto.value.descripcion.trim()!==''){
        const response = await $api.tipoSujeto.crearTipoSujeto(formCreationTipoSujeto.value)
        if(response){
            ElNotification({
                title:"Completado",
                type:'success',
                message:"Su clasificación de tipo de sujeto ha sido creada correctamente"
            })
            emit('onChange')
            emit('close')
        }
    }else{
        ElNotification({
                title:"Advertencia",
                type:'warning',
                message:"Su clasificación de tipo de sujeto no contiene los datos necesarios"
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
        p.text-xl.font-semibold.text-center Crea un nuevo tipo de sujeto
    .bg-green-100.p-2.rounded-md.mt-3
        p.text-md En esta sección puedes agregar un nuevo tipo de sujeto para clasificar a tus actores económicos

    .grid.items-center.w-full.mt-10.gap-6
        .flex.flex-row.justify-center.items-center.gap-2
            p.text-md.font-semibold Nombre: 
            ElInput(type="text" v-model="formCreationTipoSujeto.nombre" style="width:220px" placeholder="Nombre del nuevo tipo de sujeto")
        
        .flex.flex-row.justify-center.items-center.gap-2
            p.text-md.font-semibold Descripción: 
            ElInput(type="textarea" v-model="formCreationTipoSujeto.descripcion" style="width:220px" placeholder="Describa su tipo de sujeto")

        .w-full.items-center.justify-center.flex.mt-5   
            ElButton(type="success" @click="createTipoSujeto" size="large").w-52.items-center.gap-2
                Icon(name="tabler:upload" size="25").text-white
                span Guardar tipo sujeto
</template>