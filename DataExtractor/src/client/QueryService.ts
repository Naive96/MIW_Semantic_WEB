import axios from 'axios';
import { CHARACTERS_SHORT_QUERY, COMPANIES_QUERY, GAMES_SHORT_QUERY } from './Queries';
import { RDFParser } from '../service/RDFParser';

export class QueryService {
    baseUrl: string = 'https://query.wikidata.org/sparql';
    parser: RDFParser = new RDFParser();

    obtainGames() {
        const url = `${this.baseUrl}?query=${GAMES_SHORT_QUERY}`;
        return axios.get(url, { headers: this.headers() });
    }

    obtainCompanies() {
        const url = `${this.baseUrl}?query=${COMPANIES_QUERY}`;
        return axios.get(url, { headers: this.headers() });
    }

     obtainCharacters() {
        const url = `${this.baseUrl}?query=${CHARACTERS_SHORT_QUERY}`;
        return axios.get(url, {headers: this.headers() });
    }

    parseData(data:any, kind:string){
        this.parser.parse(data, kind);
    }

    save(dataKind: string) {
        this.parser.save(dataKind);
    }


    private headers() {
        return { 'Accept': 'application/sparql-results+json' }
    }

}