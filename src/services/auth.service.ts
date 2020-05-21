import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CredenciaisDTO } from "../models/credenciais.dto";
import { API_CONFIG } from "../config/api.config";
import { LocalUser } from "../models/local_users";
import { StorageService } from "./storage.service";
import {JwtHelper} from 'angular2-jwt';

type NewType = JwtHelper;

@Injectable() //-- para que CategoriaService seja um seriço que possa ver injetado em outras classes usa-se essa variavel
export class AuthService {
    
    jwtHelper: NewType = new JwtHelper(); ///--utilizado para extrair um valor do token, que nesse caso é o email

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

    refreshToken() {
        return this.http.post(
            `${API_CONFIG.baseUrl}/auth/refresh_token`, 
            {},
            {
                observe: 'response', //--porque terá que pegar o header da reposta, pois a requisição vai retornar um objeto do tipo resposta tenho acesso ao header
                responseType: 'text' // que será um text e não um json, pois o endpoin de login retorna uma resposta de corpo vazio, pois colocando como texto o framework não tente fazer um parce(conversão) para Json
            });
    }  

    successfulLogin(authorizationValue : String){
        let tok = authorizationValue.substring(7);
        let user : LocalUser = {
            token: tok,
            email: this.jwtHelper.decodeToken(tok).sub     //-- esse comando faz pegar o email do token
        }; 
        
        this.storage.setLocalUser(user);    
    }
    
    logout(){
        this.storage.setLocalUser(null);
    }
}
/* solução para o erro de dependencia por causa da versão do angula, foi preciso fazer o procedumento de atualização da versão e depois atualizar o angular/http, coforme abaixo:
npm install @angular/core@5.2.3 --save


Basta pressionar o prompt de comando, vá para a pasta do projeto e execute

npm install @angular/http@latest
Se houver alguma gravidade encontrada, como algumas vezes é exibida após a instalação, basta usar

npm audit fix

 */