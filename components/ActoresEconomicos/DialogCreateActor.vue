<script lang="ts" setup>
import type { IActividadEconomicaResponse, IActividadPrincipalCNAEResponse, IDenominacionResponse, IOrigenResponse, ISectorEconomicoResponse, ISolicitanteResponse, ITipoMIPYMEResponse, ITipoSujetoResponse } from '~/models/models';

interface Props {
visibilityDialog: boolean;
denominaciones: Array<IDenominacionResponse>
solicitantes: Array<ISolicitanteResponse>
tiposMipymes: Array<ITipoMIPYMEResponse>
tiposSujetos: Array<ITipoSujetoResponse>
origenes: Array<IOrigenResponse>
sectoresEconomicos : Array<ISectorEconomicoResponse>
actividadesEconomicas: Array<IActividadEconomicaResponse>
actividadesEconomicasCnae: Array<IActividadPrincipalCNAEResponse>
}
const router = useRouter()
const props = defineProps<Props>();
const {$api} = useNuxtApp()
export interface IFormCreationActor {
    nombre : string;
    numero: number | null
    solicitud : string;
    actividad_principal_CNAE_id:number | null; //FK
    denominacion_id: number | null; //FK
    tipo_sujeto_id:number | null; //FK
    actividad_economica_principal_id:number | null; //FK
    solicitante_id:number | null; //FK
    tipo_mypime_id:number | null;//FK
    sector_economico_id:number | null;//FK
    origen_id:number | null; //FK
    telefono: string;
    correo_representante:string;
    domicilio_social : string;
    cantidad_socios: number | null;
    cantidad_trabajadores: number | null;
    cantidad_estatales: number | null;
    cantidad_TPCP: number |null;
    cantidad_CNA: number | null;
    cantidad_desempleados: number | null;
    cantidad_otros_origenes: number | null;
    cantidad_ocupados: number | null;
    pdl : string;
    inscrito_registro_mercantil: boolean;
    folio_inscripcion:string;
    hoja_inscripcion: string;
    fecha_incripcion:string;
    is_exportador:boolean;
    is_incubado_en_parque_cientifico:boolean;
    desistimiento_con_carta_de_socios:boolean;
    is_disuelta:boolean;
    is_inactiva:boolean;
}
const formCreationActor = ref<IFormCreationActor>({
  nombre : '',
  numero:null,
  actividad_economica_principal_id: null,
  actividad_principal_CNAE_id : null,
  cantidad_CNA : null,
  cantidad_desempleados: null,
  cantidad_estatales : null, 
  cantidad_ocupados : null,
  cantidad_otros_origenes : null ,
  cantidad_socios : null ,
  cantidad_TPCP : null ,
  cantidad_trabajadores : null ,
  correo_representante : '',
  fecha_incripcion: '',
  denominacion_id: null,
  desistimiento_con_carta_de_socios : false,
  domicilio_social: '',
  folio_inscripcion : '',
  hoja_inscripcion : '',
  inscrito_registro_mercantil : false,
  is_disuelta : false , 
  is_exportador : false,
  is_inactiva : false,
  is_incubado_en_parque_cientifico : false ,
   origen_id: null,
   pdl : '',
   sector_economico_id : null,
   solicitante_id: null,
   solicitud: '',
   telefono: '',
   tipo_mypime_id: null,
   tipo_sujeto_id: null
})

const isVisible = ref<boolean>(props.visibilityDialog);
watch(
  () => props.visibilityDialog,
  (newValue) => {
    isVisible.value = newValue;
  },
  { deep: true }
);

