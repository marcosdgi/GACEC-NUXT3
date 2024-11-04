import type { ISectorEconomicoResponse } from "~/models/models";
import HttpFactory from "../Factory";
import type { ICreationSectorEconomico } from "~/components/Clasificaciones/SectoresEconomicos/SectorEconomicoDrawer.vue";


class SectorEconomicoModule extends HttpFactory {
    private RESOURCE = '/v1/sectorEconomico'

    async obtenerSectoresEconomicos(): Promise<Array<ISectorEconomicoResponse>> {
        return await this.call<Array<ISectorEconomicoResponse>>('GET', `${this.RESOURCE}/obtenerSectoresEconomicos/`)
    }
    async obtenerSectorEconomico(sectorEconomicoId: number): Promise<ISectorEconomicoResponse> {
        return await this.call<ISectorEconomicoResponse>('GET', `${this.RESOURCE}/obtenerSectorEconomico/${sectorEconomicoId}`)
    }

    async actualizarSectorEconomico(sectorEconomicoId: number, data: ICreationSectorEconomico): Promise<ISectorEconomicoResponse> {
        return await this.call<ISectorEconomicoResponse>('PATCH', `${this.RESOURCE}/editarSectorEconomico/${sectorEconomicoId}`, {
            "nombre": data.nombre,
            "descripcion": data.descripcion
        })
    }

    async crearSectorEconomico(data: ICreationSectorEconomico): Promise<ISectorEconomicoResponse> {
        return await this.call<ISectorEconomicoResponse>('POST', `${this.RESOURCE}/crearSectorEconomico/`, {
            "nombre": data.nombre,
            "descripcion": data.descripcion
        })
    }

    async eliminarSectorEconomico(sectorEconomicoId: number): Promise<ISectorEconomicoResponse> {
        return await this.call<ISectorEconomicoResponse>('DELETE', `${this.RESOURCE}/eliminarSectorEconomico/${sectorEconomicoId}`)
    }


}

export default SectorEconomicoModule;