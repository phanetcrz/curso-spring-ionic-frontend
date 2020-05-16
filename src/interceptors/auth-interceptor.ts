import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Rx'; // IMPORTANTE: IMPORT ATUALIZADO
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { StorageService } from '../services/storage.service';
import { API_CONFIG } from '../config/api.config';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

constructor(public storage : StorageService){ //pegar o token atraves do localStorage
}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let localUser = this.storage.getLocalUser(); //--pegar o token atraves do localStorage

        let N = API_CONFIG.baseUrl.length;  //-- Efetua um teste e compara a URL para saber se a requisição é para o aplicativo(API) ou não, caso for adiciona o header na requisição
        let requestToAPI = req.url.substring(0,N) == API_CONFIG.baseUrl;

        if (localUser && requestToAPI){ //para inserir o token no cabeçalho da requisição é necessário clocar através do comando abaixo que pega o requisição original "req" e clona acrescentando  Authorization e o Bearer
            const authReq = req.clone({headers: req.headers.set('Authorization','Bearer ' + localUser.token)}); 
        
            return next.handle(authReq);
        }
        else{
            return next.handle(req);   // caso não seja requisição pelo API não joga nada no cabeçalho  
        }    
    }
}

export const authInterceptorProvider = {   //-- É exigência do frameword a declaração do provider do interceptor 
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
};