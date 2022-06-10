// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  public getServiceConfig(): { host: string; port: number } {
    return {
      host: this.env['AUTH_SERVCE_HOSTNAME'] || '0.0.0.0',
      port: parseInt(this.env['AUTH_SERVCE_PORT'] || '', 10) || 3001,
    };
  }
}

const configService = new ConfigService(process.env);

export { configService };
