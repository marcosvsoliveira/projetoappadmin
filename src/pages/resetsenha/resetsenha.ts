import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ProvidersProvider } from './../../providers/providers/providers';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-resetsenha',
  templateUrl: 'resetsenha.html',
})
export class ResetsenhaPage {

  form: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private accountProvider: ProvidersProvider,
    private toast: ToastController) {

      this.creatForm();
  }

  private creatForm(){
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    })
  }

  onSubmit(){
    if(this.form.valid) {
      this.accountProvider.forgotEmail(this.form.value.email).then( (user:any) => {
        this.toast.create({ message: 'Um e-mail foi enviado para que você crie uma nova senha', duration: 6000}).present();
        this.navCtrl.pop();
      })
      .catch(message => {
        this.toast.create({ message: message, duration: 3000}).present();
      })
    }
  }

}