watch(()=>formCreationActor.value, (newValue)=>{
  formCreationActor.value = newValue
  console.log(newValue)
  if(
    formCreationActor.value.nombre.trim()!==''
    && formCreationActor.value.numero
    && formCreationActor.value.actividad_economica_principal_id 
    && formCreationActor.value.actividad_principal_CNAE_id 
    && formCreationActor.value.denominacion_id 
    && formCreationActor.value.tipo_mypime_id 
    && formCreationActor.value.tipo_sujeto_id 
    && formCreationActor.value.origen_id 
    && formCreationActor.value.solicitante_id 
    && formCreationActor.value.sector_economico_id 
    && formCreationActor.value.solicitud.trim() !== ''    
    && formCreationActor.value.folio_inscripcion.trim() !== ''    
    && formCreationActor.value.hoja_inscripcion.trim() !== ''    
    && formCreationActor.value.fecha_incripcion !== ''    
    && formCreationActor.value.pdl.trim() !== ''    
    && formCreationActor.value.correo_representante.trim() !== ''    
    && formCreationActor.value.cantidad_CNA    
    && formCreationActor.value.cantidad_TPCP    
    && formCreationActor.value.cantidad_desempleados    
    && formCreationActor.value.cantidad_trabajadores    
    && formCreationActor.value.cantidad_ocupados    
    && formCreationActor.value.cantidad_socios    
    && formCreationActor.value.cantidad_estatales    
    && formCreationActor.value.telefono.trim()!==''    
  ){
    console.log("entrando en el if")
    isComplete.value = true
  }
},{deep:true})

