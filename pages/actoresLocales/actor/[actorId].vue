<script setup lang="ts">
import { Check, Delete, Edit, Message, Search, Star } from "@element-plus/icons-vue";
import { ElLoading } from "element-plus";
import type { IFormCreationActor } from "~/components/ActoresEconomicos/DialogCreateActor.vue";
const route = useRoute();
const actorId = route.params.actorId;
const editMode = ref<boolean>(false);
const { $api } = useNuxtApp();
const { data, execute } = useAsyncData(async () => {
  const [
    newActor,
    denominaciones,
    tiposSujetos,
    actividadesEconomicas,
    actividadesEconomicasCnae,
    tiposMypimes,
    sectoresEconomicos,
    origenes,
    solicitantes,
  ] = await Promise.all([
    $api.actorEconomico.obtenerActorEconomicoById(Number(actorId)),
    $api.denominacion.obtenerDenominaciones(),
    $api.tipoSujeto.obtenerTiposSujetos(),
    $api.actividadEconomica.obtenerActividadesEconomicas(),
    $api.actividadEconomicaCNAE.obtenerActividadesEconomicas(),
    $api.tipoMipyme.obtenerTiposMipymes(),
    $api.sectorEconomico.obtenerSectoresEconomicos(),
    $api.origen.obtenerOrigenes(),
    $api.solicitante.obtenerSolicitantes(),
  ]);
  return {
    newActor,
    denominaciones,
    tiposSujetos,
    actividadesEconomicas,
    actividadesEconomicasCnae,
    tiposMypimes,
    sectoresEconomicos,
    origenes,
    solicitantes,
  };
});


const actor = ref<IFormCreationActor>({
  numero: data.value?.newActor?.numero ?? 0,
  nombre: data.value?.newActor?.nombre ?? "",
  solicitud: data.value?.newActor?.solicitud ?? '',
  actividad_principal_CNAE_id: data.value?.newActor?.actividad_principal_CNAE_id ?? 0,
  denominacion_id: data.value?.newActor?.denominacion_id ?? 0,
  tipo_sujeto_id: data.value?.newActor?.tipo_sujeto_id ?? 0,
  actividad_economica_principal_id:
  data.value?.newActor?.actividad_economica_principal_id ?? null,
  solicitante_id: data.value?.newActor?.solicitante_id ?? null,
  tipo_mypime_id: data.value?.newActor?.tipoMypime.id ?? null,
  sector_economico_id: data.value?.newActor?.sector_economico_id ?? null,
  origen_id: data.value?.newActor?.origen_id ?? null,
  telefono: data.value?.newActor?.solicitante.telefono ?? "",
  correo_representante: data.value?.newActor?.solicitante.correo ?? "",
  domicilio_social: data.value?.newActor?.domicilio_social ?? "",
  cantidad_socios: data.value?.newActor?.cantidad_socios ?? 0,
  cantidad_trabajadores: data.value?.newActor?.cantidad_trabajadores ?? 0,
  cantidad_estatales: data.value?.newActor?.cantidad_estatales ?? 0,
  cantidad_TPCP: data.value?.newActor?.cantidad_TPCP ?? 0,
  cantidad_CNA: data.value?.newActor?.cantidad_CNA ?? 0,
  cantidad_desempleados: data.value?.newActor?.cantidad_desempleados ?? 0,
  cantidad_otros_origenes: data.value?.newActor?.cantidad_otros_origenes ?? 0,
  cantidad_ocupados: data.value?.newActor?.cantidad_ocupados ?? 0,
  pdl: data.value?.newActor?.pdl ?? "",
  folio_inscripcion: data.value?.newActor?.folio_inscripcion ?? "",
  hoja_inscripcion: data.value?.newActor?.hoja_inscripcion ?? "",
  fecha_incripcion: data.value?.newActor?.fecha_incripcion ?? "",
  is_exportador: data.value?.newActor?.is_exportador ?? false,
  inscrito_registro_mercantil: data.value?.newActor?.inscrito_registro_mercantil ?? false,
  is_incubado_en_parque_cientifico:
    data.value?.newActor?.is_incubado_en_parque_cientifico ?? false,
  desistimiento_con_carta_de_socios:
    data.value?.newActor?.desistimiento_con_carta_de_socios ?? false,
  is_disuelta: data.value?.newActor?.is_disuelta ?? false,
  is_inactiva: data.value?.newActor?.is_inactiva ?? false,
});
const pages = ref<number>(1);
const isComplete = ref<boolean>(false)
watch(
  actor,
  (newVal) => {
    actor.value = newVal;
    if(
    actor.value.nombre.trim()!==''
    && actor.value.numero
    && actor.value.actividad_economica_principal_id 
    && actor.value.actividad_principal_CNAE_id 
    && actor.value.denominacion_id 
    && actor.value.tipo_mypime_id 
    && actor.value.tipo_sujeto_id 
    && actor.value.origen_id 
    && actor.value.solicitante_id 
    && actor.value.sector_economico_id 
    && actor.value.solicitud.trim() !== ''    
    && actor.value.folio_inscripcion.trim() !== ''    
    && actor.value.hoja_inscripcion.trim() !== ''    
    && actor.value.fecha_incripcion !== ''    
    && actor.value.pdl.trim() !== ''    
    && actor.value.correo_representante.trim() !== ''
    && actor.value.correo_representante.trim().includes('@')    
    && actor.value.correo_representante.trim().includes('.')    
    && actor.value.cantidad_CNA    
    && actor.value.cantidad_TPCP    
    && actor.value.cantidad_desempleados    
    && actor.value.cantidad_trabajadores    
    && actor.value.cantidad_ocupados    
    && actor.value.cantidad_socios    
    && actor.value.cantidad_estatales    
    && actor.value.telefono.trim()!==''   
    && actor.value.telefono.length >=8 || actor.value.telefono.length <= 11 
  ){
    isComplete.value = true
  }
  },
  { deep: true }
);

