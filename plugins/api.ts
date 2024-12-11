import { $fetch, type FetchOptions } from "ohmyfetch"
import type { IEstadisticas } from "~/models/models";
import ActividadEconomicaPrincipal from "~/repository/modules/actividadEconomicaPrincipal";
import ActividadEconomicaPrincipalCNAE from "~/repository/modules/actividadEconomicaPrincipalCnae";
import ActorLocalModule from "~/repository/modules/actorLocal"
import DenominacionModule from "~/repository/modules/denominacion";
import OrigenModule from "~/repository/modules/origen";
import SectorEconomicoModule from "~/repository/modules/sectorEconomico";
import SolicitanteModule from "~/repository/modules/solicitante";
import TipoMipymeModule from "~/repository/modules/tipoMipyme";
import TipoSujetoModule from "~/repository/modules/tipoSujeto";
import EstadisticasModule from "~/repository/modules/estadisticas";
interface IApiInstance {
    // Modules
    actorEconomico: ActorLocalModule;
    denominacion: DenominacionModule;
    tipoMipyme: TipoMipymeModule;
    tipoSujeto: TipoSujetoModule;
    actividadEconomica: ActividadEconomicaPrincipal;
    actividadEconomicaCNAE: ActividadEconomicaPrincipalCNAE;
    sectorEconomico: SectorEconomicoModule;
    origen: OrigenModule;
    solicitante: SolicitanteModule;
    estadistica: EstadisticasModule;
}


export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig()
    const fetchOptions: FetchOptions = {
        baseURL: config.public.apiURL,
    }
    const apiFetcher = $fetch.create(fetchOptions)

    const modules: IApiInstance = {
        // Definir Modules aca instanciandolos
        actorEconomico: new ActorLocalModule(apiFetcher),
        denominacion: new DenominacionModule(apiFetcher),
        tipoMipyme: new TipoMipymeModule(apiFetcher),
        tipoSujeto: new TipoSujetoModule(apiFetcher),
        actividadEconomica: new ActividadEconomicaPrincipal(apiFetcher),
        actividadEconomicaCNAE: new ActividadEconomicaPrincipalCNAE(apiFetcher),
        sectorEconomico: new SectorEconomicoModule(apiFetcher),
        origen: new OrigenModule(apiFetcher),
        solicitante: new SolicitanteModule(apiFetcher),
        estadistica: new EstadisticasModule(apiFetcher),
    }
    return {
        provide: {
            api: modules,
        },
    }
})

