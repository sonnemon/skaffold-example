import pika
import json

class RabbitMq():
    connection = None
    channel = None
    callback = None

    @classmethod
    def connect(cls, url):
        cls.connection = pika.BlockingConnection(
            pika.URLParameters(url)
        )
        cls.channel = cls.connection.channel()

    @classmethod
    def clasic_consume(cls, env_mq):
        cls.callback = env_mq["fn"]
        cls.channel.queue_declare(queue=env_mq["queue"], durable=True, arguments={'x-queue-type': 'classic'})
        cls.channel.basic_qos(prefetch_count=env_mq["prefetch"])
        cls.channel.basic_consume(queue=env_mq["queue"], on_message_callback=cls.consume)
        cls.channel.start_consuming()

    @classmethod
    def consume(cls, ch, method, properties, body):
        cls.callback(json.loads(body.decode()), lambda: cls.ack(method.delivery_tag))
    
    @classmethod
    def send_message(cls, exchange, queue, payload):
        cls.channel.basic_publish(exchange=exchange, routing_key=queue, body=json.dumps(payload))

    @classmethod
    def ack(cls, tag):
        cls.channel.basic_ack(delivery_tag=tag)