import type { ISolicitanteResponse } from "~/models/models";
import HttpFactory from "../Factory";
import type { ICreationSolicitante } from "~/components/Solicitantes/SolicitanteItem.vue";


class SolicitanteModule extends HttpFactory {
    private RESOURCE = '/v1/solicitante'

    async obtenerSolicitantes(): Promise<Array<ISolicitanteResponse>> {
        return await this.call<Array<ISolicitanteResponse>>('GET', `${this.RESOURCE}/obtenerSolicitantes/`)
    }
    async obtenerSolicitante(solicitanteId: number): Promise<ISolicitanteResponse> {
        return await this.call<ISolicitanteResponse>('GET', `${this.RESOURCE}/obtenerSolicitante/${solicitanteId}`)
    }

    async actualizarSolicitante(solicitanteId: number, data:ICreationSolicitante): Promise<ISolicitanteResponse> {
        return await this.call<ISolicitanteResponse>('PATCH', `${this.RESOURCE}/editarSolicitante/${solicitanteId}`, {
            "nombre":data.nombre,
            "genero": data.genero,
            "fecha_nacimiento": data.fecha_nacimiento,
            "segundo_nombre":data.segundo_nombre,
            "apellido_paterno":data.apellido_paterno,
            "apellido_materno": data.apellido_materno,
            "direccion": data.direccion,
            "tomo": data.tomo,
            "tipo_mipyme_id": data.tipo_mipyme_id,
            "correo": data.correo,
            "folio": data.folio,
            "carnet":data.carnet,
            "telefono":data.telefono
        })
    }
    async crearSolicitante(data: ICreationSolicitante): Promise<ISolicitanteResponse> {
        return await this.call<ISolicitanteResponse>('POST', `${this.RESOURCE}/crearSolicitante/`, {
           "nombre":data.nombre,
            "genero": data.genero,
            "fecha_nacimiento": data.fecha_nacimiento,
            "segundo_nombre":data.segundo_nombre,
            "apellido_paterno":data.apellido_paterno,
            "apellido_materno": data.apellido_materno,
            "direccion": data.direccion,
            "tomo": data.tomo,
            "tipo_mipyme_id": data.tipo_mipyme_id,
            "correo": data.correo,
            "folio": data.folio,
            "carnet":data.carnet,
            "telefono":data.telefono
        })
    }

    async eliminarSolicitante(solicitanteId: number): Promise<ISolicitanteResponse> {
        return await this.call<ISolicitanteResponse>('DELETE', `${this.RESOURCE}/eliminarSolicitante/${solicitanteId}`)
    }


}

export default SolicitanteModule;