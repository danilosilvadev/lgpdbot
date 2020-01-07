import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { StoreModule } from "@ngrx/store";
import { rootReducer } from "./ngrx/root.reducer";
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuth, AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { AuthService } from "./services";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { environment } from "src/environments/environment";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { LoginComponent } from "./pages/login/login.component";
import { LoginFormComponent } from "./components/forms/login-form/login-form.component";
import { CreateAcountFormComponent } from "./components/forms/create-acount-form/create-acount-form.component";
import { AngularFireAuthGuard } from "@angular/fire/auth-guard";
import { AsyncDepthPipe } from "./utils/pipes/async-depth.pipe";
import { DepthPipe } from "./utils/pipes/depth.pipe";
import { DomainsComponent } from "./pages/domains/domains.component";
import { CookiesComponent } from "./pages/cookies/cookies.component";
import { CreateCookieComponent } from "./components/forms/create-cookie/create-cookie.component";
import { CreateGroupComponent } from './components/forms/create-group/create-group.component';
import { DomainFormComponent } from './components/forms/domain-form/domain-form.component';
import { TimeStampToDatePipe } from './utils/pipes/time-stamp-to-date.pipe';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    LoginFormComponent,
    CreateAcountFormComponent,
    AsyncDepthPipe,
    DepthPipe,
    DomainsComponent,
    CookiesComponent,
    CreateCookieComponent,
    CreateGroupComponent,
    DomainFormComponent,
    TimeStampToDatePipe,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot(rootReducer),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production // Restrict extension to log-only mode
    }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule
  ],
  providers: [
    AngularFireModule,
    AngularFireAuth,
    AngularFireAuthGuard,
    AuthService,
    AngularFirestore
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