watch(
  () => pages.value,
  (newValue) => {
    pages.value = newValue;
  },
  { deep: true }
);

watch(
  () => actorId,
  (newValue) => {
    execute();
  }
);
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

const deleteActor = async () => {
    try{
        const loading = ElLoading.service({
        lock: true,
        text: "Eliminando actor...",
        background: "rgba(0, 0, 0, 0.7)",
            });
            await $api.actorEconomico.eliminarActorEconomico(Number(actorId))
            const router = useRouter()
            loading.close()
            router.go(-1)
            ElNotification({
                type: 'success',
                title: "Completado",
                'duration': 2000,
                message:'Actor eliminado correctamente'
            })
       }catch(e){
        console.error(e)
    }
    console.log("eliminando actor")
}
const clicked = ref(false)
function onCancel() {
  clicked.value = true
}
const handleEditMode = () => {
    editMode.value = !editMode.value
    if(editMode.value === true && !isComplete.value ){
        ElNotification({
            type: "warning",
            message:"Asegúrese de completar todos los datos del actor para completar la actualización, no será posible guardar los datos hasta completarlos para mantener la integridad de los datos",
            title: "Advertencia"
        })
    }
}
const editActor = async()=>{
    if(actor.value){
      const loading =  ElLoading.service({
            lock: true,
        text: "Actualizando actor...",
        background: "rgba(0, 0, 0, 0.7)", 
        })
        const response = await $api.actorEconomico.actualizarActorEconomico(Number(actorId), actor.value)
        if(response.id){
            execute()
            loading.close()
            ElNotification({
                message:'Actor actualizado correctamente',
                type: 'success',
                title: 'Completado'
            })
        }else{
            loading.close()
            ElNotification({
                message:'Fallo en la actualizacion de este actor, verifique los campos',
                type: 'error',
                title: 'Error'
            })
        }
    }
}

const formatDate = (date: Date) => {
    actor.value.fecha_incripcion = date.toISOString().split("T")[0];
}
</script>

