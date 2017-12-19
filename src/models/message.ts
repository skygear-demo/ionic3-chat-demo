export class Message {

  id: string;
  userName: string;
  time: Date;
  userAvatar: string;
  message: string;
  status: string = 'pending';
  sender: string;
  skygearRecord;

  constructor(args) {
    if (args) {
      this.id = args.id;
      this.userName = args.userName;
      this.time = args.time;
      this.userAvatar = args.userAvatar;
      this.message = args.message;
      this.status = args.status;
      this.skygearRecord = args.skygearRecord;
      this.sender = args.sender;
    }
  }

  timeText() {
    const year = this.time.getFullYear()
         ,month = this.time.getMonth() + 1
         ,day = this.time.getDate()
         ,formattedDate = [
            year
           ,month < 10 ? '0' + month : month
           ,day < 10 ? '0' + day : day
          ].join('-');
    return formattedDate;
  }

  // Template

/*
  new Message({
  id: 'xxxx',
  userName: 'xxxx',
  time: new Date(),
  timeText: '',
  userAvatar: '',
  message: 'Hi',
  status:  'pending',
  skygearRecord = null
  });
*/

}