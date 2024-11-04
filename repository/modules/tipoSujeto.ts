import type { ITipoSujetoResponse } from "~/models/models";
import HttpFactory from "../Factory";
import type { ICreationTipoSujeto } from "~/components/Clasificaciones/TiposSujetos/TipoSujetoDrawer.vue";


class TipoSujetoModule extends HttpFactory {
    private RESOURCE = '/v1/tiposSujetos'

    async obtenerTiposSujetos(): Promise<Array<ITipoSujetoResponse>> {
        return await this.call<Array<ITipoSujetoResponse>>('GET', `${this.RESOURCE}/obtenerTiposSujetos`)
    }
    async obtenerTipoSujeto(tipoSujetoId: number): Promise<ITipoSujetoResponse> {
        return await this.call<ITipoSujetoResponse>('GET', `${this.RESOURCE}/obtenerTipoSujeto/${tipoSujetoId}`)
    }

    async eliminarTipoSujeto(tipoSujetoId: number): Promise<ITipoSujetoResponse> {
        return await this.call<ITipoSujetoResponse>('DELETE', `${this.RESOURCE}/eliminarTipoSujeto/${tipoSujetoId}`)
    }

    async actualizarTipoSujeto(tipoSujetoId: number, data: ICreationTipoSujeto): Promise<ITipoSujetoResponse> {
        return await this.call<ITipoSujetoResponse>('PATCH', `${this.RESOURCE}/editarTipoSujeto/${tipoSujetoId}`,
            {
                "nombre": data.nombre,
                "descripcion": data.descripcion
            }
        )
    }

    async crearTipoSujeto(data: ICreationTipoSujeto): Promise<ITipoSujetoResponse> {
        return await this.call<ITipoSujetoResponse>('POST', `${this.RESOURCE}/crearTipoSujeto/`,
            {
                "nombre": data.nombre,
                "descripcion": data.descripcion
            }
        )
    }



}

export default TipoSujetoModule;