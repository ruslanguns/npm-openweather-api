"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("./../constants/constants");
var axios_1 = __importDefault(require("axios"));
var ApiService = /** @class */ (function () {
    function ApiService(apiKey, unitMetric, lang) {
        this.APIKEY = apiKey;
        this.configurarUnidadMetrica(unitMetric);
        this.configurarIdioma(lang);
    }
    /**
     * Configurar las unidades métricas en la peticiones de las API
     * @param unidad para configurar si queremos usar grados centígrados
     */
    ApiService.prototype.configurarUnidadMetrica = function (unidad) {
        this.unitMetric = '';
        if (unidad === 'm' || unidad === 'metric') {
            this.unitMetric = '&units=metric';
        }
    };
    /**
     * Comprobar el idioma por defecto
     * @param idioma Idioma o lenguaje en ISO
     */
    ApiService.prototype.configurarIdioma = function (idioma) {
        this.lang = '';
        if (idioma === 'es' || idioma === 'español') {
            this.lang = '&lang=es';
        }
    };
    /**
     * Buscar por nombre
     * @param nomCiudad Nombre de ciudad
     * @param codPais Codigo de pais España = es
     */
    ApiService.prototype.buscarPorNombre = function (nomCiudad, codPais) {
        if (codPais === void 0) { codPais = ''; }
        var filtro = '';
        var parametros = "" + this.unitMetric + this.lang + "&appid=" + this.APIKEY;
        if (codPais === '') {
            filtro = "q=" + nomCiudad + parametros;
        }
        else {
            filtro = "q=" + nomCiudad + "," + codPais + parametros;
        }
        return this.requestAPI("" + constants_1.URL_LOCALHOST + constants_1.CURRENT + filtro);
    };
    /**
     * Buscar por localización geografica
     * @param loc Localizacion
     */
    ApiService.prototype.buscarPorLocalizacion = function (loc) {
        var filtro = '';
        var parametros = "" + this.unitMetric + this.lang + "&appid=" + this.APIKEY;
        if (loc === undefined || loc === null) {
            filtro = "lat=28.1078524&lon=-15.4375352";
            console.warn('Haz introducido mal las coordenadas... Por defecto mostramos Las Palmas de Gran Canaria');
        }
        else {
            console.log('Buscando ', loc.lat, loc.lon);
            filtro = "lat=" + loc.lat + "&lon=" + loc.lon + parametros;
        }
        return this.requestAPI("" + constants_1.URL_LOCALHOST + constants_1.CURRENT + filtro);
    };
    /**
     * Buscar por código ZIP
     * @param codZIP Codigo postal o ZIP
     * @param codPais Codigo de pais España = es
     */
    ApiService.prototype.buscarPorZIP = function (codZIP, codPais) {
        if (codPais === void 0) { codPais = ''; }
        var filtro = '';
        var parametros = "" + this.unitMetric + this.lang + "&appid=" + this.APIKEY;
        if (codPais === '') {
            filtro = "zip=" + codZIP + parametros;
        }
        else {
            filtro = "zip=" + codZIP + "," + codPais + parametros;
        }
        return this.requestAPI("" + constants_1.URL_LOCALHOST + constants_1.CURRENT + filtro);
    };
    ApiService.prototype.requestAPI = function (url) {
        return axios_1.default.get(url).then(function (e) { return e.data; }).catch(function (error) { return error; });
    };
    return ApiService;
}());
exports.ApiService = ApiService;
