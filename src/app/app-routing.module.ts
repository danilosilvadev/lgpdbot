import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./pages/login/login.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import {
  redirectLoggedInTo,
  redirectUnauthorizedTo,
  AngularFireAuthGuard
} from "@angular/fire/auth-guard";
import { DomainsComponent } from "./pages/domains/domains.component";
import { CookiesComponent } from "./pages/cookies/cookies.component";
import { DefaultPageLayoutComponent } from './components/layout/default-page-layout/default-page-layout.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(["/login"]);

const redirectLoggedInToDashboard = () => redirectLoggedInTo([`/dashboard`]);

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToDashboard }
  },
  {
    path: '',
    component: DefaultPageLayoutComponent,
    children: [
      {
        path: "dashboard",
        component: DashboardComponent,
        canActivate: [AngularFireAuthGuard],
        data: { authGuardPipe: redirectUnauthorizedToLogin }
      },
      {
        path: "domains",
        component: DomainsComponent,
        canActivate: [AngularFireAuthGuard],
        data: { authGuardPipe: redirectUnauthorizedToLogin }
      },
      {
        path: "cookies",
        component: CookiesComponent,
        canActivate: [AngularFireAuthGuard],
        data: { authGuardPipe: redirectUnauthorizedToLogin }
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
