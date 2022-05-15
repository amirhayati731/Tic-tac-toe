// @ts-nocheck

import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MessageService]
})
export class AppComponent {
  title = 'xo';
  player: string = 'X';
  game = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  selectedBox = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  isStarted: boolean = false;
  constructor(
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig
  ) {
    this.primengConfig.ripple = true;
  }

  start() {
    document.getElementById('start')?.classList.remove('disableClick');
    this.isStarted = true;
    this.messageService.add({ severity: 'success', summary: '', detail: 'Game On' });
  }

  reset() {
    for (let index = 0; index < this.game.length; index++) {
      document.getElementById('p' + index).value = "";
    }
    this.isStarted = false;
    document.getElementById('start')?.classList.add('disableClick');
    this.selectedBox = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    this.messageService.add({ severity: 'success', summary: '', detail: ' Click Start to get started' });
  }

  move(event: any) {
    if (event.target.value == "") {
      let id = event.target.id;
      let last = id.charAt(id.length - 1);
      this.selectedBox[last] = this.player;
      event.target.value = this.player;
      this.checkWinner();
      if (this.player == 'X') {
        this.player = 'Y'
      }
      else {
        this.player = 'X'
      }
    }
    else {
      return
    }
  }

  checkWinner() {
    for (let index = 0; index < this.winningConditions.length; index++) {
      let a =  this.selectedBox[this.winningConditions[index][0]];
      let b =  this.selectedBox[this.winningConditions[index][1]];
      let c =  this.selectedBox[this.winningConditions[index][2]];
    if (a === b && b === c) {
    this.messageService.add({ severity: 'success', summary: '', detail: 'player '+ a +'wins'});
    setTimeout(() => {
    this.reset();
    }, 2000);
    } 
    }
  }


}
