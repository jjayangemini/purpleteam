const convict = require('convict');
const path = require('path');

const schema = {
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'test'],
    default: 'production',
    env: 'NODE_ENV'
  },
  loggers: {
    def: {
      level: {
        doc: 'Default logger to write all log events with this level and below. Syslog levels used: https://github.com/winstonjs/winston#logging-levels',
        format: ['emerg', 'alert', 'crit', 'error', 'warning', 'notice', 'info', 'debug'],
        default: 'notice'
      },
      transports: {
        doc: 'Transports to send generic logging events to.',
        format: Array,
        default: ['SignaleTransport']
      }
    },
    testerProgress: {
      transports: {
        doc: 'Transports to send testerProgress events to.',
        format: Array,
        default: ['File']
      },
      dirname: {
        doc: 'Location of testerProgress logs',
        format: String,
        default: `${process.cwd()}/logs/`
      }
    }
  },
  purpleteamApi: {
    protocol: {
      doc: 'The protocol of the purpleteam SaaS.',
      format: ['https', 'http'],
      default: 'https'
    },
    ip: {
      doc: 'The IP address of the purpleteam SaaS.',
      format: 'ipaddress',
      default: '240.0.0.0'
    },
    port: {
      doc: 'The port of the purpleteam SaaS.',
      format: 'port',
      default: 2000,
      env: 'PORT'
    },
    url: {
      doc: 'The URL of the purpleteam API',
      formate: 'url',
      default: 'not yet set'
    }
  },
  results: {
    uri: {
      doc: 'The location of the results.',
      format: String,
      default: `${process.cwd()}/outcomes/results.txt`
    }
  },
  buildUserConfig: {
    fileUri: {
      doc: 'The location of the build user config file',
      format: String,
      default: '/testing/buildUserConfigFile'
    }
  },
  modulePaths: {
    blessed: {
      doc: 'The path to blessed module.',
      format: String,
      default: 'blessed'
    }
  }
};

const config = convict(schema);
config.loadFile(path.join(__dirname, `config.${process.env.NODE_ENV}.json`));
config.validate();

config.set('purpleteamApi.url', `${config.get('purpleteamApi.protocol')}://${config.get('purpleteamApi.ip')}:${config.get('purpleteamApi.port')}`);

module.exports = config;
