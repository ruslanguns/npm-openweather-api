import { Coord } from '../interfaces/api';
export declare class ApiService {
    private APIKEY;
    private unitMetric;
    private lang;
    constructor(apiKey: string, unitMetric: string, lang: string);
    /**
     * Configurar las unidades métricas en la peticiones de las API
     * @param unidad para configurar si queremos usar grados centígrados
     */
    private configurarUnidadMetrica;
    /**
     * Comprobar el idioma por defecto
     * @param idioma Idioma o lenguaje en ISO
     */
    private configurarIdioma;
    /**
     * Buscar por nombre
     * @param nomCiudad Nombre de ciudad
     * @param codPais Codigo de pais España = es
     */
    buscarPorNombre(nomCiudad: string, codPais?: string): Promise<any>;
    /**
     * Buscar por localización geografica
     * @param loc Localizacion
     */
    buscarPorLocalizacion(loc: Coord): Promise<any>;
    /**
     * Buscar por código ZIP
     * @param codZIP Codigo postal o ZIP
     * @param codPais Codigo de pais España = es
     */
    buscarPorZIP(codZIP: string, codPais?: string): Promise<any>;
    private requestAPI;
}