const emit = defineEmits(["close-dialog"]);
const pages = ref<number>(1)
const isComplete = ref<boolean>(false)
const createActor = async () => {
    if(isComplete.value === true){
        try{

            const response = await $api.actorEconomico.crearActorEconomico(formCreationActor.value)
            if(response){
                ElNotification({
                    message:"Actor creado correctamente",
                    type:'success',
                    title:'Completado'
                })
                await router.push(`/actoresLocales/actor/${response.id}`)
        }
    }catch(e){
            ElNotification({
                message:"Ocurrió un error durante la creación del actor",
                type:'error',
                title:'Error'
            })
        }
    }
}
const formatDate = (date: Date) => {
    formCreationActor.value.fecha_incripcion = date.toISOString().split("T")[0];
}
</script>
<template lang="pug">
ElDialog(v-model="isVisible" :show-close="false" @before-close="emit('close-dialog')")
    p.text-center.text-green-800.font-semibold.text-2xl.mb-4 Inserte los datos del actor 
    p.text-sm.text-center Complete correctamente los datos del actor para confirmar la creación del mismo
    .grid.overflow-auto.h-96.justify-center.items-center.w-full
          
          //- paso 1
          div(class="w-full flex flex-col gap-2" v-show="pages===1" class="animate__animated animate__fadeInLeftBig")
            .flex.flex-row.items-center.justify-between.gap-2
                span Nombre
                ElInput(type="text" v-model="formCreationActor.nombre")
            .flex.flex-row.items-center.justify-between.gap-2
                span Solicitud
                ElInput(type="text" v-model="formCreationActor.solicitud")
            .flex.flex-row.items-center.justify-between.gap-2
                span Solicitante
                ElSelect(placeholder="Seleccionar..." default-value="0" v-model="formCreationActor.solicitante_id")
                    ElOption(
                            v-for="solicitante in props.solicitantes"
                            :key="solicitante.id"
                            :label="solicitante?.nombre + ' ' + solicitante?.apellido_paterno + ' ' + solicitante.apellido_materno"
                            :value="solicitante.id"
                            )
            .flex.flex-row.items-center.justify-between.gap-2
                span.whitespace-nowrap Actividad economica principal
                ElSelect(placeholder="Seleccionar..." default-value="0" v-model="formCreationActor.actividad_economica_principal_id")
                    ElOption(
                                v-for="actividad in props.actividadesEconomicas"
                                :key="actividad.id"
                                :label="actividad.nombre"
                                :value="actividad.id"
                                ) 

            .flex.flex-row.items-center.justify-between.gap-2
                span.whitespace-nowrap Actividad Principal (CNAE)
                ElSelect(placeholder="Seleccionar..." default-value="0" v-model="formCreationActor.actividad_principal_CNAE_id")
                    ElOption(
                            v-for="actividad in props.actividadesEconomicasCnae"
                            :key="actividad.id"
                            :label="actividad.nombre"
                            :value="actividad.id"
                            ) 
            .flex.flex-row.items-center.justify-between.gap-2
                span.whitespace-nowrap Tipo Sujeto
                ElSelect(placeholder="Seleccionar..." default-value="0" v-model="formCreationActor.tipo_sujeto_id")
                    ElOption(
                                v-for="tipoSujeto in props.tiposSujetos"
                                :key="tipoSujeto.id"
                                :label="tipoSujeto.nombre"
                                :value="tipoSujeto.id"
                                )
          //- paso 2
          div(class="w-full flex flex-col gap-2" v-show="pages===2" class="animate__animated animate__fadeInLeftBig")
      
            .flex.flex-row.items-center.justify-between.gap-2
                span.whitespace-nowrap Denominacion
                ElSelect(placeholder="Seleccionar..." default-value="0" v-model="formCreationActor.denominacion_id")
                    ElOption(
                            v-for="denominacion in props.denominaciones"
                            :key="denominacion.id"
                            :label="denominacion.nombre"
                            :value="denominacion.id"
                                    )

            .flex.flex-row.items-center.justify-between.gap-2
                span.whitespace-nowrap Orígen
                ElSelect(placeholder="Seleccionar..." v-model="formCreationActor.origen_id")
                    ElOption(
                             v-for="origen in props.origenes"
                             :key="origen.id"
                             :label="origen.nombre"
                             :value="origen.id"
                                    )
            .flex.flex-row.items-center.justify-between.gap-2
                span.whitespace-nowrap Tipo mipyme
                ElSelect(placeholder="Seleccionar..." v-model="formCreationActor.tipo_mypime_id")
                    ElOption(
                        v-for="tipoMipyme in props.tiposMipymes"
                        :key="tipoMipyme.id"
                        :label="tipoMipyme.nombre"
                        :value="tipoMipyme.id"
                        )
            .flex.flex-row.items-center.justify-between.gap-2
                span.whitespace-nowrap Sector economico
                ElSelect(placeholder="Seleccionar..." v-model="formCreationActor.sector_economico_id")
                    ElOption(
                            v-for="sectorEconomico in props.sectoresEconomicos"
                            :key="sectorEconomico.id"
                            :label="sectorEconomico.nombre"
                            :value="sectorEconomico.id"
                        )
            .flex.flex-row.items-center.justify-between.gap-2
                span.whitespace-nowrap Teléfono del representante
                ElInput(type="text" v-model="formCreationActor.telefono" placeholder="Escriba aquí")

            .flex.flex-row.items-center.justify-between.gap-2
                span.whitespace-nowrap Correo del representante
                ElInput(type="email" v-model="formCreationActor.correo_representante" placeholder="ejemplo@gmail.com")
          
          //- paso 3
          div(class="w-full flex flex-col gap-2" v-show="pages===3" class="animate__animated animate__fadeInLeftBig")
            .flex.flex-row.items-center.justify-between.gap-2
                span.whitespace-nowrap Domicilio social
                ElInput(type="text" v-model="formCreationActor.domicilio_social" placeholder="Escriba aquí...")
            
            .flex.flex-row.items-center.justify-between.gap-2
                span.whitespace-nowrap PDL
                ElInput(type="text" v-model="formCreationActor.pdl" placeholder="Escriba aquí...")
            
            .flex.flex-row.items-center.justify-between.gap-2
                span.whitespace-nowrap Folio de inscripción
                ElInput(type="text" v-model="formCreationActor.folio_inscripcion" placeholder="Escriba aquí...")
            
            .flex.flex-row.items-center.justify-between.gap-2
                span.whitespace-nowrap Hoja de inscripción
                ElInput(type="text" v-model="formCreationActor.hoja_inscripcion" placeholder="Escriba aquí...")
            
            .flex.flex-row.items-center.justify-between.gap-2
                span.whitespace-nowrap Fecha de inscripción 
                ElDatePicker(
                    type="date" 
                    format="YYYY-MM-DD" 
                    v-model="formCreationActor.fecha_incripcion"  
                    @change="formatDate"
                    placeholder="Seleccione una fecha...")
            
            .flex.flex-row.items-center.justify-between.gap-2
                span.whitespace-nowrap Cantidad de trabajadores
                ElInputNumber(placeholder="Seleccione" v-model="formCreationActor.cantidad_trabajadores" :min="1" :max="100")
            
            
                
          
          //- paso 4
          div(class="w-full grid gap-2" v-show="pages===4" class="animate__animated animate__fadeInLeftBig")
            
            .flex.flex-row.items-center.justify-between.gap-2
                span.whitespace-nowrap Cantidad de desempleados
                ElInputNumber(placeholder="Seleccione" v-model="formCreationActor.cantidad_desempleados" :min="1" :max="100")
            
            .flex.flex-row.items-center.justify-between.gap-2
                span.whitespace-nowrap Cantidad de CNA
                ElInputNumber(placeholder="Seleccione" v-model="formCreationActor.cantidad_CNA" :min="1" :max="100")

            .flex.flex-row.items-center.justify-between.gap-2
                span.whitespace-nowrap Cantidad de socios
                ElInputNumber(placeholder="Seleccione" v-model="formCreationActor.cantidad_socios" :min="1" :max="100")

            .flex.flex-row.items-center.justify-between.gap-2
                span.whitespace-nowrap Cantidad de TPCP
                ElInputNumber(placeholder="Seleccione" v-model="formCreationActor.cantidad_TPCP" :min="1" :max="100")
            
            .flex.flex-row.items-center.justify-between.gap-2
                span.whitespace-nowrap Cantidad de ocupados
                ElInputNumber(placeholder="Seleccione" v-model="formCreationActor.cantidad_ocupados" :min="1" :max="100")
            
            .flex.flex-row.items-center.justify-between.gap-2
                span.whitespace-nowrap Cantidad de otros orígenes
                ElInputNumber(placeholder="Seleccione" v-model="formCreationActor.cantidad_otros_origenes" :min="1" :max="100")

          div(class="w-full flex flex-col gap-2" v-show="pages===5" class="animate__animated animate__fadeInLeftBig")
            .flex.flex-row.items-center.justify-between.gap-2
                span.whitespace-nowrap Cantidad de estatales
                ElInputNumber(placeholder="Seleccione" v-model="formCreationActor.cantidad_estatales" :min="1" :max="100")
                
            .flex.flex-row.items-center.justify-between.gap-2
                span.whitespace-nowrap Número
                ElInputNumber(placeholder="Seleccione" v-model="formCreationActor.numero" :min="1" )
                
            
            .flex.flex-row.items-center.justify-between.gap-2
                span.whitespace-nowrap Exporta
                ElSwitch(v-model="formCreationActor.is_exportador")
       
            .flex.flex-row.items-center.justify-between.gap-2
                span.whitespace-nowrap Incubado en parque científico
                ElSwitch(v-model="formCreationActor.is_incubado_en_parque_cientifico")
           
            .flex.flex-row.items-center.justify-between.gap-2
                span.whitespace-nowrap Desistimiento con carta de socios
                ElSwitch(v-model="formCreationActor.desistimiento_con_carta_de_socios")
            .flex.flex-row.items-center.justify-between.gap-2
                span.whitespace-nowrap Disuelta
                ElSwitch(v-model="formCreationActor.is_disuelta")
            
            .flex.flex-row.items-center.justify-between.gap-2
                span.whitespace-nowrap Activa
                ElSwitch(v-model="formCreationActor.is_inactiva")

         


          .flex.flex-row.justify-center.items-center
            //- ElButton(text v-show="pages>1" @click="pages--")
            //-   span Volver
            //- ElButton( v-show="pages<5" type="primary" @click="pages++")
            //-   span Siguiente
            ElSlider(
                v-model="pages" 
                :min="1"
                :max="5" 
                :step="1"
                show-stops
                )
          .flex.flex-row.justify-center.items-center

            ElButton(@click="emit('close-dialog')" text)
                Icon(name="tabler:square-rounded-x" size="25").text-red-800
                span.text-red-800.font-semibold Cancelar
            ElButton(v-if="isComplete" @click="createActor" text)
                Icon(name="tabler:device-floppy" size="25").text-blue-800
                span.text-blue-800 Guardar datos

</template>

