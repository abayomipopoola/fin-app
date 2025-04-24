import pino from 'pino';

const logger = pino({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  serializers: {
    err: pino.stdSerializers.err,
  },
});

export default {
  info: (obj: unknown, msg?: string) => {
    logger.info(obj, msg);
  },
  error: (obj: unknown, msg?: string) => {
    if (obj instanceof Error) {
      // Handle Error objects for structured error logging
      logger.error({ err: obj }, msg ?? obj.message);
    } else {
      logger.error(obj, msg);
    }
  },
  warn: (obj: unknown, msg?: string) => {
    logger.warn(obj, msg);
  },
  debug: (obj: unknown, msg?: string) => {
    logger.debug(obj, msg);
  },
};
