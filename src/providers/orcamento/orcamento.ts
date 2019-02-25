import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class OrcamentoProvider {

  private orcaCarga = 'dias/carga/';
  private orcaPessoa = 'dias/pessoa/';
  private orcaExcursao = 'dias/excursao/';

  private orcamentoCarga = 'orcamento/carga/';
  private orcamentoPessoa = 'orcamento/pessoa/';
  private orcamentoExcursao = 'orcamento/excursao/';

  private orcaCargaHora = 'horas/carga/';
  private orcaPessoaHora = 'horas/pessoa/';
  private orcaExcursaoHora = 'horas/excursao/';


  constructor(private db:AngularFireDatabase) {

  }
  get(diakey, categoria){
    if (categoria == "carga") {
      return this.db.object(this.orcaCarga + diakey)
      .snapshotChanges()
      .map(c => {
        return {key: c.key, ...c.payload.val() };
      })
    } else if (categoria == "pessoa") {
      return this.db.object(this.orcaPessoa + diakey)
      .snapshotChanges()
      .map(c => {
        return {key: c.key, ...c.payload.val() };
      })
    } else {
      return this.db.object(this.orcaExcursao + diakey)
      .snapshotChanges()
      .map(c => {
        return {key: c.key, ...c.payload.val() };
      })
    }
    
  }

  getHora(horakey:any, categoria){
    if (categoria == "carga") {
      return this.db.object(this.orcaCargaHora + horakey)
      .snapshotChanges()
      .map(c => {
        return {key: c.key, ...c.payload.val() };
      })
    } else if (categoria == "pessoa") {
      return this.db.object(this.orcaPessoaHora + horakey)
      .snapshotChanges()
      .map(c => {
        return {key: c.key, ...c.payload.val() };
      })
    } else {
      return this.db.object(this.orcaExcursaoHora + horakey)
      .snapshotChanges()
      .map(c => {
        return {key: c.key, ...c.payload.val() };
      })
    }
    
  }

  getHoraSelect(diaSelect, categoria){
    if (categoria == "carga") {
      return this.db.list(this.orcaCargaHora, ref => { return ref.orderByChild('dia')
      .equalTo(diaSelect)})
      .snapshotChanges()
      .map(changes => {
        return changes.map(c => ({key: c.key, ...c.payload.val() }))});
    } else if (categoria == "pessoa") {
      return this.db.list(this.orcaPessoaHora, ref => { return ref.orderByChild('dia')
      .equalTo(diaSelect)})
      .snapshotChanges()
      .map(changes => {
        return changes.map(c => ({key: c.key, ...c.payload.val() }))});
    } else {
      return this.db.list(this.orcaExcursaoHora, ref => { return ref.orderByChild('dia')
      .equalTo(diaSelect)})
      .snapshotChanges()
      .map(changes => {
        return changes.map(c => ({key: c.key, ...c.payload.val() }))});
    }
  }
  
  save(diaData:any, categoria){
    if (categoria == "carga") {
      const data = {
        data: diaData.data,
        diaSemana: diaData.nomeDia,
      }
      if(diaData.key){
        this.db.list(this.orcaCarga).update(diaData.key, data);
      } else{
        this.db.list(this.orcaCarga).push(data);
      }
    } 
    
    else if (categoria == "pessoa") {
      const data = {
        data: diaData.data,
        diaSemana: diaData.nomeDia,
      }
      if(diaData.key){
        this.db.list(this.orcaPessoa).update(diaData.key, data);
      } else{
        this.db.list(this.orcaPessoa).push(data);
      } 
    } 
    
    else {
      const data = {
        data: diaData.data,
        diaSemana: diaData.nomeDia,
      }
      if(diaData.key){
        this.db.list(this.orcaExcursao).update(diaData.key, data);
      } else{
        this.db.list(this.orcaExcursao).push(data);
      }
    }
  }

  saveHora(horaData:any, categoria){
    if (categoria == "carga") {
      const data = {
        dia: horaData.dia,
        diaSemana: horaData.diaData,
        data: horaData.data,
        hora: horaData.hora,
        agendado: 'N',
      }
      if(horaData.key){
        this.db.list(this.orcaCargaHora).update(horaData.key, data);
      } else{
        this.db.list(this.orcaCargaHora).push(data);
      }
    } 
    
    else if (categoria == "pessoa") {
      const data = {
        dia: horaData.dia,
        diaSemana: horaData.diaData,
        data: horaData.data,
        hora: horaData.hora,
        agendado: 'N',
      }
      if(horaData.key){
        this.db.list(this.orcaPessoaHora).update(horaData.key, data);
      } else{
        this.db.list(this.orcaPessoaHora).push(data);
      } 
    } 
    
    else {
      const data = {
        dia: horaData.dia,
        diaSemana: horaData.diaData,
        data: horaData.data,
        hora: horaData.hora,
        agendado: 'N',
      }
      if(horaData.key){
        this.db.list(this.orcaExcursaoHora).update(horaData.key, data);
      } else{
        this.db.list(this.orcaExcursaoHora).push(data);
      } 
    }
  }

  saveOrcamento(orcamentoData:any, categoria){
    if (categoria == "carga") {
      const data = {
        horakey: orcamentoData.key,
        usuario: orcamentoData.usuario,
        email: orcamentoData.email,
        telefone: orcamentoData.telefone,
        hora: orcamentoData.hora,
        diaSemana: orcamentoData.dia,
        data: orcamentoData.data,
        categoria: orcamentoData.categoria,
        origem: orcamentoData.origem,
        destino: orcamentoData.destino,
      }
        this.db.list(this.orcamentoCarga).push(data);
        this.db.list(this.orcaCargaHora).update(data.horakey, {agendado: 'S'});
    } 
    
    else if (categoria == "pessoa") {
      const data = {
        horakey: orcamentoData.key,
        usuario: orcamentoData.usuario,
        email: orcamentoData.email,
        telefone: orcamentoData.telefone,
        hora: orcamentoData.hora,
        diaSemana: orcamentoData.dia,
        data: orcamentoData.data,
        categoria: orcamentoData.categoria,
        origem: orcamentoData.origem,
        destino: orcamentoData.destino,
      }
        this.db.list(this.orcamentoPessoa).push(data);
        this.db.list(this.orcaPessoaHora).update(data.horakey, {agendado: 'S'});
    } 
    
    else {
      const data = {
        horakey: orcamentoData.key,
        usuario: orcamentoData.usuario,
        email: orcamentoData.email,
        telefone: orcamentoData.telefone,
        hora: orcamentoData.hora,
        diaSemana: orcamentoData.dia,
        data: orcamentoData.data,
        categoria: orcamentoData.categoria,
        origem: orcamentoData.origem,
        destino: orcamentoData.destino,
      }
        this.db.list(this.orcamentoExcursao).push(data);
        this.db.list(this.orcaExcursaoHora).update(data.horakey, {agendado: 'S'});
    }
  }

  removeDia(key:string, dia:string, categoria:any){
    if(categoria == 'carga'){
      this.db.list(this.orcaCargaHora).remove(dia);
      this.db.list(this.orcaCarga).remove(key);
    } else if(categoria == 'pessoa'){
      this.db.list(this.orcaPessoa).remove(key);
    } else {
      this.db.list(this.orcaExcursao).remove(key);
    }
  }
  
  removeHora(key:string, categoria:any){
    if(categoria == 'carga'){
      this.db.list(this.orcaCargaHora).remove(key);
    } else if(categoria == 'pessoa'){
      this.db.list(this.orcaPessoaHora).remove(key);
    } else {
      this.db.list(this.orcaExcursaoHora).remove(key);
    }
  }

  removeOrcamento(key:string, categoria:any){
    if(categoria == 'carga'){
      this.db.list(this.orcamentoCarga).remove(key);
    } else if(categoria == 'pessoa'){
      this.db.list(this.orcamentoPessoa).remove(key);
    } else {
      this.db.list(this.orcamentoExcursao).remove(key);
    }
  }
}
