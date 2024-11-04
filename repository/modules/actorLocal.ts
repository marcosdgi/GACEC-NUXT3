import type { IActorEconomicoResponse } from "~/models/models";
import HttpFactory from "../Factory";
import type { IFormCreationActor } from "~/components/ActoresEconomicos/DialogCreateActor.vue";

export class ActorLocalModule extends HttpFactory {
    private RESOURCE = '/v1/actorEconomico'

    async obtenerActoresEconomicos(
        filters: {
            denominacionId?: number | null,
            solicitanteId?: number | null,
            actividadEconomicaPrincipalCnaeId?: number | null,
            actividadEconomicaPrincipalId?: number | null,
            sectorEconomicoId?: number | null,
            tipoSujetoId?: number | null,
            tipoMipymeId?: number | null
        }
    ): Promise<Array<IActorEconomicoResponse>> {
        const params = new URLSearchParams();

        if (filters.denominacionId !== null && filters.denominacionId !== undefined) params.append('denominacion_id', filters.denominacionId.toString());
        if (filters.solicitanteId !== null && filters.solicitanteId !== undefined) params.append('solicitante_id', filters.solicitanteId.toString());
        if (filters.actividadEconomicaPrincipalCnaeId !== null && filters.actividadEconomicaPrincipalCnaeId !== undefined) params.append('actividad_principal_CNAE_id', filters.actividadEconomicaPrincipalCnaeId.toString());
        if (filters.actividadEconomicaPrincipalId !== null && filters.actividadEconomicaPrincipalId !== undefined) params.append('actividad_economica_principal_id', filters.actividadEconomicaPrincipalId.toString());
        if (filters.sectorEconomicoId !== null && filters.sectorEconomicoId !== undefined) params.append('sector_economico_id', filters.sectorEconomicoId.toString());
        if (filters.tipoSujetoId !== null && filters.tipoSujetoId !== undefined) params.append('tipo_sujeto_id', filters.tipoSujetoId.toString());
        if (filters.tipoMipymeId !== null && filters.tipoMipymeId !== undefined) params.append('tipo_mypime_id', filters.tipoMipymeId.toString());

        const queryString = params.toString();

        return await this.call<Array<IActorEconomicoResponse>>('GET', `${this.RESOURCE}/obtenerActoresEconomicos/?${queryString}`);
    }

    async obtenerActorEconomicoById(actorId: number): Promise<IActorEconomicoResponse> {
        return await this.call<IActorEconomicoResponse>('GET', `${this.RESOURCE}/obtenerActorEconomico/${actorId}`)
    }

    async crearActorEconomico(data: IFormCreationActor): Promise<IActorEconomicoResponse> {
        return await this.call<IActorEconomicoResponse>('POST', `${this.RESOURCE}/crearActorEconomico/`, {
            "nombre": data.nombre,
            "numero": data.numero,
            "solicitud": data.solicitud,
            "actividad_principal_CNAE_id": data.actividad_principal_CNAE_id, //FK
            "denominacion_id": data.denominacion_id, //FK
            "tipo_sujeto_id": data.tipo_sujeto_id, //FK
            "actividad_economica_principal_id": data.actividad_economica_principal_id, //FK
            "solicitante_id": data.solicitante_id, //FK
            "tipo_mypime_id": data.tipo_mypime_id,//FK
            "sector_economico_id": data.sector_economico_id,//FK
            "origen_id": data.origen_id, //FK
            "telefono": data.telefono,
            "correo_representante": data.correo_representante,
            "domicilio_social": data.domicilio_social,
            "cantidad_socios": data.cantidad_socios,
            "cantidad_trabajadores": data.cantidad_trabajadores,
            "cantidad_estatales": data.cantidad_estatales,
            "cantidad_TPCP": data.cantidad_TPCP,
            "cantidad_CNA": data.cantidad_CNA,
            "cantidad_desempleados": data.cantidad_desempleados,
            "cantidad_otros_origenes": data.cantidad_otros_origenes,
            "cantidad_ocupados": data.cantidad_ocupados,
            "pdl": data.pdl,
            "inscrito_registro_mercantil": data.inscrito_registro_mercantil,
            "folio_inscripcion": data.folio_inscripcion,
            "hoja_inscripcion": data.hoja_inscripcion,
            "fecha_incripcion": data.fecha_incripcion,
            "is_exportador": data.is_exportador,
            "is_incubado_en_parque_cientifico": data.is_incubado_en_parque_cientifico,
            "desistimiento_con_carta_de_socios": data.desistimiento_con_carta_de_socios,
            "is_disuelta": data.is_disuelta,
            "is_inactiva": data.is_inactiva,

        })
    }

    async actualizarActorEconomico(actorId: number, data: IFormCreationActor): Promise<IActorEconomicoResponse> {
        return await this.call<IActorEconomicoResponse>('PATCH', `${this.RESOURCE}/editarActorEconomico/${actorId}`, {
            "nombre": data.nombre,
            "numero": data.numero,
            "solicitud": data.solicitud,
            "actividad_principal_CNAE_id": data.actividad_principal_CNAE_id, //FK
            "denominacion_id": data.denominacion_id, //FK
            "tipo_sujeto_id": data.tipo_sujeto_id, //FK
            "actividad_economica_principal_id": data.actividad_economica_principal_id, //FK
            "solicitante_id": data.solicitante_id, //FK
            "tipo_mypime_id": data.tipo_mypime_id,//FK
            "sector_economico_id": data.sector_economico_id,//FK
            "origen_id": data.origen_id, //FK
            "telefono": data.telefono,
            "correo_representante": data.correo_representante,
            "domicilio_social": data.domicilio_social,
            "cantidad_socios": data.cantidad_socios,
            "cantidad_trabajadores": data.cantidad_trabajadores,
            "cantidad_estatales": data.cantidad_estatales,
            "cantidad_TPCP": data.cantidad_TPCP,
            "cantidad_CNA": data.cantidad_CNA,
            "cantidad_desempleados": data.cantidad_desempleados,
            "cantidad_otros_origenes": data.cantidad_otros_origenes,
            "cantidad_ocupados": data.cantidad_ocupados,
            "pdl": data.pdl,
            "inscrito_registro_mercantil": data.inscrito_registro_mercantil,
            "folio_inscripcion": data.folio_inscripcion,
            "hoja_inscripcion": data.hoja_inscripcion,
            "fecha_incripcion": data.fecha_incripcion,
            "is_exportador": data.is_exportador,
            "is_incubado_en_parque_cientifico": data.is_incubado_en_parque_cientifico,
            "desistimiento_con_carta_de_socios": data.desistimiento_con_carta_de_socios,
            "is_disuelta": data.is_disuelta,
            "is_inactiva": data.is_inactiva,
        }
        )
    }

    async eliminarActorEconomico(actorId: number): Promise<any> {
        return await this.call<any>('DELETE', `${this.RESOURCE}/eliminarActorEconomico/${actorId}`)
    }
}
export default ActorLocalModule;