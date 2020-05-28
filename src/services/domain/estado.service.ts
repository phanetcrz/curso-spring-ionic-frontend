import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { EstadoDTO } from "../../models/estado.dto";
import { Observable } from "rxjs/Rx";



@Injectable()    //-- para que CategoriaService seja um seriço que possa ver injetado em outras classes usa-se essa variavel
export class EstadoService{
    constructor(public http: HttpClient ){
    }

    findAll() : Observable<EstadoDTO[]> {
        return this.http.get<EstadoDTO[]>(`${API_CONFIG.baseUrl}/estados`);    //--estou dizendo que esse get "tipado" é expecifico da minha lista de categoria DTO
    }
}