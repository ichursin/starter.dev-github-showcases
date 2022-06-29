import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { of } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import {
  loadUserToken,
  loadUserTokenSuccess,
  signOut,
  startSignIn,
} from './auth.actions';

import { AuthEffects } from './auth.effects';

describe('AuthEffects', () => {
  let actions$: Actions;
  let effects: AuthEffects;
  let mockHttpClient;
  let authService: any;

  beforeEach(() => {
    authService = jasmine.createSpyObj('UserService', {
      signIn: () => {
        return of();
      },
      signOut: () => {
        return of();
      },
      saveUserToken: () => {
        return of();
      },
    });
    mockHttpClient = jasmine.createSpyObj('http', ['get', 'put']);
    TestBed.configureTestingModule({
      // the name ('http') goes as the first argument and an array of public methods you want to spyOn
      imports: [RouterTestingModule],
      providers: [
        AuthEffects,
        provideMockActions(() => actions$),
        { provide: HttpClient, useValue: mockHttpClient },
        {
          provide: AuthService,
          useValue: authService,
        },
      ],
    });

    actions$ = TestBed.inject(Actions);
    effects = TestBed.inject(AuthEffects);
    authService = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should initiate the signIn process for the user', () => {
    actions$ = of(startSignIn());
    effects.signIn$.subscribe();
    expect(authService.signIn).toHaveBeenCalled();
  });

  it('should call the signOut method to initiate the signout process', () => {
    actions$ = of(signOut());
    effects.signOut$.subscribe();
    expect(authService.signOut).toHaveBeenCalled();
  });

  it('should save the access_Token for the user', (done) => {
    actions$ = of(loadUserToken());

    authService.saveUserToken.and.returnValue(of('access_token_valid'));

    effects.saveUserToken$.subscribe((action) => {
      expect(action).toEqual(loadUserTokenSuccess({ isAuthenticated: true }));
      done();
    });
  });
});