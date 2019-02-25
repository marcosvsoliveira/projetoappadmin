import { AngularFireAuth } from 'angularfire2/auth';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProvidersProvider } from './../../providers/providers/providers';
import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  form: FormGroup;
  userName: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private formBuilder: FormBuilder,
              private auth: AngularFireAuth,
              private providersProvider: ProvidersProvider,
              private toast: ToastController) {
this.creatForm();
}

  private creatForm(){
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
  }

  onSubmit(){
    if(this.form.valid) {
      this.providersProvider.login(this.form.value)
      .then( (user: any) => {
        if (user.emailVerified){
          this.navCtrl.setRoot('ArealogadaPage');
        } else {
          this.toast.create({ message:'Seu e-mail ainda não foi verificado. Por favor acesso seu e-mail e clique no link para verificar conta', duration: 6000 }).present();
        }
      })
      .catch( message => {
        this.toast.create({ message: message, duration: 3000}).present();
      })
    }
  }

  signOut(){
    this.auth.auth.signOut();
      const userState = this.auth.authState.subscribe( user => {
        if (!user){
          this.userName = '';
          this.navCtrl.setRoot(HomePage);
          userState.unsubscribe();
        }
      })
  }

}
