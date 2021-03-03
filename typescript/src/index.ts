import { Consumer } from "./base-consumer"
import { Publisher } from "./base-publisher"
import { rabbitmqWrapper } from "./wrapper"
import { config } from "./config"

interface Payload {
  pyText: string;
}

export class TestPublisher extends Publisher { }

export class TestConsumer extends Consumer {
  queue = 'ts-queue';

  async onMessage(payload: any, ack: () => void) {
    payload["typescript"] = "paso por typescript";
    await new TestPublisher(rabbitmqWrapper.channel).publish(
      '',
      'f-queue',
      payload
    );
    ack();
  }
}

(async function () {
  await rabbitmqWrapper.connect(config.rabbit)
  new TestConsumer(rabbitmqWrapper.channel).listen();
  console.log("TypeScrip consumer is ready...")
})();
