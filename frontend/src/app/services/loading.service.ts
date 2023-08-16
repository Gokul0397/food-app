import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private isLoadingSubject = new BehaviorSubject<boolean>(false); //export methods for behaviour that you want to be done inside your class
  constructor() { }

  showLoading(){
    this.isLoadingSubject.next(true);
  }
  hideLoading(){
    this.isLoadingSubject.next(false);
  }

  // getter for the loading  is used by returning the type abservable that nobody can change the value from outside it just the readonly method
  get isLoading(){
    return this.isLoadingSubject.asObservable()
  }
}
