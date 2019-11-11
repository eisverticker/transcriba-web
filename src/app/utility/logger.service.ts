import { LFService, LoggerFactoryOptions, LogGroupRule, LogLevel } from 'typescript-logging';

export class LoggerService {
  private static logLevel = LogLevel.Debug;
  private static loggerFactory = LoggerService.createLoggerFactory();

  static getCustomLogger(category: string) {
    return LoggerService.loggerFactory.getLogger(category);
  }

  private static createLoggerFactory() {
    return LFService.createLoggerFactory(
      new LoggerFactoryOptions().addLogGroupRule(
        new LogGroupRule(/.+/, LoggerService.logLevel)
      )
    );
  }

}
