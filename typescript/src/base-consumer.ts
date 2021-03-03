import { Channel, Message } from "amqplib/callback_api";
export abstract class Consumer {
  abstract queue: string;
  private channel: Channel;
  abstract onMessage(payload: any, ack: () => void): void;
  constructor(channel: Channel) {
    this.channel = channel;
  }
  channelOptions() {
    this.channel.prefetch(1);
    this.channel.assertQueue(this.queue, { durable: true, arguments: { 'x-queue-type': 'classic' } });
  }
  listen() {
    this.channelOptions();
    this.channel.consume(this.queue, (msg) => {
      const parseData = this.parseMessage(msg!);
      this.onMessage(parseData, () => this.ack(msg!));
    });
  }
  ack(msg: Message): void {
    return this.channel.ack(msg);
  }
  parseMessage(msg: Message) {
    const payload = JSON.parse(msg.content.toString());
    return payload;
  }
}