<template lang="pug">
.w-full.grid.items-center.bg-white.gap-4.p-4.rounded-md.mx-auto.max-w-3xl(class="h-[35rem] overflow-auto")
    .flex.flex-row.items-center.gap-2
        ElButton(text @click="$router.go(-1)").gap-2.items-center.flex.flex-row
            Icon(name="tabler:arrow-left" size="30").text-green-600
        Icon(name="tabler:folder-dollar" size="30").text-green-600
        p.text-2xl {{data?.newActor?.nombre}}
        ElTooltip(content="Editar actor" placement="top-start")
            ElButton(type="primary" @click="handleEditMode" :icon="Edit").gap-2.items-center.flex.flex-row
        ElTooltip(content="Confirmar" v-if="isComplete" placement="top-start")
            ElButton(type="success" @click="editActor" :icon="Check" v-show="editMode").gap-2.items-center.flex.flex-row
        
        //- ElTooltip(content="Eliminar actor" placement="top-start")
        ElPopconfirm(title="¿Está seguro que desea eliminar este actor?" 
        @cancel="onCancel" 
        @confirm="deleteActor"
        confirm-button-text="Si"
        cancel-button-text="No"
        )
                template(#reference)
                    ElButton(type="danger" :icon="Delete").gap-2.items-center.flex.flex-row
                

    .flex.flex-row.gap-3.w-full.items-center.justify-center(v-if="data?.newActor")
                ElButton(text @click="pages--" v-show="pages>1")
                    Icon(name="tabler:arrow-left" size="25").text-blue-400
                ElSteps(v-model="pages" :space="200" :active="pages")
                    ElStep(description="Clasificaciones").text-sm
                    ElStep(description="Datos del actor").text-sm
                    ElStep(description="Datos adicionales").text-sm
                ElButton(text @click="pages++" v-show="pages<3")
                    Icon(name="tabler:arrow-right" size="25").text-blue-400
    El-scrollbar( height="400px")
        .grid.items-start.gap-4.w-full(v-if="pages === 1" class="animate__animated animate__fadeInLeftBig")
            .flex.flex-col.justify-start.items-center.gap-3.mx-auto
                .flex.flex-row.items-center.gap-2.justify-between.w-full
                        //- Nombre del actor
                        p.text-md Nombre:
                        .flex.flex-row.items-center.gap-2.w-full
                            p.text-md.p-2.rounded.bg-green-50.w-full(v-if="!editMode") {{data?.newActor?.nombre}}
                            ElInput(v-else v-model="actor.nombre" placeholder="Escriba aquí...").w-full
                    
                .flex.flex-row.items-center.gap-2.justify-between.w-full
                        //- Nombre del actor
                        p.text-md Solicitud:
                        .flex.flex-row.items-start.gap-2.w-full
                            p.text-md.p-2.rounded.bg-green-50.w-full(v-if="!editMode") {{data?.newActor?.solicitud}}
                            ElInput(v-else v-model="actor.solicitud" placeholder="Escriba aquí...").w-full
                //- Numero
                .flex.flex-row.items-center.gap-2.w-full
                            p.text-md.whitespace-nowrap Número:
                            p.text-md.p-2.rounded.bg-green-50.w-full(v-if="!editMode") {{data?.newActor?.numero}}
                            ElInputNumber(v-else v-model="actor.numero" placeholder="Seleccione...")


                .flex.flex-row.items-center.gap-2.justify-between.w-full
                    //- Denominacion
                    p.text-md Denominación 
                    .flex.flex-row.items-start.gap-2.w-full
                            p.text-md.p-2.rounded.bg-green-50.w-full(v-if="!editMode") {{data?.newActor?.denominacion?.nombre}}
                            ElSelect(v-else v-model="actor.denominacion_id" :options="data.denominaciones" placeholder="Seleccione...")
                                ElOption(
                                    v-for="denominacion in data.denominaciones"
                                    :key="denominacion.id"
                                    :label="denominacion.nombre"
                                    :value="denominacion.id"
                                )
                .flex.flex-row.items-center.gap-2.justify-between.w-full
                    //- Tipo de Sujeto
                    p.text-md.whitespace-nowrap Tipo de sujeto
                    .flex.flex-row.items-start.gap-2.w-full
                            p.text-md.p-2.rounded.bg-green-50.w-full(v-if="!editMode") {{data?.newActor?.tipoSujeto?.nombre}} 
                            ElSelect(v-else v-model="actor.tipo_sujeto_id" placeholder="Seleccione...") 
                                ElOption(
                                        v-for="tipoSujeto in data.tiposSujetos"
                                        :key="tipoSujeto.id"
                                        :label="tipoSujeto.nombre"
                                        :value="tipoSujeto.id"
                                    )
                .flex.flex-row.items-center.gap-2.justify-between.w-full
                    //- Actividad económica principal (CNAE)
                    p.text-md.whitespace-nowrap Actividad econ. princ. (CNAE)
                    .flex.flex-row.items-start.gap-2.w-full
                            p.text-md.p-2.rounded.bg-green-50.w-full(v-if="!editMode") {{data?.newActor?.actividadEconomicaPrincipalCNAE?.nombre}}
                            ElSelect(v-else v-model="actor.actividad_principal_CNAE_id" placeholder="Seleccione...")
                                ElOption(
                                            v-for="aeCnae in data.actividadesEconomicasCnae"
                                            :key="aeCnae.id"
                                            :label="aeCnae.nombre"
                                            :value="aeCnae.id"
                                        )
                .flex.flex-row.items-center.gap-2.justify-between.w-full
                    //- Actividad económica principal
                    p.text-md.whitespace-nowrap Actividad econ. princ.
                    .flex.flex-row.items-start.gap-2.w-full
                            p.text-md.p-2.rounded.bg-green-50.w-full(v-if="!editMode") {{data?.newActor?.actividadEconomicaPrincipal?.nombre}}
                            ElSelect(v-else v-model="actor.actividad_economica_principal_id" placeholder="Seleccione..." )
                                ElOption(
                                        v-for="actividadEconomica in data.actividadesEconomicas"
                                        :key="actividadEconomica.id"
                                        :label="actividadEconomica.nombre"
                                        :value="actividadEconomica.id"
                                                )
                .flex.flex-row.items-center.gap-2.justify-between.w-full
                    //- Tipo mipyme
                    p.text-md.whitespace-nowrap Tipo mipyme
                    .flex.flex-row.items-start.gap-2.w-full
                            p.text-md.p-2.rounded.bg-green-50.w-full(v-if="!editMode") {{data?.newActor?.tipoMypime?.nombre}}
                            ElSelect(v-else v-model="actor.tipo_mypime_id" placeholder="Seleccione...")
                                ElOption(
                                            v-for="tipoMypime in data.tiposMypimes"
                                            :key="tipoMypime.id"
                                            :label="tipoMypime.nombre"
                                            :value="tipoMypime.id"
                                        )
                .flex.flex-row.items-center.gap-2.justify-between.w-full
                    //- Sector economico
                    p.text-md.whitespace-nowrap Sector económico
                    .flex.flex-row.items-start.gap-2.w-full
                            p.text-md.p-2.rounded.bg-green-50.w-full(v-if="!editMode") {{data?.newActor?.sectorEconomico?.nombre}}
                            ElSelect(v-else v-model="actor.sector_economico_id" placeholder="Seleccione...")
                                ElOption(
                                                v-for="sectorEconomico in data.sectoresEconomicos"
                                                :key="sectorEconomico.id"
                                                :label="sectorEconomico.nombre"
                                                :value="sectorEconomico.id"
                                            )
                .flex.flex-row.items-center.gap-2.justify-between.w-full
                    //- Origen
                    p.text-md.whitespace-nowrap Origen
                    .flex.flex-row.items-start.gap-2.w-full
                            p.text-md.p-2.rounded.bg-green-50.w-full(v-if="!editMode") {{data?.newActor?.origen?.nombre}}
                            ElSelect(v-else v-model="actor.origen_id" placeholder="Seleccione...")
                                ElOption(
                                       v-for="origen in data.origenes"
                                       :key="origen.id"
                                       :label="origen.nombre"
                                       :value="origen.id"
                                                )
        .grid.items-start.gap-4.w-full(v-else-if="pages === 2" class="animate__animated animate__fadeInLeftBig")
            .flex.flex-col.justify-start.items-center.gap-3.mx-auto
                .flex.flex-row.items-center.gap-2.justify-between.w-full
                    //- Solicitante
                    p.text-md.whitespace-nowrap Solicitante:
                    .flex.flex-row.items-start.gap-2.w-full
                            p.text-md.p-2.rounded.bg-green-50.w-full(v-if="!editMode") {{data?.newActor?.solicitante?.nombre}} {{data?.newActor?.solicitante?.apellido_paterno}} {{data?.newActor?.solicitante?.apellido_materno}}
                            ElSelect(v-else v-model="actor.solicitante_id" )
                                ElOption(
                                        v-for="solicitante in data.solicitantes"
                                        :key="solicitante.id"
                                        :label="solicitante?.nombre + ' ' + solicitante?.apellido_paterno + ' ' + solicitante.apellido_materno"
                                        :value="solicitante.id"
                                           )
                .flex.flex-row.items-center.gap-2.justify-between.w-full
                    //- correo del representante
                    p.text-md.whitespace-nowrap Correo del representante:
                    .flex.flex-row.items-start.gap-2.w-full
                            p.text-md.p-2.rounded.bg-green-50.w-full(v-if="!editMode") {{data?.newActor?.solicitante.correo}}
                            ElInput(v-else type="email" v-model="actor.correo_representante" placeholder="ejemplo@gmail.com")
                            
                            
                .flex.flex-row.items-center.gap-2.justify-between.w-full
                    //- Telefono
                    p.text-md.whitespace-nowrap Teléfono:
                    .flex.flex-row.items-start.gap-2.w-full
                            p.text-md.p-2.rounded.bg-green-50.w-full(v-if="!editMode") {{data?.newActor?.solicitante?.telefono}}
                            ElInput(v-else v-model="actor.telefono" placeholder="Escriba aquí...")
                            
                .flex.flex-row.items-center.gap-2.justify-between.w-full
                    //- Domicilio social
                    p.text-md.whitespace-nowrap Domicilio social:
                    .flex.flex-row.items-start.gap-2.w-full
                            p.text-md.p-2.rounded.bg-green-50.w-full(v-if="!editMode") {{data?.newActor?.domicilio_social}}
                            ElInput(v-else type="text" v-model="actor.domicilio_social" placeholder="Escriba aquí...")
                
                .flex.flex-row.items-center.gap-2.justify-between.w-full
                    //- Cantidad de socios
                    p.text-md.whitespace-nowrap Cantidad de socios:
                    .flex.flex-row.items-start.gap-2.w-full
                            p.text-md.p-2.rounded.bg-green-50.w-full(v-if="!editMode") {{data?.newActor?.cantidad_socios}}
                            ElInputNumber(v-else :min="1" placeholder="Seleccionar..." v-model="actor.cantidad_socios" )
                    
                   
                
                .flex.flex-row.items-center.gap-2.justify-between.w-full
                    //- cantidad de trabajadores
                    p.text-md.whitespace-nowrap Cantidad de trabajadores:
                    .flex.flex-row.items-start.gap-2.w-full
                            p.text-md.p-2.rounded.bg-green-50.w-full(v-if="!editMode") {{data?.newActor?.cantidad_trabajadores}}
                            ElInputNumber(v-else type="number" :min="1" placeholder="Seleccionar..." v-model="actor.cantidad_trabajadores" )
                
                
                .flex.flex-row.items-center.gap-2.justify-between.w-full
                    //- Cantidad de estatales
                    p.text-md.whitespace-nowrap Cantidad de estatales:
                    .flex.flex-row.items-start.gap-2.w-full
                            p.text-md.p-2.rounded.bg-green-50.w-full(v-if="!editMode") {{data?.newActor?.cantidad_estatales}}
                            ElInputNumber(v-else :min="1" v-model="actor.cantidad_estatales" placeholder="Seleccionar..." )
                
                .flex.flex-row.items-center.gap-2.justify-between.w-full
                    //- Cantidad de TCP
                    p.text-md.whitespace-nowrap Cantidad de TCP:
                    .flex.flex-row.items-start.gap-2.w-full
                            p.text-md.p-2.rounded.bg-green-50.w-full(v-if="!editMode") {{data?.newActor?.cantidad_TPCP}}
                            ElInputNumber(v-else :min="1" v-model="actor.cantidad_TPCP" placeholder="Seleccionar...")
                
                .flex.flex-row.items-center.gap-2.justify-between.w-full
                    //- Cantidad de CNAA
                    p.text-md.whitespace-nowrap Cantidad de CNAA:
                    .flex.flex-row.items-start.gap-2.w-full
                            p.text-md.p-2.rounded.bg-green-50.w-full(v-if="!editMode") {{data?.newActor?.cantidad_CNA}}
                            ElInputNumber(v-else :min="1" v-model="actor.cantidad_CNA" placeholder="Seleccionar...")

        .grid.items-start.gap-4.w-full(v-else-if="pages === 3" class="animate__animated animate__fadeInLeftBig")
            .flex.flex-col.justify-start.items-center.gap-3.mx-auto
                .flex.flex-row.items-center.gap-2.justify-between.w-full
                    //- Cantidad de otros orígenes
                    p.text-md.whitespace-nowrap Cantidad de otros orígenes:
                    .flex.flex-row.items-start.gap-2.w-full
                            p.text-md.p-2.rounded.bg-green-50.w-full(v-if="!editMode") {{data?.newActor?.cantidad_otros_origenes}}
                            ElInputNumber(v-else :min="1" v-model="actor.cantidad_otros_origenes" placeholder="Seleccionar...")
                
                .flex.flex-row.items-center.gap-2.justify-between.w-full
                    //- cantidad de ocupados
                    p.text-md.whitespace-nowrap Cantidad de ocupados:
                    .flex.flex-row.items-start.gap-2.w-full
                            p.text-md.p-2.rounded.bg-green-50.w-full(v-if="!editMode") {{data?.newActor?.cantidad_ocupados}}
                            ElInputNumber(v-else :min="1" v-model="actor.cantidad_ocupados" placeholder="Seleccionar...")
                            
                            
                .flex.flex-row.items-center.gap-2.justify-between.w-full
                    //- PDL
                    p.text-md.whitespace-nowrap PDL:
                    .flex.flex-row.items-start.gap-2.w-full
                            p.text-md.p-2.rounded.bg-green-50.w-full(v-if="!editMode") {{data?.newActor?.pdl}}
                            ElInput(v-else v-model="actor.pdl"  placeholder="Escriba aquí...")
                            
                .flex.flex-row.items-center.gap-2.justify-between.w-full
                    //- Folio de inscripción
                    p.text-md.whitespace-nowrap Folio de inscripción:
                    .flex.flex-row.items-start.gap-2.w-full
                            p.text-md.p-2.rounded.bg-green-50.w-full(v-if="!editMode") {{data?.newActor?.folio_inscripcion}}
                            ElInput(v-else v-model="actor.folio_inscripcion" placeholder="Escriba aquí...")
                
                .flex.flex-row.items-center.gap-2.justify-between.w-full
                    //- Hoja de inscripción
                    p.text-md.whitespace-nowrap Hoja de inscripción:
                    .flex.flex-row.items-start.gap-2.w-full
                            p.text-md.p-2.rounded.bg-green-50.w-full(v-if="!editMode") {{data?.newActor?.hoja_inscripcion}}
                            ElInput(v-else v-model="actor.hoja_inscripcion" placeholder="Escriba aquí...")
                
                
                .flex.flex-row.items-center.gap-2.justify-between.w-full
                    //- fecha de inscripción
                    p.text-md.whitespace-nowrap Fecha de inscripción:
                    .flex.flex-row.items-start.gap-2.w-full
                            p.text-md.p-2.rounded.bg-green-50.w-full(v-if="!editMode") {{data?.newActor?.fecha_inscripcion.toString()}}
                            ElDatePicker(
                                v-else 
                                v-model="actor.fecha_incripcion" 
                                @chance="formatDate" 
                                placeholder="Seleccione una fecha...")
                
                .flex.flex-col.items-center.gap-2.justify-between.w-full
                    .flex.flex-row.items-center.gap-2.justify-between.w-full
                        
                    
                        //- Exportador
                        p.text-md.whitespace-nowrap Exportador:
                        .flex.flex-row.items-start.gap-2.w-full
                                div.text-md.p-2.rounded.bg-green-50.w-full(v-if="!editMode") 
                                    p(v-if="actor.is_exportador") Si
                                    p(v-else) No
                                ElSwitch(v-else v-model="actor.is_exportador" )
                    
                        p.text-md.whitespace-nowrap Disuelta:
                        .flex.flex-row.items-start.gap-2.w-full
                                div.text-md.p-2.rounded.bg-green-50.w-full(v-if="!editMode") 
                                    p(v-if="actor.is_disuelta") Si
                                    p(v-else) No
                                ElSwitch(v-else v-model="actor.is_disuelta" )
                    
                        p.text-md.whitespace-nowrap Inactiva:
                        .flex.flex-row.items-start.gap-2.w-full
                                div.text-md.p-2.rounded.bg-green-50.w-full(v-if="!editMode") 
                                    p(v-if="actor.is_inactiva") Si
                                    p(v-else) No
                                ElSwitch(v-else v-model="actor.is_inactiva" )
                    
                    .flex.flex-row.items-center.gap-2.justify-between.w-full
                        //- Inscrito en el registro mercantil
                        p.text-md.whitespace-nowrap Inscrito en el registro mercantil:
                        .flex.flex-row.items-start.gap-2.w-full
                        div.text-md.p-2.rounded.bg-green-50.w-full(v-if="!editMode") 
                            p(v-if="actor.inscrito_registro_mercantil") Si
                            p(v-else) No
                        ElSwitch(v-else v-model="actor.inscrito_registro_mercantil" )

                        p.text-md.whitespace-nowrap Incubado en parque científico:
                        .flex.flex-row.items-start.gap-2.w-full
                                div.text-md.p-2.rounded.bg-green-50.w-full(v-if="!editMode") 
                                    p(v-if="actor.is_incubado_en_parque_cientifico") Si
                                    p(v-else) No
                                ElSwitch(v-else v-model="actor.is_incubado_en_parque_cientifico" )

</template>
