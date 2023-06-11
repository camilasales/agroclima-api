import axios from 'axios';
import qs from 'qs';
// import { ChatGPTUnofficialProxyAPI } from 'chatgpt'
import { environments } from '../../config/environments';
// import { ChatGPTAPI } from 'chatgpt'
// const chatgpt = require("chatgpt");

export default class MeteumProvider {
    private baseUrl = `https://api.meteum.ai/v1`;
    private headers = {
        'Content-Type': 'application/json',
        'X-Meteum-API-Key': environments.meteum_key
    };
    private lat: string;
    private long: string;
    private result!: any;

    constructor(lat: string, long: string) {
        this.lat = lat; //52.37125
        this.long = long; //4.89388   
    }

    public async consultarClima() {
        try {
            const options: any = {
                baseURL: this.baseUrl,
                url: `/forecast?lat=${this.lat}&long=${this.long}`,
                method: 'GET',
                headers: this.headers,
                // body: JSON.stringify({
                //     model: 'text-davinci-003', //modelo
                //     prompt: question, //texto da pergunta
                //     max_tokens: 2048, //tamano da resposta
                //     temperature: 0.5 //criatividade da resposta
                // })
                // data: qs.stringify(body)
            };
            
            await axios(options).then((response: any) => {
                this.result = response.data
            });
            return this.result;

        } catch (error) {
            throw error;
        }
    }

    // obter informações sobre o clima atual em um local específico
    public async getClimaAtual() {
        try {
            const options: any = {
                baseURL: this.baseUrl,
                url: `/fact?lat=${this.lat}&long=${this.long}`,
                method: 'GET',
                headers: this.headers
            };
            
            await axios(options).then((response: any) => {
                const resp = response.data;
                this.result = {
                    temperatura: resp.temp,
                    umidade_do_ar: resp.humidity,
                    tipo_precipitacao: resp.prec_type,
                    intensidade_precipitacao: resp.prec_strength,
                    velocidade_vento: resp.wind_speed,
                    direcao_vento: resp.wind_dir,
                    nebulosidade: resp.cloudness,
                };
            });

            return this.result;

        } catch (error) {
            throw error;
        }
    }

    // 
    public async getPrevisaoTempo(limit: string = '1') {
        try {
            const options: any = {
                baseURL: this.baseUrl,
                url: `/forecast?lat=${this.lat}&long=${this.long}&limit=${limit}`,
                method: 'GET',
                headers: this.headers
            };
            
            await axios(options).then((response: any) => {
                const resp = response.data;
                this.result = resp.forecasts;
            });

            return this.result;

        } catch (error) {
            throw error;
        }
    }

    public async getPrevisaoChuva() {
        try {
            const options: any = {
                baseURL: this.baseUrl,
                url: `/nowcast/timeline?lat=${this.lat}&long=${this.long}`,
                method: 'GET',
                headers: this.headers
            };
            
            await axios(options).then((response: any) => {                
                const resp = response.data;
                this.result = resp;
            });

            return this.result;

        } catch (error) {
            throw error;
        }
    }
}