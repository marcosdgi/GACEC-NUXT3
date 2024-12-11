import type { IEstadisticas } from "~/models/models";
import HttpFactory from "../Factory";

class EstadisticasModule extends HttpFactory {
    private RESOURCE = 'v1/estadisticas'

    async obtenerEstadisticas(year: string): Promise<IEstadisticas> {
        return await this.call<IEstadisticas>('GET', `${this.RESOURCE}/getEstadisticas/?year=${year}`)
    }

}
export default EstadisticasModule;