import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { CidadeDTO } from "../../models/cidade.dto";
import { Observable } from "rxjs/Rx";



@Injectable()    //-- para que CategoriaService seja um seriço que possa ver injetado em outras classes usa-se essa variavel
export class CidadeService{
    constructor(public http: HttpClient ){
    }

    findAll(estado_id : string) : Observable<CidadeDTO[]> {
        return this.http.get<CidadeDTO[]>(`${API_CONFIG.baseUrl}/estados/${estado_id}/cidades`);    //--estou dizendo que esse get "tipado" é expecifico da minha lista de categoria DTO
    }
}