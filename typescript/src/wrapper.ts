import amqp, { Connection, Channel } from "amqplib/callback_api";
export class RabbitMQ {
  private _connection?: Connection;
  private _channel?: Channel;
  get channel() {
    if (!this._channel) {
      throw new Error("Cannot access Rabbit MQ client before connecting");
    }
    return this._channel;
  }
  async connect(url: string) {
    console.log(url)
    return new Promise((resolve, reject) => {
      amqp.connect(url, (err, connection: Connection) => {
        if (err) reject(err);
        this._connection = connection;
        this._connection.createChannel((err2, channel: Channel) => {
          if (err2) reject(err2);
          this._channel = channel;
          resolve("");
        });
      });
    });
  }
}
export const rabbitmqWrapper = new RabbitMQ();
