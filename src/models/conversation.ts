export class Conversation {

    id: string;
    title;
    unreadCount: number = 0;
    skygearRecord;
    lastMessage;

    constructor(){}

    setFields(skygearRecord) {
      this.skygearRecord = skygearRecord;
      this.id = skygearRecord._id;
      this.unreadCount = skygearRecord.unreadCount;
      this.lastMessage = skygearRecord.last_message;
      this.unreadCount = skygearRecord.unread_count;
    }

}