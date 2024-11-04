<script setup lang="ts">
import type { IFilterOptions } from "~/components/ActoresEconomicos/AdjustamentsDrawe.vue";

const isDrawerOpen = ref(false);
const {$api} = useNuxtApp()
const isDialogVisible = ref<boolean>(false)
const {data, execute} = useAsyncData(async()=>{
	const loading = ElLoading.service({
    lock: true,
    text: "Cargando filtros...",
    background: "rgba(0, 0, 0, 0.7)",
  });
  const [
    denominaciones, 
    sectoresEconomicos,
    actividadesEconomicasPrincipales,
    actividadesCnae,
    solicitantes,
    origenes,
    tiposMipymes,
    tiposSujetos,
  ] = await Promise.all([
    $api.denominacion.obtenerDenominaciones(),
    $api.sectorEconomico.obtenerSectoresEconomicos(),
    $api.actividadEconomica.obtenerActividadesEconomicas(),
    $api.actividadEconomicaCNAE.obtenerActividadesEconomicas(),
    $api.solicitante.obtenerSolicitantes(),
    $api.origen.obtenerOrigenes(),
    $api.tipoMipyme.obtenerTiposMipymes(),
    $api.tipoSujeto.obtenerTiposSujetos()
  ])
  if(denominaciones 
  && sectoresEconomicos 
  && actividadesCnae 
  && actividadesEconomicasPrincipales 
  && solicitantes 
  && origenes 
  && tiposMipymes 
  && tiposSujetos) 
   setTimeout(() => {
  		loading.close();
  		}, 2000);
  return {
    denominaciones,
    sectoresEconomicos,
    actividadesCnae,
    actividadesEconomicasPrincipales,
    solicitantes,
    origenes,
    tiposMipymes,
    tiposSujetos
  }
})
const filtersFields = ref<IFilterOptions[]>([
  { id: 1, name: "Denominacion", checked: false, options: data.value?.denominaciones ?? [] },
  { id: 2, name: "Tipo mypime", checked: false, options: data.value?.tiposMipymes ?? [] },
  { id: 3, name: "Tipo sujeto", checked: false, options: data.value?.tiposSujetos ?? [] },
  { id: 4, name: "Solicitante", checked: false, options: data.value?.solicitantes ?? [] },
  { id: 5, name: "Sector económico", checked: false, options: data.value?.sectoresEconomicos ?? [] },
  { id: 6, name: "Actividad económica principal", checked: false, options: data.value?.actividadesEconomicasPrincipales ?? [] },
  { id: 7, name: "Actividad económica principal (CNAE)", checked: false, options: data.value?.actividadesCnae ?? [] },
  { id: 8, name: "Origen", checked: false, options: data.value?.origenes ?? [] },
  { id: 9, name: "Disuelta", checked: false, options: ["Si", "No"] },
  { id: 10, name: "Inactiva", checked: false, options: ["Si", "No"]},
  { id: 11, name: "Incubado en parque tecnológico", checked: false, options: ["Si", "No"] },
  { id: 12, name: "Exportada", checked: false , options: ["Si", "No"]},
  { id: 13, name: "Inscrito en registro mercantil", checked: false, options: ["Si", "No"] },
]);
const handleDrawerOpen = () => {
  if (isDrawerOpen.value === false) {
    isDrawerOpen.value = true;
  } else {
    isDrawerOpen.value = false;
  }
};
const filters = ref<Array<IFilterOptions>>([]);
export interface IFiltersRoute{
  denominacionId: number | null
  sectorEconomicoId:number | null
  tipoMipymeId:number | null
  tipoSujetoId:number | null
  actividadPrincipalId: number | null
  actividadPrincipalCnaeId:number | null
  origenId: number | null
  solicitanteId:number | null
}
const filtersPropsRoute = ref<IFiltersRoute>({
  denominacionId: null,
  actividadPrincipalCnaeId: null,
  actividadPrincipalId: null,
  origenId: null,
  sectorEconomicoId: null,
  solicitanteId: null,
  tipoMipymeId : null,
  tipoSujetoId: null
})
const handleOptions = (filter: IFilterOptions) => {
  if (filter !== null) {
    const index = filters.value.findIndex((f) => f.id === filter.id);
    if (index === -1) {
      filters.value.push(filter);
    } else {
      filters.value.splice(index, 1);
    }
  } else {
    filters.value = [];
  }
};
const handleFiltersSelected = (filter:IFilterOptions, optionId:number) => {
  if(filter.id===1){
    filtersPropsRoute.value.denominacionId = optionId
  }else if (filter.id===2){
    filtersPropsRoute.value.tipoMipymeId = optionId
  }else if (filter.id===3){
    filtersPropsRoute.value.tipoSujetoId = optionId
  }else if (filter.id===4){
    filtersPropsRoute.value.solicitanteId = optionId
  }else if (filter.id === 5 ){
    filtersPropsRoute.value.sectorEconomicoId = optionId
  }else if (filter.id ===6 ){
    filtersPropsRoute.value.actividadPrincipalId = optionId
  }else if (filter.id ===7){
    filtersPropsRoute.value.actividadPrincipalCnaeId = optionId
  }else if (filter.id ===8){
    filtersPropsRoute.value.origenId = optionId
  }else{
    filtersPropsRoute.value.denominacionId = null
    filtersPropsRoute.value.actividadPrincipalCnaeId = null
    filtersPropsRoute.value.sectorEconomicoId = null
    filtersPropsRoute.value.tipoMipymeId = null
    filtersPropsRoute.value.tipoSujetoId = null
    filtersPropsRoute.value.solicitanteId = null
    filtersPropsRoute.value.actividadPrincipalId = null
    filtersPropsRoute.value.origenId = null
  }
}
watch(()=>filters.value,(newValue)=>{
    filtersPropsRoute.value.denominacionId = null
    filtersPropsRoute.value.actividadPrincipalCnaeId = null
    filtersPropsRoute.value.sectorEconomicoId = null
    filtersPropsRoute.value.tipoMipymeId = null
    filtersPropsRoute.value.tipoSujetoId = null
    filtersPropsRoute.value.solicitanteId = null
    filtersPropsRoute.value.actividadPrincipalId = null
    filtersPropsRoute.value.origenId = null
},{deep:true})
</script>

