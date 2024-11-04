<script lang="ts" setup>
import type { IFiltersRoute } from "~/pages/actoresLocales/index.vue";
interface Props{
  filtersToRoute : IFiltersRoute
}
const props = defineProps<Props>()
const filtersToRouteRef = ref<IFiltersRoute>(props.filtersToRoute)
const { $api } = useNuxtApp();
const loading = ref<boolean>(true);
const { data: actores, execute } = useAsyncData(async () => {
  console.log("Ejecutando de nuevo la data")
  loading.value = false;
  return await $api.actorEconomico.obtenerActoresEconomicos(
    filtersToRouteRef.value
  );
});
watch(()=>props.filtersToRoute, (newValue)=>{
  filtersToRouteRef.value = newValue
  execute()
},{deep:true})

const columns = [
  { key: "id", dataKey: "id", title: "No.", width: 80 },
  { key: "nombre", dataKey: "nombre", title: "Nombre", width: 150 },
  { key: "solicitud", dataKey: "solicitud", title: "Solicitud", width: 200 },
  {
    key: "solicitante.telefono",
    dataKey: "solicitante.telefono",
    title: "Teléfono",
    width: 120,
    cellRenderer: ({ rowData }: any) => rowData.solicitante?.telefono || "N/A",
  },
  {
    key: "correo_representante",
    dataKey: "correo_representante",
    title: "Correo Representante",
    width: 200,
  },
  {
    key: "domicilio_social",
    dataKey: "domicilio_social",
    title: "Domicilio Social",
    width: 200,
  },
  {
    key: "cantidad_socios",
    dataKey: "cantidad_socios",
    title: "Cantidad de Socios",
    width: 150,
  },
  {
    key: "cantidad_trabajadores",
    dataKey: "cantidad_trabajadores",
    title: "Cantidad de Trabajadores",
    width: 200,
  },
  {
    key: "sectorEconomico",
    dataKey: "sectorEconomico.nombre",
    title: "Sector Económico",
    width: 150,
    cellRenderer: ({ rowData }: any) => rowData.sectorEconomico?.nombre || "N/A",
  },
  {
    key: "tipoMypime",
    dataKey: "tipoMypime.nombre",
    title: "Tipo Mipyme",
    width: 150,
    cellRenderer: ({ rowData }: any) => rowData?.tipoMypime?.nombre || "N/A",
  },
  {
    key: "actividadEconomicaPrincipal",
    dataKey: "actividadEconomicaPrincipal.nombre",
    title: "Actividad Económica Principal",
    width: 300,
    cellRenderer: ({ rowData }: any) =>
      rowData?.actividadEconomicaPrincipal.nombre || "N/A",
  },
];

const cellProps = ({ column, rowData, rowIndex }: any) => {
  const key = `hovering-col-${rowData.id}`;
  return {
    ["data-key"]: key,
    onMouseenter: () => {
      kls.value = key;
    },
    onMouseleave: () => {
      kls.value = "";
    },
    onClick: () => {
      const router = useRouter();
      router.push(`actoresLocales/actor/${Number(rowData.id)}`);
    },
  };
};
const svg = `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        "style="stroke-width: 2px; fill: rgba(0, 0, 0, 0)"/>
      `;
const kls = ref<string>("text-green-800");
</script>
<template>
  <div
    v-if="actores?.length"
    style="height: 400px"
    class="border-2 table-container border-green-600 rounded-md p-1"
  >
    <el-auto-resizer>
      <template #default="{ height, width }">
        <el-table-v2
          v-loading="loading"
          :element-loading-svg="svg"
          :columns="columns"
          :cell-props="cellProps"
          element-loading-svg-view-box="-10, -10, 50, 50"
          :class="kls"
          :data="actores"
          :width="width"
          :height="height"
        />
      </template>
    </el-auto-resizer>
  </div>
  <el-empty v-else description="No hay actores registrados en el sistema" />
</template>
<style scoped>
.table-container {
  max-width: 10000px;
  overflow-x: auto;
}

.hovering-col-0 [data-key="hovering-col-0"],
.hovering-col-1 [data-key="hovering-col-1"],
.hovering-col-2 [data-key="hovering-col-2"],
.hovering-col-3 [data-key="hovering-col-3"],
.hovering-col-4 [data-key="hovering-col-4"],
.hovering-col-5 [data-key="hovering-col-5"],
.hovering-col-6 [data-key="hovering-col-6"],
.hovering-col-7 [data-key="hovering-col-7"],
.hovering-col-8 [data-key="hovering-col-8"],
.hovering-col-9 [data-key="hovering-col-9"],
.hovering-col-10 [data-key="hovering-col-10"] {
  background: var(--el-table-row-hover-bg-color);
}

.el-table-v2__row-cell {
  color: rgb(1, 77, 1);
}

[data-key="hovering-col-0"] {
  font-weight: bold;
  user-select: none;
  pointer-events: none;
}

.el-table-v2__header-row,
.el-table-v2__dynamic-header-row,
.el-table-v2__header-cell {
  background-color: rgb(6, 88, 6);
  color: aliceblue;
}
.example-showcase .el-loading-mask {
  z-index: 9;
}
</style>
