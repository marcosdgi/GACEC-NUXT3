<script lang="ts" setup>
import type { IActividadPrincipalCNAEResponse } from '~/models/models';
interface Props{
  actividadesCnae: Array<IActividadPrincipalCNAEResponse>
}
const props = defineProps<Props>()
const actividadesCnaeRef = ref<Array<IActividadPrincipalCNAEResponse>>(props.actividadesCnae)
let columns = [
  {key:"id", dataKey:"id", title: "No.", width:80},
  {key:"Nombre", dataKey:"nombre", title: "Nombre", width:300},
  {key:"Descripcion", dataKey:"descripcion", title: "Descripción", width:300},
]
watch(()=>props.actividadesCnae, (newValue)=>{
  actividadesCnaeRef.value = newValue
},{deep:true})

const cellProps = ({ column, rowData, rowIndex }: any) => {
  const key = `hovering-col-${rowData.id}`
  return {
    ['data-key']: key,
    onMouseenter: () => {
      kls.value = key
    },
    onMouseleave: () => {
      kls.value = ''
    },
    onClick:()=>{
      const router = useRouter()
      const {clasificacionId} = useRoute().params
    //   Cambiar por el id de la clasificacion durante el acceso a los datos
      router.push(`/clasificaciones/${clasificacionId}/actividadesEconomicasPrincipalesCnae/actividadEconomicaPrincipalCnae/${rowData.id}`)
    }
  }
}
const kls = ref<string>('text-red-800')
</script>
<template>
  <div v-if="actividadesCnaeRef.length" style="height: 400px" class="border-2 border-green-600 rounded-md p-1">
    <el-auto-resizer>
      <template #default="{ height, width }">
        <el-table-v2
          :columns="columns"
          :cell-props="cellProps"
          :class="kls"
          :data="actividadesCnaeRef"
          :width="width"
          :height="height"
        />
      </template>
    </el-auto-resizer>
  </div>
  <el-empty v-else description="No hay actividades principales CNAE registradas en el sistema"/>
</template>
<style>
.hovering-col-0 [data-key='hovering-col-0'],
.hovering-col-1 [data-key='hovering-col-1'],
.hovering-col-2 [data-key='hovering-col-2'],
.hovering-col-3 [data-key='hovering-col-3'],
.hovering-col-4 [data-key='hovering-col-4'],
.hovering-col-5 [data-key='hovering-col-5'],
.hovering-col-6 [data-key='hovering-col-6'],
.hovering-col-7 [data-key='hovering-col-7'],
.hovering-col-8 [data-key='hovering-col-8'],
.hovering-col-9 [data-key='hovering-col-9'],
.hovering-col-10 [data-key='hovering-col-10'] {
  background: var(--el-table-row-hover-bg-color);
}

.el-table-v2__row-cell {
  color:rgb(1, 77, 1)
}

[data-key='hovering-col-0'] {
  font-weight: bold;
  user-select: none;
  pointer-events: none;
}
.el-table-v2__header-row,.el-table-v2__dynamic-header-row,.el-table-v2__header-cell{
  background-color: rgb(6, 88, 6);
  color: aliceblue;
}
</style>