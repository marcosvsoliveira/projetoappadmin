import { Injectable } from '@angular/core';
import { HomePage } from './../../pages/home/home';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';

@Injectable()
export class ProvidersProvider {

  public month: any;
  public day: any;
  public yeat: any;
  private PATH = 'users/';
  rootPage: any = HomePage;

  constructor(public auth: AngularFireAuth,
    public db: AngularFireDatabase) { }

//-------------------Criar contas
  createAccount(user:any){
    return new Promise((resolve, reject) =>{
      this.auth.auth.createUserWithEmailAndPassword(user.email, user.password)
      .then((firebaseUser: firebase.User) => {
        this.db.object(this.PATH + firebaseUser.uid)
          .set({ nome: user.nome, nascimento: user.nascimento, email: user.email, telefone: user.telefone});

        this.db.object(this.PATH + firebaseUser.uid)
          .update({ emailVerified:false, email: user.email });

        firebaseUser.updateProfile({displayName: user.nome, photoURL:null});
        firebaseUser.sendEmailVerification();

        this.signOut();
        resolve();
      })
      .catch(e => {
        reject(this.handlerError(e));
      })
    });
  }

  public signOut(){
    this.auth.auth.signOut();
    this.rootPage = HomePage;
  }

  public login(user:any){
    return new Promise((resolva, reject) => {
      this.auth.auth.signInWithEmailAndPassword(user.email, user.password)
      .then ((firebaseUser: firebase.User) =>{
        if (firebaseUser.emailVerified){
          this.db.object(this.PATH + firebaseUser.uid).update({emailVerified: true});
        }
        resolva ({emailVerified: firebaseUser.emailVerified});
      })
      .catch(e => {
        reject(this.handlerError(e));
      })
    });
  }
  
  public forgotEmail(email: string){
    return new Promise((resolva, reject) =>{
      this.auth.auth.sendPasswordResetEmail(email)
      .then( () =>{
        resolva();
      })
      .catch(e => {
        reject(this.handlerError(e));
      });
    })
  }
  
    private handlerError(error: any) {
    let message = '';
    if (error.code == 'auth/email-already-in-use') {
    message = 'O e-mail informado já está sendo usado.';
    } else if (error.code == 'auth/invalid-email') {
    message = 'O e-mail informado é inválido.';
    } else if (error.code == 'auth/weak-password') {
    message = 'A senha informada é muito fraca.';
    } else if (error.code == 'auth/user-not-found') {
    message = 'Usuário não encontrado.';
    } else if (error.code == 'auth/wrong-password') {
    message = 'Usuário/senha inválido(s).';
    } else {
    message = 'Ocorreu algum erro, por favor tente novamente.';
    }

    return message;

    }
}
