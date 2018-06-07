import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DemoserveService {

  constructor() { }

  helloPrint(){
    console.log("Hello world");
  }
  
}
