import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { CategoriaDTO } from "../../models/categoria.dto";
import { Observable } from "rxjs/Rx";



@Injectable()    //-- para que CategoriaService seja um seriço que possa ver injetado em outras classes usa-se essa variavel
export class CategoriaService{
    constructor(public http: HttpClient ){
    }

    findAll() : Observable<CategoriaDTO[]> {
        return this.http.get<CategoriaDTO[]>(`${API_CONFIG.baseUrl}/categorias`);    //--estou dizendo que esse get "tipado" é expecifico da minha lista de categoria DTO
    }
}