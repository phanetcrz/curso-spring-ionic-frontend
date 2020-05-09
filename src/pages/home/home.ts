import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController } from 'ionic-angular';
import { CredenciaisDTO } from '../../models/credenciais.dto';
import { hydrateSegmentsWithNav } from 'ionic-angular/umd/navigation/url-serializer';
import { AuthService } from '../../services/auth.service';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(
    public navCtrl: NavController, 
    public menu: MenuController,
    public auth: AuthService) {
  }

  creds : CredenciaisDTO = {
    email:"",
    senha:""  
  };

  ionViewWillEnter() {
    this.menu.swipeEnable(false); // desabilita a função de arrastar
  }
  
  ionViewDidLeave() {
    this.menu.swipeEnable(true);
  }

  login(){
    //this.navCtrl.push('CategoriasPage');                             //--push é um metodo de empilamento de página que ao chamar uma pagina ela fica sobre a outra.
    this.auth.authenticate(this.creds)
      .subscribe(response =>{  //se increve para receber a responsta e se a resposta vier com sucesso
        console.log(response.headers.get('Authorization')); //--imprime a resposta no console
        this.navCtrl.setRoot('CategoriasPage');   //--  SetRoot navegação sem empilhar  chamando a pagina categoria
      },
      error => {});    
  }
}
