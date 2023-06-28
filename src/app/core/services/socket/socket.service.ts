import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { MessageEssentials } from '../../interfaces/message-essentials';
import { ThreadMsg } from '../../interfaces/thread-msg';
import { Subject } from 'rxjs';
const SOCKET_URL = environment.websocket_endpoint;

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: WebSocket | undefined;
  private messagesSubject = new Subject<ThreadMsg>();
  public messages$ = this.messagesSubject.asObservable();

  public connect(thread_id: string, UserId: string | undefined): void {
    this.socket = new WebSocket(`${SOCKET_URL}/${thread_id}/${UserId}`);

    this.socket.onopen = event => {
      console.log('WebSocket is connected.');
    };

    this.socket.onmessage = event => {
      const newMessage: ThreadMsg = JSON.parse(event.data);
      this.messagesSubject.next(newMessage);
    };

    this.socket.onerror = error => {
      console.log(`WebSocket error: ${error}`);
    };
  }

  public send(message: MessageEssentials): void {
    if (this.socket?.readyState === this.socket?.OPEN) {
      this.socket?.send(JSON.stringify(message));
    } else {
      console.log('WebSocket is not open. Unable to send message.');
    }
  }

  public disconnect(): void {
    if (this.socket) {
      this.socket.close();
    }
  }
}
