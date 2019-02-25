import { HomePage } from './../home/home';
import { ProvidersProvider } from './../../providers/providers/providers';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-cadastrar',
  templateUrl: 'cadastrar.html',
})
export class CadastrarPage {

  form: FormGroup;

  constructor(public navCtrl: NavController,
              private formBuilder: FormBuilder,
              private auth: ProvidersProvider,
              private toast: ToastController,
              public navParams: NavParams) {
    this.creatForm();
  }

  private creatForm() {
    this.form = this.formBuilder.group({
      nome:['', Validators.required],
      nascimento:[''],
      email:['', [Validators.required, Validators.email]],
      password:['', Validators.required],
      telefone:['', Validators.required]
    });
  }

  onSubmit(){
    if (this.form.valid){
      this.auth.createAccount(this.form.value).then( () => {
        this.toast.create({
          message: 'Conta criada com sucesso. Foi enviado um e-mail para que você confirme antes de se logar!', duration: 3000
        }).present();
        this.navCtrl.setRoot(HomePage);
      })
      .catch(message => {
        this.toast.create({message: message, duration:3000}).present();
      })
    }
  }

  onClose(){
    this.navCtrl.pop();
  }
}
