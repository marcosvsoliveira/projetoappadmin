import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadastroagendaPage } from './cadastroagenda';

@NgModule({
  declarations: [
    CadastroagendaPage,
  ],
  imports: [
    IonicPageModule.forChild(CadastroagendaPage),
  ],
})
export class CadastroagendaPageModule {}
