from rabbit_mq import RabbitMq
from config import config_env

def handler(payload, ack):
    payload["python"] = "paso por python"
    RabbitMq.send_message(exchange="", queue="ts-queue", payload=payload)
    ack()
    pass

if __name__ == '__main__':
    RabbitMq.connect(url=config_env["rabbitmq"])
    print("Python consumer is ready...")
    RabbitMq.clasic_consume(env_mq={
        "fn": handler,
        "prefetch": 1,
        "queue": "py-queue"
    })
    