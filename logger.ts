import winston from "winston";

const baseLogger = winston.createLogger({
  format: winston.format.json(),
  defaultMeta: { project: 'Content-Management-System-CMS-', time: new Date() },
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'info' }), // Changed 'error' to 'info'
    new winston.transports.File({ filename: 'logs/all.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  baseLogger.add(
    new winston.transports.Console({ format: winston.format.simple() })
  );
}

export default baseLogger;