<template lang="pug">
.w-full.grid.items-center.bg-white.gap-4.p-4.rounded-md
    .flex.flex-row.items-center.gap-2
        ElButton(text @click="$router.go(-1)").gap-2.items-center.flex.flex-row
            Icon(name="tabler:arrow-left" size="30").text-green-600
        Icon(name="tabler:folder-dollar" size="30").text-green-600
        p.text-2xl Actores locales
        ElTooltip(content="Crear actor")
          ElButton(@click="isDialogVisible=true" type="success" ) 
            Icon(name="tabler:plus").text-white
    hr.text-green-400.w-full
    .flex.flex-row.items-center.gap-2.w-full.justify-between(v-if="data")
        .flex.flex-row.items-center.gap-2
            Icon(name="tabler:eye-search" size="30").text-green-800
            ElInput(placeholder="Buscar actor" style="width: 200px;")
        .flex.flex-row.flex-wrap.items-start.gap-2.justify-start.w-full(v-if="filters.length")
            template(v-for="(filter,index) in filters" :key="index")
                el-dropdown(placement="bottom")
                    el-button(text ).gap-2.items-center.flex.flex-row
                            Icon(name="tabler:filter" size="30").text-green-800
                            p.text-md {{filter.name}}
                    template(#dropdown)
                        ElDropdownMenu
                          template(v-for="(option, index) in filter.options" :key="index")
                            ElDropdownItem(@click="handleFiltersSelected(filter, option.id)")
                                p  {{option.nombre}}
        .flex.flex-row.flex-wrap.items-start.gap-2.justify-start.w-full(v-else)
            .flex.flex-row.items-center.gap-2
                Icon(name="tabler:filter-off" size="30").text-green-800
                p.text-md.font-semibold No hay filtros aplicados

        .flex.flex-row.items-center.gap-2
            ElButton(text @click="isDrawerOpen=true").gap-2.items-center.flex.flex-row
                Icon(name="tabler:adjustments-horizontal" size="30").text-green-800
                p.text-md Ajustes
    .grid.items-center.w-full
        ActoresEconomicosAETable(
          class="animate__animated animate__fadeInLeftBig"
          :filters-to-route="filtersPropsRoute"
          )
        ActoresEconomicosAdjustamentsDrawe(
                                    :isDrawerOpen="isDrawerOpen" 
                                    @close="isDrawerOpen=false" 
                                    @onChange="handleOptions"
									                  :filter-fields="filtersFields"
									                  )
        ActoresEconomicosDialogCreateActor(
			v-if="data"
			@close-dialog="isDialogVisible=false"
			:visibility-dialog="isDialogVisible"
			:denominaciones="data.denominaciones"
			:solicitantes="data.solicitantes"
			:sectores-economicos="data.sectoresEconomicos"
			:actividades-economicas="data.actividadesEconomicasPrincipales"
			:actividades-economicas-cnae="data.actividadesCnae"
			:origenes="data.origenes"
			:tipos-mipymes="data.tiposMipymes"
			:tipos-sujetos="data.tiposSujetos"
		)


</template>
