import { NgModule }       from '@angular/core';

//components
import { BePatientComponent } from './be-patient.component';

//directives
import { EmailValidator } from './email-validator';

//services
import { BackendHelper } from './backend-helper';
import { LoggerService } from './logger.service';
import { NotificationService } from './notification.service';


//modules
import { FormsModule }   from '@angular/forms';
import { BrowserModule  } from '@angular/platform-browser';
import { ConfigurationModule  } from '../config/configuration.module';

@NgModule({
    declarations: [BePatientComponent, EmailValidator],
    exports: [BePatientComponent, EmailValidator],
    imports:      [BrowserModule, FormsModule, ConfigurationModule],
    bootstrap:    [],
    providers: [BackendHelper, LoggerService, NotificationService]
})
export class UtilityModule {}
