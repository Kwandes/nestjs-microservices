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
      emailService: {
        name: 'EMAIL_SERVICE',
        options: {
          host: this.env['EMAIL_SERVCE_HOSTNAME'] || '0.0.0.0',
          port: parseInt(this.env['EMAIL_SERVCE_PORT'] || '', 10) || 3003,
        },
      },
    };
  }
}

const configService = new ConfigService(process.env);

export { configService };
