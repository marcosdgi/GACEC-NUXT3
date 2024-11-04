import type { IDenominacionResponse } from "~/models/models";
import HttpFactory from "../Factory";
import type { ICreationDenominacion } from "~/components/Clasificaciones/Denominaciones/DenominacionDrawer.vue";


class DenominacionModule extends HttpFactory {
    private RESOURCE = 'v1/denominaciones'

    async obtenerDenominaciones(): Promise<Array<IDenominacionResponse>> {
        return await this.call<Array<IDenominacionResponse>>('GET', `${this.RESOURCE}/obtenerDenominaciones/`)
    }
    async obtenerDenominacionById(denominacionId: number): Promise<IDenominacionResponse> {
        return await this.call<IDenominacionResponse>('GET', `${this.RESOURCE}/obtenerDenominacion/${denominacionId}`)
    }

    async crearDenominacion(data: ICreationDenominacion): Promise<IDenominacionResponse> {
        return await this.call<IDenominacionResponse>('POST', `${this.RESOURCE}/crearDenominacion/`, {
            "nombre": data.nombre,
            "descripcion": data.descripcion
        })
    }

    async actualizarDenominacion(denominacionId: number, data: ICreationDenominacion): Promise<IDenominacionResponse> {
        return await this.call<IDenominacionResponse>('PATCH', `${this.RESOURCE}/editarDenominacion/${denominacionId}`, {
            "nombre": data.nombre,
            "descripcion": data.descripcion
        })
    }

    async eliminarDenominacion(denominacionId: number): Promise<IDenominacionResponse> {
        return await this.call<IDenominacionResponse>('DELETE', `${this.RESOURCE}/eliminarDenominacion/${denominacionId}`)
    }
}

export default DenominacionModule;