import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsersService } from 'src/app/core/services/users/users.service';
import { ThreadInfo } from 'src/app/core/interfaces/thread-info';
import { HttpErrorResponse } from '@angular/common/http';
import { UserInterface } from 'src/app/core/interfaces/user-interface';
import { ThreadMsg } from 'src/app/core/interfaces/thread-msg';
import { SocketService } from 'src/app/core/services/socket/socket.service';
import { MessageInterface } from 'src/app/core/interfaces/message-interface';
import { MessageEssentials } from 'src/app/core/interfaces/message-essentials';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  threadId: string | undefined;
  senderId: string | undefined;
  receiverId: string | undefined;
  isThreadLoaded: boolean = false;
  threadMessages: ThreadMsg[] = [];
  info: any;
  Userid: string | undefined;
  username: string | undefined;
  isHovering: boolean = false;
  searchTerm: string = '';
  messageContent: string | undefined;

  sendMsgForm = this.fb.group({
    message: [null, Validators.required],
  })

  constructor(private UserService: UsersService, private SocketService: SocketService, private fb: FormBuilder) {

  }
  ngOnDestroy(): void {
    this.SocketService.disconnect();
  }
  ngOnInit(): void {
    this.UserService.getUserData().subscribe({
      next: (res: UserInterface) => { this.Userid = res.id; this.UserService.getUsers(res.id).subscribe(data => { this.info = data }); },
      error: (err: HttpErrorResponse) => console.error(err)
    });
    this.SocketService.messages$.subscribe((newMessage) => {
      this.threadMessages.push(newMessage);
    });

  }

  loadThread(thread: any): void {
    // console.log(thread)
    this.username = thread.nome_completo;
    this.threadId = thread.thread_id;
    this.receiverId = thread.other_participant_id;
    // console.log(this.username, this.threadId, this.receiverId)
    this.SocketService.disconnect();
    this.username = thread.nome_completo;
    this.SocketService.connect(thread.thread_id, this.Userid);
    this.isThreadLoaded = true;
    this.UserService.getMsgThread(thread.thread_id).subscribe({
      next: (messages: ThreadMsg[]) => {
        this.threadMessages = messages;
      },
      error: (err: any) => console.error(err)
    });
  }


  onClickSubmit(thread_id: string | undefined, content: FormGroup, sender_id: string | undefined, receiver_id: string | undefined): void {
    const messageContent: string | undefined = content.value.message
    const body: MessageEssentials = {
      content: messageContent as string,
      thread_id: thread_id as string,
      sender_id: sender_id as string,
      receiver_id: receiver_id as string,
    };
    if (!messageContent){
      console.log("error");
    } else {
      this.SocketService.send(body);
      this.sendMsgForm.reset();
    }
  }

  get filteredInfo() {
    if (!this.searchTerm) {
      return this.info;
    }

    return this.info.filter((item: any) => item.nome_completo.toLowerCase().includes(this.searchTerm.toLowerCase()));
  }

}
