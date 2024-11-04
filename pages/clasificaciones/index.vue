<script setup lang="ts">
import type {
  IActividadEconomicaResponse,
  IDenominacionResponse,
  IOrigenResponse,
  ISectorEconomicoResponse,
  ITipoMIPYMEResponse,
  ITipoSujetoResponse,
} from "~/models/models";
import "animate.css";
interface IClasificacion {
  denominacion: IDenominacionResponse;
  actividadEconomicaPrincipal: IActividadEconomicaResponse;
  actividadadEconomicaPrincipalCnae: IActividadEconomicaResponse;
  origen: IOrigenResponse;
  tipoMipyme: ITipoMIPYMEResponse;
  tipoSujeto: ITipoSujetoResponse;
  sectorEconomico: ISectorEconomicoResponse;
}

const clasificaciones = [
  { id: 2, name: "Actividades Económicas Principales" },
  { id: 3, name: "Actividades Económicas Principales (CNAE)" },
  { id: 1, name: "Denominaciones" },
  { id: 4, name: "Origen" },
  { id: 5, name: "Tipo Mipyme" },
  { id: 6, name: "Tipo Sujeto" },
  { id: 7, name: "Sector Económico" },
];
</script>
<template lang="pug">
    .w-full.grid.items-center.bg-white.gap-4.p-4.rounded-md(class="animate__animated animate__fadeInLeftBig")
        .flex.flex-row.items-center.gap-2
            ElButton(text @click="$router.push('/')").gap-2.items-center.flex.flex-row
                Icon(name="tabler:arrow-left" size="30").text-green-600
            Icon(name="tabler:album" size="30").text-green-600
            p.text-2xl Clasificaciones
        hr.text-green-400.w-full

        .grid.grid-cols-2.gap-4.w-full
            template(v-for="clasificacion in clasificaciones" :key="clasificacion.id")
                .col-span-1.flex.justify-start.w-full
                    ElButton(text @click="$router.push(`${clasificacion.id}/`)").gap-2.items-center.flex.flex-row
                        Icon(name="tabler:align-box-bottom-center" size="30").text-green-600
                        p.text-xl {{clasificacion.name}}

</template>
