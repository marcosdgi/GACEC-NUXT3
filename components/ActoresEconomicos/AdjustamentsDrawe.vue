<script setup lang="ts">
import type { DrawerProps } from "element-plus";
interface Props {
  isDrawerOpen: boolean;
  filterFields: Array<IFilterOptions>
}
const props = defineProps<Props>();
export interface IFilterOptions {
  id: number;
  name: string;
  checked: boolean;
  options: Array<any>
}
const filterFieldsRef = ref<Array<IFilterOptions>>(props.filterFields)

const emit = defineEmits(["configurations", "close", "onChange"]);
const visibilityDrawer = ref<boolean>(props.isDrawerOpen);
const direction = ref<DrawerProps["direction"]>("rtl");

watch(
  () => props.isDrawerOpen,
  (newVal) => {
    visibilityDrawer.value = newVal;
  },
  { deep: true }
);

const handleClose = (done: () => void) => {
  emit("close", false);
};

const handleNewOptions = (id: number) => {
  const filter = filterFieldsRef.value.find((filter: IFilterOptions) => filter.id === id);
  if (filter) {
    emit("onChange", filter);
  }
};
const cleanFilters = () => {
  filterFieldsRef.value.forEach((filter: IFilterOptions) => {
    filter.checked = false;
  });
  emit("onChange", null); // Emitir un evento para indicar que se han limpiado los filtros
};
</script>
<template lang="pug">
el-drawer(
    v-model="visibilityDrawer"
    :direction="direction"
    :with-header="false"
    :before-close="handleClose"
 )
    El-scrollbar( height="620px")
        .grid.items-center.w-full
            .flex.flex-row.items-center.gap-2
                Icon(name="tabler:adjustments" size="30").text-green-800
                p.text-xl Ajustes
            .bg-green-50.p-2.rounded.mt-2
                p En este panel se realiza la configuración correspondiente a la tabla de actores visualizada,establezca filtros, y opciones de búsqueda
            .grid.items-center.gap-3(v-if="filterFieldsRef.length")
                .flex.flex-row.items-center.gap-2.mt-2
                    .flex.flex-row.items-center.gap-2
                        Icon(name="tabler:filter" size="25").text-green-800
                        p.text-md.font-semibold Filtros aplicados
                    .flex.flex-row.items-center.gap-2
                        el-button(text @click="cleanFilters" type="danger") Limpiar filtros
                            Icon(name="tabler:trash" size="25").text-red-800
                template(v-for="(filter, index) in filterFieldsRef" :key="index")
                    .flex.flex-row.items-center.gap-
                        .flex.flex-row.items-center.gap-2
                            input(type="checkbox" :checked="filter.checked" @change="(event) => { filter.checked = event.target.checked; handleNewOptions(filter.id) }") 
                            p {{filter.name}}
                        

</template>
