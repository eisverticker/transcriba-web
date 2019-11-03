import { NgModule }       from '@angular/core';

import { ConfigurationService } from './configuration.service';
import { ConfigurationPipe } from './configuration.pipe';

@NgModule({
    declarations: [ConfigurationPipe],
    imports:      [],
    bootstrap:    [],
    providers: [ConfigurationService]
})
export class ConfigurationModule {}
