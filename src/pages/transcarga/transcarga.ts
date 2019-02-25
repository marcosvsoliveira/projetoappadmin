import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { HomePage } from './../../pages/home/home';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { OrcamentoProvider } from '../../providers/orcamento/orcamento';

@IonicPage()
@Component({
  selector: 'page-transcarga',
  templateUrl: 'transcarga.html',
})
export class TranscargaPage {

  agenda: Observable<any[]>;
  agendaHora: Observable<any[]>;
  diaSelect: any;
  public month: any;
  public day: any;
  public yeat: any;
  private PATH = 'dias/carga/';
  rootPage: any = HomePage;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public auth: AngularFireAuth,
              public db: AngularFireDatabase,
              public orcamentoProvider: OrcamentoProvider) {

                this.agenda = this.getAll();
                
  }
  getAll(){
    return this.db.list(this.PATH, ref => ref.orderByChild('data'))
      .snapshotChanges()
      .map(changes => {
        return changes.map(c => ({ key: c.key, ...c.payload.val() }));
      })
  }
  getDiaSelect(){
    this.agendaHora = this.orcamentoProvider.getHoraSelect(this.diaSelect, this.navParams.data.categoria);
  }

  orcamento(hora:any, categoria:string){
    this.navCtrl.push('OrcamentoPage', {horakey: hora.key, categoria});
  }
}
