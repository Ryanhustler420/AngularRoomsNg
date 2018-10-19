import { NgModule } from '@angular/core';
import { MapComponent } from './map.component';
import { AgmCoreModule } from '@agm/core';
import { ApiKey } from './../../../../server/config/Map_api';
import { MapService } from './map.service';

@NgModule({
  declarations: [
    MapComponent
  ],
  exports: [
    MapComponent
  ],
  imports: [
  AgmCoreModule.forRoot({
      apiKey: ApiKey.Get_Api
    })
  ],
  providers: [
    MapService
  ]
})
export class MapModule { }
