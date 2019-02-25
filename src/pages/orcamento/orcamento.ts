import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OrcamentoProvider } from '../../providers/orcamento/orcamento';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-orcamento',
  templateUrl: 'orcamento.html',
})
export class OrcamentoPage {
  
  formAgenda: FormGroup;
  param: any;
  userName: string;
  userData:any;
  email: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private formBuilder: FormBuilder,
              private toast: ToastController,
              private orcamentoProvider: OrcamentoProvider,
              private auth: AngularFireAuth) {

                this.param = this.navParams.data || {};
                this.createFormAgenda();

                const consulta = this.orcamentoProvider.getHora(this.navParams.data.horakey, this.navParams.data.categoria).subscribe((Data:any) => {
                  consulta.unsubscribe();
                  this.param = Data;
                  this.createFormAgenda();
                })
  }

  ionViewDidLoad(){
    const userState = this.auth.authState.subscribe( user => {
      if (user){
        this.userName = user.displayName;
        this.email = user.email;
        userState.unsubscribe();
      }
    })
  }

  createFormAgenda(){
    this.formAgenda = this.formBuilder.group({
      key:[this.param.key],
      dia:[this.param.diaSemana],
      data:[this.param.data],
      usuario:[this.userName],
      email:[this.email, Validators.required],
      telefone:[this.param.telefone, Validators.required],
      categoria:[this.navParams.data.categoria],
      hora:[this.param.hora],
      origem:[this.param.origem, Validators.required],
      destino:[this.param.destino, Validators.required],
    })
  }

  onSubmit(){
    if(this.formAgenda.valid){
      this.orcamentoProvider.saveOrcamento(this.formAgenda.value, this.navParams.data.categoria);
      this.toast.create({message: 'Orçamento enviado com sucesso!', duration:3000}).present();
      this.navCtrl.pop();
    }
  }
}
