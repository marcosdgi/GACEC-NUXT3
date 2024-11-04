<script setup lang="ts">
import type { DrawerProps } from "element-plus";
import type { ITipoMIPYMEResponse } from "~/models/models";
import type { ICreationSolicitante } from "./SolicitanteItem.vue";
interface Props {
  isDrawerOpen: boolean;
  tiposMipymes: Array<ITipoMIPYMEResponse>
}
const {$api} = useNuxtApp()
const props = defineProps<Props>();
const emit = defineEmits(["configurations", "close", "onChange"]);
const isComplete = ref<boolean>(false)
const visibilityDrawer = ref<boolean>(props.isDrawerOpen);
const direction = ref<DrawerProps["direction"]>("rtl");
const formCreationSolicitante = ref<ICreationSolicitante>({
    nombre : '',
    segundo_nombre : '',
    apellido_materno: '',
    apellido_paterno : '',
    correo: '',
    direccion : '',
    tomo : '',
    folio: '',
    telefono : '',
    tipo_mipyme_id : null,
    genero : '',
    carnet : '',
    fecha_nacimiento: ''
})


watch(
  () => props.isDrawerOpen,
  (newVal) => {
    visibilityDrawer.value = newVal;
  },
  { deep: true }
);
watch(()=>formCreationSolicitante.value,(newValue)=>{
    formCreationSolicitante.value = newValue
    console.log(formCreationSolicitante.value)
    if(
        formCreationSolicitante.value.nombre.trim()!==''
        && formCreationSolicitante.value.apellido_materno.trim()!==''
        && formCreationSolicitante.value.apellido_paterno.trim()!==''
        && formCreationSolicitante.value?.correo?.trim()!==''
        && formCreationSolicitante.value.direccion.trim()!==''
        && formCreationSolicitante.value.fecha_nacimiento.trim()!==''
        && formCreationSolicitante.value.telefono.trim()!==''
        && formCreationSolicitante.value.tomo.trim()!==''
        && formCreationSolicitante.value.correo?.includes('@')
        && formCreationSolicitante.value.correo?.includes('.')
        && formCreationSolicitante.value.tomo.trim().length<=4
        && formCreationSolicitante.value.folio.trim().length<=4
        && formCreationSolicitante.value.folio.trim()!==''
        && formCreationSolicitante.value.genero.trim()!==''
        && formCreationSolicitante.value.carnet.trim()!==''
    )isComplete.value=true
    
},{deep:true})

const createSolicitante = async() => {
    if(isComplete.value){
        const response = await $api.solicitante.crearSolicitante(formCreationSolicitante.value)
        if(response.id){
            ElNotification({
                type:'success',
                title:"Completado",
                message:"Se ha creado el solicitante correctamente"
            })
            emit('close')
            emit('onChange')
        }else{
            ElNotification({
                type:"error",
                title: "Error",
                message:"Ocurrió un error en la creación del solicitante"
            })
        }
    }
}


const handleClose = (done: () => void) => {
  emit("close", false);
};

const formatDate = (ev: Date) => {
  const year = ev.getFullYear();
  const month = String(ev.getMonth() + 1).padStart(2, '0'); // Los meses van de 0 a 11, así que sumamos 1
  const day = String(ev.getDate()).padStart(2, '0');
  formCreationSolicitante.value.fecha_nacimiento = `${year}-${month}-${day}`;
}
</script>
<template lang="pug">
el-drawer(
    v-model="visibilityDrawer"
    :direction="direction"
    :with-header="false"
    :before-close="handleClose"
 )
    El-scrollbar( height="620px")
        .grid.items-center.w-full.gap-2
            .flex.flex-row.items-center.gap-2
                Icon(name="tabler:plus" size="30").text-green-800
                p.text-xl Crear nuevo solicitante
            .bg-green-50.p-2.rounded.mt-2
                p En este panel se realiza la creación de un nuevo solicitante o representante(Complete correctamente el formulario, una vez finalice se habilitará el botón para enviar los datos)
            .flex.flex-row.items-center.gap-2.w-full
                p.text-sm Nombre
                ElInput(placeholder="Escriba aquí..." v-model="formCreationSolicitante.nombre")
            .flex.flex-row.items-center.gap-2.w-full
                p.text-sm.whitespace-nowrap Segundo nombre (Opcional)
                ElInput(placeholder="Escriba aquí..." v-model="formCreationSolicitante.segundo_nombre")
            .flex.flex-row.items-center.gap-2.w-full
                p.text-sm.whitespace-nowrap Primer apellido
                ElInput(placeholder="Escriba aquí..." v-model="formCreationSolicitante.apellido_paterno")
            .flex.flex-row.items-center.gap-2.w-full
                p.text-sm.whitespace-nowrap Segundo apellido
                ElInput(placeholder="Escriba aquí..." v-model="formCreationSolicitante.apellido_materno")
            
            .flex.flex-row.items-center.gap-2.w-full
                p.text-sm.whitespace-nowrap Carnet
                ElInput(placeholder="Escriba aquí..." v-model="formCreationSolicitante.carnet")
            
            .flex.flex-row.items-center.gap-2.w-full
                p.text-sm Género
                ElSelect(placeholder="Seleccione" v-model="formCreationSolicitante.genero")
                    ElOption(
                        key="femenino"
                        label="Femenino"
                        value="Femenino"
                    )
                    ElOption(
                        key="masculino"
                        label="Masculino"
                        value="Masculino"
                    )
            .flex.flex-row.items-center.gap-2.w-full
                p.text-sm.whitespace-nowrap Fecha de nacimiento
                ElDatePicker(placeholder="Seleccione" @change="formatDate" v-model='formCreationSolicitante.fecha_nacimiento')
            .flex.flex-row.items-center.gap-2.w-full
                p.text-sm Correo
                ElInput(placeholder="ejemplo@gmail.com" v-model="formCreationSolicitante.correo")
            
            .flex.flex-row.items-center.gap-2.w-full
                p.text-sm Dirección
                ElInput(placeholder="Escriba aquí" v-model="formCreationSolicitante.direccion")
            
            .flex.flex-row.items-center.gap-2.w-full
                p.text-sm Teléfono
                ElInput(placeholder="Escriba aquí" v-model="formCreationSolicitante.telefono")
               
                        
            .flex.flex-row.items-center.gap-2.w-full
                p.text-sm.whitespace-nowrap Tomo* (máx. 3 carácteres)
                ElInput(placeholder="Escriba aquí" v-model="formCreationSolicitante.tomo")
            
            .flex.flex-row.items-center.gap-2.w-full
                p.text-sm.whitespace-nowrap Folio* (máx. 3 carácteres)
                ElInput(placeholder="Escriba aquí" v-model="formCreationSolicitante.folio")

            .flex.flex-row.items-center.gap-2.w-full
                p.text-sm.whitespace-nowrap Tipo de mipyme
                ElSelect(placeholder="Seleccione" v-model="formCreationSolicitante.tipo_mipyme_id")
                    ElOption(
                        v-for="tipoMipyme in props.tiposMipymes"
                        :key="tipoMipyme.id"
                        :label="tipoMipyme.nombre"
                        :value="tipoMipyme.id"
                    )

            ElButton(type="primary" :disabled="!isComplete" @click="createSolicitante")
                span Guardar solicitante

</template>
