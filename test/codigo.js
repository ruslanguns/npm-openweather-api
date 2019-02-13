const expect = require('chai').expect;
const ApiService = require('./../dist/index').ApiService;

const constants = require('./constants');
const APIKEY = constants.API_KEY;
const APIURL = constants.API_URL;

describe('Buscar el tiempo por codigo postal', () => {

    beforeEach(() => {
        const nock = require('nock');
        const respuesta = require('./mock/codigo');

        const query = {
            zip: '94040,us',
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

    it('Buscar el tiempo actual del código postal 94040 y pais usa', () => {
        const api = new ApiService(APIKEY, 'm', 'es');

        return api.buscarPorZIP('94040', 'us').then(
            respuesta => {
                // console.log(respuesta);
                expect(typeof respuesta.id).to.equal('number');
                expect(typeof respuesta.main.temp).to.equal('number');
                expect(typeof respuesta.main.pressure).to.equal('number');
                expect(typeof respuesta.main.humidity).to.equal('number');
                expect(typeof respuesta.main.temp_min).to.equal('number');
                expect(typeof respuesta.main.temp_max).to.equal('number');
            }
        );
    });
});