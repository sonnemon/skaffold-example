import { Channel } from "amqplib/callback_api";
export abstract class Publisher {
  private client: Channel;
  constructor(client: Channel) {
    this.client = client;
  }

  async publish(exchage: string, key: string, data: any): Promise<boolean> {
    const isSended = await this.client.publish(
      exchage,
      key,
      Buffer.from(JSON.stringify(data))
    );
    return isSended;
  }
}
