import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-arealogada',
  templateUrl: 'arealogada.html',
})
export class ArealogadaPage {

  userName: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private auth: AngularFireAuth) { }

  ionViewDidLoad(){
    const userState = this.auth.authState.subscribe( user => {
      if (user){
        this.userName = user.displayName;
        userState.unsubscribe();
      }
    })
  }
  
  newAgenda(categoria:string){
    this.navCtrl.push('CadastroagendaPage', {categoria});
  }
  
  agendaOrcamento(categoria:string){
    if(categoria == "carga"){
      this.navCtrl.push('TranscargaPage', {categoria});
    } else if(categoria == "pessoa"){
      this.navCtrl.push('TranspessoaPage', {categoria});
    } else {
      this.navCtrl.push('ExcursaoPage', {categoria});
    }
  }

  orcaRecebidos(){
    this.navCtrl.push('OrcamentosrecebidosPage');
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

