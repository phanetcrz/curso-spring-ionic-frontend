import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Rx'; // IMPORTANTE: IMPORT ATUALIZADO
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { StorageService } from '../services/storage.service';
//import { FieldMessage } from '../models/fieldmessage';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(public storage: StorageService, public alertCtrl: AlertController) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //console.log("Passou no interceptor");
        return next.handle(req)
        .catch((error, caught) => {
             
            //--declarando a varial errorObj
            let errorObj = error;
            if (errorObj.error) { //--o errorobj tem o campo error, se tiver
                errorObj = errorObj.error;
            }
            if (!errorObj.status) {  //-- verifica se o objeto json, caso não ele faz a conversão do errorObj para o formato Json
                errorObj = JSON.parse(errorObj);
            }

            console.log("Erro detectado pelo interceptor:");
            console.log(errorObj);

            switch(errorObj.status) {
                case 401:           //-- Erro de Autenticação   tratamento com alert's referencia https://ionicframework.com/docs/api/alert
                this.handle401();
                break;
        
                case 403:           //-- O Erro 403 Acesso negado/proibido indica que seu servidor está funcionando, mas você não possui mais permissão para visualizar todo ou partes do seu site por algum motivo.
                this.handle403();
                break;

                case 404:
                this.handle404();
                break

             //   case 422:
             //   this.handle422(errorObj);
             //   break;

                default:
                this.handleDefaultEror(errorObj);           
            }    

            return Observable.throw(errorObj);
        }) as any;
    }
    
    handle401() {
        let alert = this.alertCtrl.create({
            title: 'Erro 401: falha de autenticação',
            message: 'Email ou senha incorretos',
            enableBackdropDismiss: false, //-- faz com na hora de sair, tem que apertar no botão do alert e não fora dele.
            buttons: [
                {
                    text: 'Ok'
                }
            ]
        });
        alert.present();   ///-- apresenta o alert para o usuário
    }

    handle403() {
        this.storage.setLocalUser(null);  //--caso um localUser esteja inválido, essa função remove deixando nulo
    }

    handle404() {
        let alert = this.alertCtrl.create({
            title: 'Erro 404: Não encontrada',
            message: 'Página não encontrada',
            enableBackdropDismiss: false, //-- faz com na hora de sair, tem que apertar no botão do alert e não fora dele.
            buttons: [
                {
                    text: 'Ok'
                }
            ]
        });
        alert.present();   ///-- apresenta o alert para o usuário
    }    

/*
    handle422(errorObj) {
        let alert = this.alertCtrl.create({
            title: 'Erro 422: Validação',
            message: this.listErrors(errorObj.errors),
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'Ok'
                }
            ]
        });
        alert.present();
    }*/

    handleDefaultEror(errorObj) {   //-- tratamento para qualquer erro diferente de 401, 422, 403
        let alert = this.alertCtrl.create({
            title: 'Erro ' + errorObj.status + ': ' + errorObj.error,
            message: errorObj.message,
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'Ok'
                }
            ]
        });
        alert.present();        
    }

  /*  private listErrors(messages : FieldMessage[]) : string {
        let s : string = '';
        for (var i=0; i<messages.length; i++) {
            s = s + '<p><strong>' + messages[i].fieldName + "</strong>: " + messages[i].message + '</p>';
        }
        return s;
    }*/
}

export const ErrorInterceptorProvider = {   //-- É exigência do frameword a declaração do provider do interceptor 
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};