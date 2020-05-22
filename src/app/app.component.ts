import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from '../services/auth.service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: string = 'HomePage';   //--aqui define qual será a pagina principal do aplicativo
                                   // foi retirado da rootPage a variavel any é do tipo genérico que faz a variavel aceitar qualquer tipo de objeto

  pages: Array<{title: string, component: string}>;

  constructor(
              public platform: Platform, 
              public statusBar: StatusBar, 
              public splashScreen: SplashScreen,
              public auth : AuthService) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Profile', component: 'ProfilePage' },
      { title: 'Categorias', component: 'CategoriasPage' },
      { title: 'Logout', component: '' }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page: {title:string, component:string}) {  //--Criado a tipagem com esses dois parametros "title" e "component" para que eu consiga acessar os atributos do objeto "page"
    
    switch (page.title){
      case 'Logout':
        this.auth.logout(); //retira o token do armazenamento que é o localStorage
        this.nav.setRoot('HomePage'); //-- após retirar o token, será redirecionado para a página home
        break;

      default:
        this.nav.setRoot(page.component);
    }    
  }
}
