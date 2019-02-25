import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExcursaoPage } from './excursao';

@NgModule({
  declarations: [
    ExcursaoPage,
  ],
  imports: [
    IonicPageModule.forChild(ExcursaoPage),
  ],
})
export class ExcursaoPageModule {}
