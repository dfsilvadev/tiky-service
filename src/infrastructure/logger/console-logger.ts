/* eslint-disable no-console */
import type { ILogger } from "./logger.interface";

/**
 * Console Logger Implementation
 * Implements ILogger using console methods
 */
export class ConsoleLogger implements ILogger {
  success(message: string, ...args: unknown[]): void {
    console.log(`[SUCCESS] ${message}`, ...args);
  }

  error(message: string, ...args: unknown[]): void {
    console.error(`[ERROR] ${message}`, ...args);
  }

  warning(message: string, ...args: unknown[]): void {
    console.warn(`[WARNING] ${message}`, ...args);
  }

  info(message: string, ...args: unknown[]): void {
    console.info(`[INFO] ${message}`, ...args);
  }

  debug(message: string, ...args: unknown[]): void {
    // Usa console.log em vez de console.debug para garantir visibilidade
    console.log(`[DEBUG] ${message}`, ...args);
  }
}
