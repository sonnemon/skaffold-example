from os import getenv

config_env =  {
    "rabbitmq": "amqp://{}:{}@{}:{}".format(getenv("RABBIT_USER"),getenv("RABBIT_PWD"),getenv("RABBIT_HOST"),getenv("RABBIT_PORT")),
}