<script setup lang="ts">
import type { ISolicitanteResponse, ITipoMIPYMEResponse } from '~/models/models';

interface Props{
    solicitante : ISolicitanteResponse
    tiposMipymes: Array<ITipoMIPYMEResponse>
}
export interface ICreationSolicitante  {
    nombre:string;
    segundo_nombre:string | null;
    apellido_paterno:string;
    apellido_materno:string;
    telefono:string ;
    correo: string | null;
    carnet:string;
    tomo:string;
    folio:string
    fecha_nacimiento:string;
    genero:string;
    direccion:string;
    tipo_mipyme_id:number | null; 
}
const props = defineProps<Props>()
const isComplete = ref<boolean>(false)
const emit = defineEmits(['change'])
const editMode = ref<boolean>(false)
const tiposMipymesRef = ref<Array<ITipoMIPYMEResponse>>(props.tiposMipymes)
const solicitanteRef = ref<ISolicitanteResponse>(props.solicitante)
const newSolicitante = ref<ICreationSolicitante>({
    nombre: '',
    segundo_nombre: '',
    apellido_materno: '',
    apellido_paterno: '',
    direccion: '',
    carnet: '',
    folio: '',
    tomo:'',
    correo: '',
    telefono: '',
    fecha_nacimiento: '',
    genero:'',
    tipo_mipyme_id: null
})
const {$api} = useNuxtApp()
const editSolicitante = async() => {
    const {id, ...solicitanteObj} = solicitanteRef.value
    const response = await $api.solicitante.actualizarSolicitante(id, {...solicitanteObj})
    if(response.id){
        ElNotification({
            type:'success',
            message: `Se ha actualizado correctamente el solicitante ${response.nombre} ${response.apellido_paterno}`,
            title:"Completado"
            
        })
        emit('change')
    }else{
        ElNotification({
            type:'error',
            message: `Se ha producido un error al intentar actualizar el solicitante ${solicitanteRef.value.nombre} ${solicitanteRef.value.apellido_paterno}`,
            title:"Error"
        })
    }
}


const open = () => {
  ElMessageBox.confirm(
    'Si elimina este solicitante y tiene un actor local asociado a él podría perder información referente al actor, esta seguro que desea continuar?',
    'Advertencia',
    {
      confirmButtonText: 'Si',
      cancelButtonText: 'Cancelar',
      type: 'warning',
    }
  )
    .then(() => {
        const response = $api.solicitante.eliminarSolicitante(solicitanteRef.value.id)
        ElMessage({
        type: 'success',
        message: 'Eliminación completada',
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Eliminación cancelada',
      })
    })
}
const inputClasses = computed(() => ({
  'animate__animated': true,
  'animate__fadeInDown': editMode.value,
  'animate__fadeOutUp': !editMode.value
}));

