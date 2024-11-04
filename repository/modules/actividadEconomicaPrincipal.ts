import type { IActividadEconomicaResponse } from "~/models/models";
import HttpFactory from "../Factory";
import type { ICreationActividadEconomica } from "~/components/Clasificaciones/ActividadesEconomicasPrincipales/ActividadEconomicaPrincipalDrawer.vue";


class ActividadEconomicaPrincipal extends HttpFactory {

    private RESOURCE = '/v1/actividadEconomica'


    async obtenerActividadesEconomicas(): Promise<Array<IActividadEconomicaResponse>> {
        return await this.call<Array<IActividadEconomicaResponse>>('GET', `${this.RESOURCE}/obtenerActividadesEconomicas/`)
    }
    async obtenerActividadEconomica(actividadEconomicaId: number): Promise<IActividadEconomicaResponse> {
        return await this.call<IActividadEconomicaResponse>('GET', `${this.RESOURCE}/obtenerActividadEconomica/${actividadEconomicaId}`)
    }
    async obtenerActividadEconomicaPorCodigo(codigo: any): Promise<IActividadEconomicaResponse> {
        return await this.call<IActividadEconomicaResponse>('GET', `${this.RESOURCE}/obtenerActividadEconomicaPorCodigo/${codigo}`)
    }
    async eliminarActividadEconomica(actividadEconomicaId: number): Promise<IActividadEconomicaResponse> {
        return await this.call<IActividadEconomicaResponse>('DELETE', `${this.RESOURCE}/eliminarActividadEconomica/${actividadEconomicaId}`)
    }
    async actualizarActividadEconomica(actividadEconomicaId: number, data: ICreationActividadEconomica): Promise<IActividadEconomicaResponse> {
        return await this.call<IActividadEconomicaResponse>('PATCH', `${this.RESOURCE}/editarActividadEconomica/${actividadEconomicaId}`, {
            "nombre":data.nombre,
            "descripcion": data.descripcion,
            "codigo": data.codigo
        })
    }
    async crearActividadEconomica(data: ICreationActividadEconomica): Promise<IActividadEconomicaResponse> {
        return await this.call<IActividadEconomicaResponse>('POST', `${this.RESOURCE}/crearActividadEconomica/`, {
            "nombre":data.nombre,
            "descripcion": data.descripcion,
            "codigo": data.codigo
        })
    }

}

export default ActividadEconomicaPrincipal