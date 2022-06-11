// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  public getServiceConfigs() {
    return {
      authService: {
        name: 'AUTH_SERVICE',
        options: {
          host: this.env['AUTH_SERVCE_HOSTNAME'] || '0.0.0.0',
          port: parseInt(this.env['AUTH_SERVCE_PORT'] || '', 10) || 3001,
        },
      },
      chargerService: {
        name: 'CHARGER_SERVICE',
        options: {
          host: this.env['CHARGER_SERVCE_HOSTNAME'] || '0.0.0.0',
          port: parseInt(this.env['CHARGER_SERVCE_PORT'] || '', 10) || 3002,
        },
      },
      transactionService: {
        name: 'TRANSACTION_SERVICE',
        options: {
          host: this.env['TRANSACTION_SERVCE_HOSTNAME'] || '0.0.0.0',
          port: parseInt(this.env['TRANSACTION_SERVCE_PORT'] || '', 10) || 3003,
        },
      },
      emailService: {
        name: 'EMAIL_SERVICE',
        options: {
          host: this.env['EMAIL_SERVCE_HOSTNAME'] || '0.0.0.0',
          port: parseInt(this.env['EMAIL_SERVCE_PORT'] || '', 10) || 3004,
        },
      },
    };
  }
}

const configService = new ConfigService(process.env);

export { configService };
