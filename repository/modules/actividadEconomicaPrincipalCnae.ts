import type { IActividadEconomicaResponse, IActividadPrincipalCNAEResponse } from "~/models/models";
import HttpFactory from "../Factory";
import type { ICreationActividadCnae } from "~/components/Clasificaciones/AEPCNAE/ActividadEconPrincCNAEDrawer.vue";


class ActividadEconomicaPrincipalCNAE extends HttpFactory {

    private RESOURCE = '/v1/actividadPrincipal'


    async obtenerActividadesEconomicas(): Promise<Array<IActividadPrincipalCNAEResponse>> {
        return await this.call<Array<IActividadPrincipalCNAEResponse>>('GET', `${this.RESOURCE}/obtenerActividadesPrincipalesCNAE/`)
    }
    async obtenerActividadEconomica(actividadEconomicaId: number): Promise<IActividadPrincipalCNAEResponse> {
        return await this.call<IActividadPrincipalCNAEResponse>('GET', `${this.RESOURCE}/obtenerActividadPrincipalCNAE/${actividadEconomicaId}`)
    }
    async eliminarActividadEconomica(actividadEconomicaId: number): Promise<IActividadPrincipalCNAEResponse> {
        return await this.call<IActividadPrincipalCNAEResponse>('DELETE', `${this.RESOURCE}/eliminarActividadPrincipalCNAE/${actividadEconomicaId}`)
    }
    async actualizarActividadEconomica(actividadEconomicaId: number, data: ICreationActividadCnae): Promise<IActividadPrincipalCNAEResponse> {
        return await this.call<IActividadPrincipalCNAEResponse>('PATCH', `${this.RESOURCE}/editarActividadPrincipalCNAE/${actividadEconomicaId}`, {
            "nombre": data.nombre,
            "descripcion": data.descripcion
        })
    }
    async crearActividadEconomica(data: ICreationActividadCnae): Promise<IActividadPrincipalCNAEResponse> {
        return await this.call<IActividadPrincipalCNAEResponse>('POST', `${this.RESOURCE}/crearActividadPrincipalCNAE/`, {
            "nombre": data.nombre,
            "descripcion": data.descripcion
        })
    }

}

export default ActividadEconomicaPrincipalCNAE;