import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';
import { ClienteDTO } from '../../models/cliente.dto';
import { ClienteService } from '../../services/domain/cliente.service';
import { API_CONFIG } from '../../config/api.config';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  cliente: ClienteDTO;
  
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public storage: StorageService,
              public clienteService: ClienteService) {
  }

  ionViewDidLoad() {
    let LocalUser = this.storage.getLocalUser();
    if (LocalUser && LocalUser.email){
      this.clienteService.findByEmail(LocalUser.email)  
        .subscribe(response =>{
          this.cliente = response;  
          this.getImageIfExists();
        },
          error => {
            if (error.status==403){
              this.navCtrl.setRoot('HomePage');
            }    
          });
    }
    else{ //--caso ocorra algum problema na hora de obter o token no localUser, ele redireciona para a página home
      this.navCtrl.setRoot('HomePage'); //--comando para chamar a página homePage
    }
  }

  getImageIfExists() {
    this.clienteService.getImageFromBucket(this.cliente.id)
    .subscribe(response => {
      this.cliente.imageUrl = `${API_CONFIG.BucketBaseUrl}/cp${this.cliente.id}.jpg`;
    },
    error => {});    
  }
}
