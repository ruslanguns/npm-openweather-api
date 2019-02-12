import { URL_LOCALHOST, CURRENT } from './../constants/constants';
import axios from 'axios';
import { Coord } from '../interfaces/api';


export class ApiService {

    private APIKEY: string;
    private unitMetric: string | undefined;
    private lang: string | undefined;

    constructor( apiKey: string, unitMetric: string, lang: string ) {

        this.APIKEY = apiKey;
        this.configurarUnidadMetrica( unitMetric );
        this.configurarIdioma( lang );

    }

    /**
     * Configurar las unidades métricas en la peticiones de las API
     * @param unidad para configurar si queremos usar grados centígrados
     */
    configurarUnidadMetrica( unidad: string ) {
        this.unitMetric = '';
        if ( unidad === 'm' || unidad === 'metric') {
            this.unitMetric = '&units=metric';
        }
    }

    /**
     * Comprobar el idioma por defecto
     * @param idioma Idioma o lenguaje en ISO
     */
    configurarIdioma( idioma: string ) {
        this.lang = '';
        if ( idioma === 'es' || idioma === 'español' ) {
            this.lang = '&lang=es';
        }
    }

    /**
     * Buscar por nombre
     * @param nomCiudad Nombre de ciudad
     * @param codPais Codigo de pais España = es
     */
    buscarPorNombre( nomCiudad: string, codPais: string = '' ) {
        
        let filtro = '';
        const parametros = `${ this.unitMetric }${ this.lang }&appid=${ this.APIKEY }`;

        if ( codPais === '' ) {
            filtro = `q=${ nomCiudad }${ parametros }`;
        } else {
            filtro = `q=${ nomCiudad },${ codPais }${ parametros }`;
        }

        const URL = `${ URL_LOCALHOST }${ CURRENT }${ filtro }`;

        return axios.get( URL ).then (
            e => e.data
        ).catch (
            error => error
        );
    }

    /**
     * Buscar por localización geografica
     * @param loc Localizacion
     */
    buscarPorLocalizacion( loc: Coord ) {
        
        let filtro = '';
        const parametros = `${ this.unitMetric }${ this.lang }&appid=${ this.APIKEY }`;

        if ( loc === undefined || loc === null ) {
            filtro = `lat=28.1078524&lon=-15.4375352`;
            console.warn('Haz introducido mal las coordenadas... Por defecto mostramos Las Palmas de Gran Canaria')
        } else {
            console.log('Buscando ', loc.lat, loc.lon);
            filtro = `lat=${ loc.lat }&lon=${ loc.lon }${ parametros }`
        }

        const URL = `${ URL_LOCALHOST }${ CURRENT }${ filtro }`;

        return axios.get( URL ).then (
            e => e.data
        ).catch (
            error => error
        );
    }

    /**
     * Buscar por código ZIP
     * @param codZIP Codigo postal o ZIP
     * @param codPais Codigo de pais España = es
     */
    buscarPorZIP( codZIP: string, codPais: string = '' ) {
        
        let filtro = '';
        const parametros = `${ this.unitMetric }${ this.lang }&appid=${ this.APIKEY }`;

        if ( codPais === '' ) {
            filtro = `zip=${ codZIP }${ parametros }`;
        } else {
            filtro = `zip=${ codZIP },${ codPais }${ parametros }`;
        }

        const URL = `${ URL_LOCALHOST }${ CURRENT }${ filtro }`;

        return axios.get( URL ).then (
            e => e.data
        ).catch (
            error => error
        );
    }
}