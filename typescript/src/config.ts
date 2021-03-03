export const config = {
  rabbit: `amqp://${process.env.RABBIT_USER}:${process.env.RABBIT_PWD}@${process.env.RABBIT_HOST}:${process.env.RABBIT_PORT}`,
};
