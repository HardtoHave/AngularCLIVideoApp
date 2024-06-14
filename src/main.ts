import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { routes} from "./app/app.routes";
import { AppModule } from './app/app.module';
import { platformBrowser} from "@angular/platform-browser";
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch((err) => console.error(err));
