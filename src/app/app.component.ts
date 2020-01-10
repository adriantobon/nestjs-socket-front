import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { connect } from 'socket.io-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private fb: FormBuilder) {}

  mainForm: FormGroup;

  messages: string[] = ['Mensaje1', 'Mensaje2'];
  socket;

  ngOnInit() {
    this.mainForm = this.createForm();
    this.socketInit();
  }

  createForm(): FormGroup {
    return this.fb.group({
      messageText: 'prueba'
    });
  }

  sendMessage(message: string) {
    this.socket.emit('msgToServer', message);
  }

  socketInit() {
    this.socket = connect('http://localhost:3000');
    this.socket.on('msgToClient', (msg) => {
      this.messages.push(msg);
    });
  }
}