watch(()=>solicitanteRef.value, (newValue)=>{
    solicitanteRef.value = newValue 
    if(
        solicitanteRef.value.nombre.trim() !== ''
        && solicitanteRef.value.apellido_materno.trim() !== ''
        && solicitanteRef.value.apellido_paterno.trim() !== ''
        && solicitanteRef.value.carnet.trim() !== ''
        && solicitanteRef.value.carnet.trim().length <= 11
        && solicitanteRef.value.folio.trim().length <= 3
        && solicitanteRef.value.tomo.trim().length <= 3
        && solicitanteRef.value.telefono.trim() !== ''
        && solicitanteRef?.value?.correo?.trim() !== ''
        && solicitanteRef.value.direccion.trim() !== ''
        && solicitanteRef.value.genero.trim() !== ''
        && solicitanteRef.value.fecha_nacimiento.trim() !==''
        && solicitanteRef.value.tipo_mipyme_id
    ) isComplete.value = true
    else{
        ElNotification({
            title:"Advertencia",
            message: "No se han completado los datos necesarios para actualizar este solicitante",
            type:'warning'
        })
    }
},{deep:true})
const formatDate = (date: Date) => {
    solicitanteRef.value.fecha_nacimiento = date.toLocaleString().split("T")[0];
}
watch(()=>props.solicitante,(newValue)=>solicitanteRef.value=newValue,{deep:true})
</script>
<template lang="pug">
.flex.flex-row.w-full.items-center.h-40.bg-white.p-3.rounded-md.border.border-green-200(class="hover:shadow-xl hover:border-4 hover:border-green-300 transition-all duration-300  h-[620px] overflow-y-auto")
    .flex.flex-row.items-center.gap-6.h-full
        Icon(name="tabler:user-dollar" size="28").text-green-600
        p Solicitante # {{solicitanteRef.id}}
        .grid.items-center.gap-2
            p(v-if="!editMode").w-72.overflow-hidden.overflow-ellipsis {{solicitanteRef?.nombre}} {{solicitanteRef.segundo_nombre ?? ''}} {{solicitanteRef.apellido_paterno}} {{solicitanteRef.apellido_materno}} 
            div(v-else :class="inputClasses" ).flex.flex-row.items-center.gap-1
                ElInput(placeholder="Escriba aquí" :style="{width:'80px'}" v-model="solicitanteRef.nombre")
                ElInput(placeholder="Escriba aquí" :style="{width:'80px'}" v-model="solicitanteRef.segundo_nombre")
                ElInput(placeholder="Escriba aquí" :style="{width:'80px'}" v-model="solicitanteRef.apellido_paterno")
                ElInput(placeholder="Escriba aquí" :style="{width:'80px'}" v-model="solicitanteRef.apellido_materno")
            ElTooltip(content="Fecha de nacimiento" placement="top")
                .flex.flex-row.items-center.gap-2(class="cursor-pointer" v-if="!editMode")
                    Icon(name='tabler:calendar').text-slate-500
                    span.text-sm.text-slate-500 {{solicitanteRef.fecha_nacimiento}}
                div(v-else)
                    ElDatePicker(
                        :class="inputClasses"
                        :style="{width:'100px'}" 
                        placeholder="seleccione" 
                        @change="formatDate"
                        v-model="solicitanteRef.fecha_nacimiento")
                    
            ElTooltip(content="Género" placement="top")    
                .flex.flex-row.items-center.gap-2(class="cursor-pointer")
                    Icon(name='tabler:mars').text-slate-500
                    span.text-sm.text-slate-500(v-if="!editMode") {{solicitanteRef.genero}}
                    ElSelect(v-else :class="inputClasses"  v-model="solicitanteRef.genero" :style="{width:'80px'}")
                        ElOption(label="Masculino" value="Masculino")
                        ElOption(label="Femenino" value="Femenino")

        .grid.items-center.h-full.border-l-2.border-green-600.rounded-md
                .ml-2.grid.gap-1.items-center
                    p.text-xl.font-semibold.text-green-800.ml-2 Datos de contacto
                    .flex.flex-row.items-start.h-full
                        ElTooltip(v-if="!editMode" :content="solicitanteRef.direccion" placement="top")
                            .flex.flex-row.items-center.gap-2(class="cursor-pointer")
                                Icon(name="tabler:map-pin-share" size="22").text-green-600
                                p.text-md Dirección
                        ElInput(v-else :style="{width:'180px'}" :class="inputClasses"  size="small" placeholder="Escriba aquí" v-model="solicitanteRef.direccion")
                    .flex.flex-row.items-start.h-full
                        ElTooltip(v-if="!editMode" :content="solicitanteRef.correo" placement="top")
                            .flex.flex-row.items-center.gap-2(class="cursor-pointer")
                                Icon(name="tabler:brand-gmail" size="22").text-blue-600
                                p Correo
                        ElInput(v-else :style="{width:'180px'}" :class="inputClasses"  size="small" placeholder="Escriba aquí" v-model="solicitanteRef.correo")
                        
                    .flex.flex-row.items-start.h-full
                        ElTooltip(v-if="!editMode" :content="solicitanteRef.telefono" placement="top")
                            .flex.flex-row.items-center.gap-2(class="cursor-pointer")
                                Icon(name="tabler:device-mobile-vibration" size="22").text-yellow-600
                                p Télefono
                        ElInput(v-else
                                 placeholder="Escriba aquí..." 
                                :class="inputClasses" 
                                v-model="solicitanteRef.telefono" 
                                size="small" 
                                :style="{width:'90px'}")
        .grid.items-center.h-full.border-l-2.border-green-600.rounded-md
                .ml-2.grid.gap-1.items-center
                    p.text-xl.font-semibold.text-green-800.ml-2 Datos personales
                    .flex.flex-row.items-start.h-full
                        ElTooltip(v-if="!editMode" :content="solicitanteRef.carnet" placement="top")
                            .flex.flex-row.items-center.gap-2(class="cursor-pointer")
                                Icon(name="tabler:align-box-center-stretch" size="22").text-green-600
                                p.text-md Carnet de identidad
                        ElInput(v-else
                                 placeholder="Escriba aquí..." 
                                :class="inputClasses" 
                                v-model="solicitanteRef.carnet" 
                                size="small" 
                                :style="{width:'90px'}")
                    .flex.flex-row.items-start.h-full
                        ElTooltip(v-if="!editMode" :content="solicitanteRef.tomo" placement="top")
                            .flex.flex-row.items-center.gap-2(class="cursor-pointer")
                                Icon(name="tabler:box-margin" size="25").text-blue-600
                                p Tomo
                        ElInput(v-else
                                 placeholder="Escriba aquí..." 
                                :class="inputClasses" 
                                v-model="solicitanteRef.tomo" 
                                size="small" 
                                :style="{width:'90px'}")
                    .flex.flex-row.items-start.h-full
                        ElTooltip(v-if="!editMode" :content="solicitanteRef.folio" placement="top")
                            .flex.flex-row.items-center.gap-2(class="cursor-pointer")
                                Icon(name="tabler:braille" size="25").text-yellow-600
                                p Folio
                        ElInput(v-else
                                 placeholder="Escriba aquí..." 
                                :class="inputClasses" 
                                v-model="solicitanteRef.folio" 
                                size="small" 
                                :style="{width:'90px'}")
        
        .grid.items-center.h-full.border-l-2.border-green-600.rounded-md(v-if="solicitanteRef.tipo_mipyme")
                .ml-2
                    p.text-xl.font-semibold.text-green-800.ml-2 Solicita
                    .flex.flex-row.items-start.h-full
                        ElTooltip(v-if="!editMode" :content="solicitanteRef?.tipo_mipyme.nombre" placement="top")
                            .flex.flex-row.items-center.gap-2(class="cursor-pointer")
                                Icon(name="tabler:align-box-center-stretch" size="22").text-green-600
                                p.text-md {{solicitanteRef?.tipo_mipyme.nombre}}
                        ElSelect(v-else
                                        :placeholder='solicitanteRef.tipo_mipyme.nombre'
                                        :class="inputClasses" 
                                        v-model="solicitanteRef.tipo_mypime_id" 
                                        size="small" 
                                        :style="{width:'90px'}")
                            ElOption(
                                            v-for="tipoMypime in tiposMipymesRef"
                                            :key="tipoMypime.id"
                                            :label="tipoMypime.nombre"
                                            :value="tipoMypime.id"
                                            )
                                        
        div.absolute.right-10
            ElButton(type="success" :class="inputClasses" :disabled="!isComplete" @click="editSolicitante" v-if="editMode && isComplete")
                Icon(name="tabler:check" size="25").text-white         
            ElDropdown( placement="bottom")
                ElButton(text)
                    Icon(name="tabler:dots" size="25").text-green-800
                template(#dropdown)
                    ElDropdownItem(@click="editMode=!editMode")
                        span {{editMode===false ? 'Actualizar información' : 'Cancelar edición'}}
                    ElDropdownItem(@click="open")
                        span.text-red-600 Eliminar
                    
                
</template>