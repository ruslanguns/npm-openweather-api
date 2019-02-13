const expect = require('chai').expect;
const ApiService = require('./../dist/index').ApiService;

const constants = require('./constants');
const APIKEY = constants.API_KEY;
const APIURL = constants.API_URL;

describe('Buscar el tiempo por nombre de ciudad', () => {

    beforeEach(() => {
        const nock = require('nock');
        const respuesta = require('./mock/nombre');

        const query = {
            q: 'London,uk',
            units: 'metric',
            lang: 'es',
            appid: APIKEY
        };

        nock(APIURL)
            .log(console.log)
            .get('/data/2.5/weather')
            .query(query)
            .reply(200, respuesta);
    });

    it('Buscar el tiempo actual de Londres', () => {
        const api = new ApiService(APIKEY, 'm', 'es');

        return api.buscarPorNombre('London', 'uk').then(
            respuesta => {
                // console.log(respuesta);
                expect(typeof respuesta.id).to.equal('number');
                expect(typeof respuesta.main.temp).to.equal('number');
                expect(typeof respuesta.main.pressure).to.equal('number');
                expect(typeof respuesta.main.humidity).to.equal('number');
                expect(typeof respuesta.main.temp_min).to.equal('number');
                expect(typeof respuesta.main.temp_max).to.equal('number');
                expect(typeof respuesta.visibility).to.equal('number');
            }
        );
    });
});