import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrcamentoProvider } from '../../providers/orcamento/orcamento';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-cadastroagenda',
  templateUrl: 'cadastroagenda.html',
})
export class CadastroagendaPage {

  title: string;
  form: FormGroup;
  formHora: FormGroup;
  dias: any;
  horas: any;
  agenda: Observable<any[]>;
  agendaHora: Observable<any[]>;
  diaItem: any;
  diaSelect: any;

  dataArray:any;
  d:any;
  diaSemana:any;
  diaNome:any;

  private orcaCargaDias = 'dias/carga/';
  private orcaPessoaDias = 'dias/pessoa/';
  private orcaExcursaoDias = 'dias/excursao/';

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private formBuilder: FormBuilder,
              private toast: ToastController,
              private orcamentoProvider: OrcamentoProvider,
              public db: AngularFireDatabase) {
      
              this.dias = this.navParams.data.dias || {};
              this.horas = this.navParams.data.horas || {};
              this.SetupPageTitle();
              this.createForm();
              this.createFormHora();

              this.agenda = this.getAll(this.navParams.data.categoria);

              const consulta = this.orcamentoProvider.get(this.navParams.data.diakey, this.navParams.data.categoria).subscribe((Data:any) => {
                consulta.unsubscribe();
                this.dias = Data;
                this.createForm();
              });
              const consultaHora = this.orcamentoProvider.getHora(this.navParams.data.horakey, this.navParams.data.categoria).subscribe((Data:any) => {
                consultaHora.unsubscribe();
                this.horas = Data;
                this.createFormHora();
              });

  }

  getAll(categoria){
    if (categoria == "carga") {
      return this.db.list(this.orcaCargaDias, ref => ref.orderByChild('data'))
        .snapshotChanges()
        .map(changes => {
          return changes.map(c => ({ key: c.key, ...c.payload.val() }));
        })
    }

    else if (categoria == "pessoa") {
      return this.db.list(this.orcaPessoaDias, ref => ref.orderByChild('data'))
        .snapshotChanges()
        .map(changes => {
          return changes.map(c => ({ key: c.key, ...c.payload.val() }));
        })
    }

    else{
      return this.db.list(this.orcaExcursaoDias, ref => ref.orderByChild('data'))
        .snapshotChanges()
        .map(changes => {
          return changes.map(c => ({ key: c.key, ...c.payload.val() }));
        })
    }
  }

  getDiaSelect(){
    this.agendaHora = this.orcamentoProvider.getHoraSelect(this.diaSelect, this.navParams.data.categoria);
  }

  getDia(){
    this.horas = this.orcamentoProvider.getHora(this.formHora.value.dia, this.navParams.data.categoria);

    const subscribe = this.orcamentoProvider.get(this.formHora.value.dia, this.navParams.data.categoria).subscribe(diaData => {
      subscribe.unsubscribe();
      this.diaItem = diaData;
      this.formHora.controls['diaData'].setValue(this.diaItem.diaSemana);
      this.formHora.controls['data'].setValue(this.diaItem.data);
      });
  }

  deleteDia(key:string, dia:string, categoria:any){
    this.orcamentoProvider.removeDia(key, dia, categoria);
    this.toast.create({message: 'Data removida com sucesso!!!', duration:3000}).present();
  }

  deleteHora(key:string, categoria:any){
    this.orcamentoProvider.removeHora(key, categoria);
    this.toast.create({message: 'Hora removida com sucesso!!!', duration:3000}).present();
  }

  private SetupPageTitle(){
    if (this.navParams.data.categoria == 'carga'){
      this.title = 'Agenda Carga';
    } else if(this.navParams.data.categoria == 'pessoa'){
      this.title = 'Agenda Pessoa';
    } else{
      this.title = 'Agenda Excurção';
    }
  }

  private createForm(){
    this.form = this.formBuilder.group({
      nomeDia: [''],
      data:[''],
    });
  }

  nomeDia(){
    this.dataArray = this.form.value.data.split("-");
      this.d = this.dataArray[0] + '/' + this.dataArray[1] + '/' + this.dataArray[2];
      this.d = new Date(this.d);
      this.diaSemana = ['Segunda','Terça','Quarta','Quinta','Sexta','Sábado','Domingo'];
      this.diaNome = this.diaSemana[this.d.getDay()-1];
  }
  
  private createFormHora(){
    this.formHora = this.formBuilder.group({
      dia:[this.horas.dia],
      diaData:[this.horas.diaData],
      data:[this.horas.data],
      key:[this.horas.key],
      hora:[this.horas.hora, Validators.required],
    });

  }

  onSubmit(categoria){
    if(this.form.valid){
      this.orcamentoProvider.save(this.form.value, categoria);
      this.toast.create({message: 'Data salva com sucesso', duration: 3000}).present();
      this.form.reset();
    }
  }

  onSubmitHora(categoria){
    if(this.formHora.valid){
      this.orcamentoProvider.saveHora(this.formHora.value, categoria);
      this.toast.create({message: 'Hora salva com sucesso', duration: 3000}).present();
      this.formHora.reset();
    }
  }
}
