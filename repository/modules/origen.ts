import type { IOrigenResponse, ISectorEconomicoResponse } from "~/models/models";
import HttpFactory from "../Factory";
import type { ICreationOrigen } from "~/components/Clasificaciones/Origenes/OrigenDrawer.vue";


class OrigenModule extends HttpFactory {
    private RESOURCE = '/v1/origen'

    async obtenerOrigenes(): Promise<Array<IOrigenResponse>> {
        return await this.call<Array<IOrigenResponse>>('GET', `${this.RESOURCE}/obtenerOrigenes/`)
    }
    async obtenerOrigen(origenId: number): Promise<IOrigenResponse> {
        return await this.call<IOrigenResponse>('GET', `${this.RESOURCE}/obtenerOrigen/${origenId}`)
    }

    async actualizarOrigen(origenId: number, data: ICreationOrigen): Promise<IOrigenResponse> {
        return await this.call<IOrigenResponse>('PATCH', `${this.RESOURCE}/editarOrigenes/${origenId}`, {
            "nombre":data.nombre,
            "descripcion": data.descripcion
        })
    }

    async crearOrigen(data: ICreationOrigen): Promise<IOrigenResponse> {
        return await this.call<IOrigenResponse>('POST', `${this.RESOURCE}/crearOrigenes/`, {
            "nombre":data.nombre,
            "descripcion": data.descripcion
        })
    }

    async eliminarOrigen(origenId: number): Promise<IOrigenResponse> {
        return await this.call<IOrigenResponse>('DELETE', `${this.RESOURCE}/eliminarOrigen/${origenId}`)
    }


}

export default OrigenModule;