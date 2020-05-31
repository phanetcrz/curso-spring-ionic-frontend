import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EstadoService } from '../../services/domain/estado.service';
import { CidadeService } from '../../services/domain/cidade.service';
import { EstadoDTO } from '../../models/estado.dto';
import { CidadeDTO } from '../../models/cidade.dto';
import { ClienteService } from '../../services/domain/cliente.service';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup: FormGroup;  //-- é um objeto do angular reacjForms ajuda a controlar o formulário, fazendo validações 
  estados: EstadoDTO[];
  cidades: CidadeDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder, //-- quando faz uso de um FormGroup é necessário importar um componente formBuilder
    public cidadeService: CidadeService,
    public estadoService: EstadoService,
    public clienteService: ClienteService,
    public alertCtrl: AlertController) {  

    //--instanciar um formGroup você chama um formBuilder.group que é responsável pela instanciação 
    this.formGroup = this.formBuilder.group({
      //mesmo atributo que tem no formulário signup.html
      nome: ['Joaquim', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
      email: ['joaquim@gmail.com', [Validators.required, Validators.email]],
      tipo : ['1', [Validators.required]],
      cpfOuCnpj : ['06134596280', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
      senha : ['123', [Validators.required]],
      logradouro : ['Rua Via', [Validators.required]],
      numero : ['25', [Validators.required]],
      complemento : ['Apto 3', []],
      bairro : ['Copacabana', []],
      cep : ['10828333', [Validators.required]],
      telefone1 : ['977261827', [Validators.required]],
      telefone2 : ['', []],
      telefone3 : ['', []],
      estadoId : [null, [Validators.required]],
      cidadeId : [null, [Validators.required]]    
    });   
  }

  ionViewDidLoad(){
    this.estadoService.findAll()
      .subscribe(response => {
        this.estados = response; //aqui está dando um binding no objeto estadoDTO
        this.formGroup.controls.estadoId.setValue(this.estados[0].id); //pega o primeiro elemento da lista e atribui na lista de estadoId do formulário 

        this.updateCidades();  //faz a busca da cidade referente ao estado selecionado acima
      },
      error => {}); //está fazio, mas poder ser utilizado para futuros tratamentos de erros  
  }

  updateCidades(){
    let estado_id = this.formGroup.value.estadoId; // pega o id do estado que foi selecionao lá na lista htmp do formulário
    this.cidadeService.findAll(estado_id)
      .subscribe(response => {   //--vou me inscrever para ter a responsa 
        this.cidades = response;  //-- se a resposta vir com sucesso mandos dados para o objeto cidadesDto
        this.formGroup.controls.cidadeId.setValue(null);// Tira a seleção da caixa de cidades
      },
      error => {}); //está fazio, mas poder ser utilizado para futuros tratamentos de erros 
  }
  
  signupUser(){   //--Procedure responsável pela inserção dos dados do cliente
    //console.log(this.formGroup.value);    //---this.formGroup.value que contém os dados do formulário

    this.clienteService.insert(this.formGroup.value)
      .subscribe(Response => {
        this.showInsertOk()  
      },
      error => {}); //está fazio, mas poder ser utilizado para futuros tratamentos de erros 
  }

  showInsertOk(){
    let alert = this.alertCtrl.create({
      title: 'Sucesso!'  ,
      message: 'Cadastro efetuado com sucesso',
      enableBackdropDismiss: false, //-- isso quer dizer que só sai do alert clicando no botão
      buttons:  [
        {
          text: 'Ok',
          handler:  () =>{  //-- handler:() = representa uma função anonima para ser executada no clique no botão
            this.navCtrl.pop(); //-- pop função para desempilhar a pagina

          }
        }
      ]
    })
    alert.present(); //-- função para apresentar o alert na tela
  }
}
