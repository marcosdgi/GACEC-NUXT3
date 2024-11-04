import type { ITipoMIPYMEResponse } from "~/models/models";
import HttpFactory from "../Factory";
import type { ICreationTipoMipyme } from "~/components/Clasificaciones/TiposMipymes/TipoMipymeDrawer.vue";


class TipoMipymeModule extends HttpFactory {
    private RESOURCE = '/v1/tiposMiPymes'

    async obtenerTiposMipymes(): Promise<Array<ITipoMIPYMEResponse>> {
        return await this.call<Array<ITipoMIPYMEResponse>>('GET', `${this.RESOURCE}/obtenerTiposMipymes/`)
    }
    async obtenerTipoMipyme(tipoMipymeId: number): Promise<ITipoMIPYMEResponse> {
        return await this.call<ITipoMIPYMEResponse>('GET', `${this.RESOURCE}/obtenerTipoMipyme/${tipoMipymeId}`)
    }

    async actualizarTipoMipyme(tipoMipymeId: number, data: ICreationTipoMipyme): Promise<ITipoMIPYMEResponse> {
        return await this.call<ITipoMIPYMEResponse>('PATCH', `${this.RESOURCE}/editarTipoMipyme/${tipoMipymeId}`, {
            "nombre": data.nombre,
            "descripcion": data.descripcion
        })
    }

    async crearTipoMipyme(data: ICreationTipoMipyme): Promise<ITipoMIPYMEResponse> {
        return await this.call<ITipoMIPYMEResponse>('POST', `${this.RESOURCE}/crearTipoMipyme/`, {
            "nombre": data.nombre,
            "descripcion": data.descripcion
        })
    }

    async eliminarTipoMipyme(tipoMipymeId: number): Promise<ITipoMIPYMEResponse> {
        return await this.call<ITipoMIPYMEResponse>('DELETE', `${this.RESOURCE}/eliminarTipoMipyme/${tipoMipymeId}`)
    }


}

export default TipoMipymeModule;