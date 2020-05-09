import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController } from 'ionic-angular';
import { CredenciaisDTO } from '../../models/credenciais.dto';
import { hydrateSegmentsWithNav } from 'ionic-angular/umd/navigation/url-serializer';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(public navCtrl: NavController, public menu: MenuController) {
  }

  creds : CredenciaisDTO = {
    email:"",
    senha:""  
  };

  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }
  
  ionViewDidLeave() {
    this.menu.swipeEnable(true);
  }

  login(){
    //this.navCtrl.push('CategoriasPage');                             //--push é um metodo de empilamento de página que ao chamar uma pagina ela fica sobre a outra.
    
    console.log(this.creds);
    this.navCtrl.setRoot('CategoriasPage');                            //--  SetRoot navegação sem empilhar 
  }
}
