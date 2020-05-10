import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CredenciaisDTO } from "../models/credenciais.dto";
import { API_CONFIG } from "../config/api.config";
import { LocalUser } from "../models/local_users";
import { StorageService } from "./storage.service";
import { UrlSerializer } from "ionic-angular";

@Injectable() //-- para que CategoriaService seja um seriço que possa ver injetado em outras classes usa-se essa variavel
export class AuthService {
    
    constructor(public http: HttpClient, public storage: StorageService){
    }
    
    authenticate(creds : CredenciaisDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/login`, 
            creds,
            {
                observe: 'response', //--porque terá que pegar o header da reposta, pois a requisição vai retornar um objeto do tipo resposta tenho acesso ao header
                responseType: 'text' // que será um text e não um json, pois o endpoin de login retorna uma resposta de corpo vazio, pois colocando como texto o framework não tente fazer um parce(conversão) para Json
            });
    }  

    successfulLogin(authorizationValue : String){
        let tok = authorizationValue.substring(7);
        let user : LocalUser = {
            token: tok
        }; 
        
        this.storage.setLocalUser(user);    
    }
    
    logout(){
        this.storage.setLocalUser(null);
    }
}