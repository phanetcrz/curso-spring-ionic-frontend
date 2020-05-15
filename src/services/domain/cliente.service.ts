import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { ClienteDTO } from "../../models/cliente.dto";
import { API_CONFIG } from "../../config/api.config";
import { StorageService } from "../storage.service";

@Injectable()
export class ClienteService{

    constructor(public http: HttpClient, public storage: StorageService){
    }    

    findById(id: string) {
        return this.http.get(`${API_CONFIG.baseUrl}/clientes/${id}`);
    }
        
    findByEmail(email: String) : Observable<ClienteDTO>{

        let token = this.storage.getLocalUser().token;   //coletando o token do localStorage e usando para acessar o cabeçalho
        let authHeader = new HttpHeaders({'Authorization': 'Bearer ' + token});
   
        return this.http.get<ClienteDTO>(
            `${API_CONFIG.baseUrl}/clientes/email?value=${email}`,
            {'headers': authHeader}); //-- com isso passa o cabeçalho para a requisição            
    }
    
    getImageFromBucket(id : string) : Observable<any> {  //--coletando a imagem do cliente lá no bucket do amazon
        let url = `${API_CONFIG.BucketBaseUrl}/cp${id}.jpg`
        return this.http.get(url, {responseType : 'blob'});
    }    
}