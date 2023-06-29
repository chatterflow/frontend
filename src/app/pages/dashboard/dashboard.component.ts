import { Component, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UsersService } from 'src/app/core/services/users/users.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UserInterface } from 'src/app/core/interfaces/user-interface';
import { ThreadMsg } from 'src/app/core/interfaces/thread-msg';
import { SocketService } from 'src/app/core/services/socket/socket.service';
import { MessageEssentials } from 'src/app/core/interfaces/message-essentials';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  @ViewChild('yourElement', { static: false })
  private yourElement!: ElementRef;
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
  scrollToBottom(): void {
    try {
      this.yourElement.nativeElement.scrollTop = this.yourElement.nativeElement.scrollHeight;
    } catch (err) {
      console.log('Error in scrollToBottom:', err);
    }
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
      setTimeout(() => this.scrollToBottom(), 0);
    });

  }

  loadThread(thread: any): void {
    this.username = thread.nome_completo;
    this.threadId = thread.thread_id;
    this.receiverId = thread.other_participant_id;
    this.SocketService.disconnect();
    this.username = thread.nome_completo;
    this.SocketService.connect(thread.thread_id, this.Userid);
    this.isThreadLoaded = true;
    this.UserService.getMsgThread(thread.thread_id).subscribe({
      next: (messages: ThreadMsg[]) => {
        this.threadMessages = messages;
        this.scrollToBottom();
      },
      error: (err: any) => console.error(err),
      complete: () => { setTimeout(() => this.scrollToBottom(), 0) },
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
    if (!messageContent) {
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
