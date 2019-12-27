import { resolve } from "path";
import * as ora from "ora";

interface SapperBuildOptions {
  cwd: string;
  src?: string;
  routes?: string;
  output?: string;
  static?: string;
  dest?: string;
}

interface Options {
  skipDevelopmentBuild: boolean;
  path?: string;
  buildOptions: SapperBuildOptions;
}

interface PrepareMiddlewareArguments {
  dev: boolean;
  distDir?: string;
}

interface BuildArguments {
  distDir: string;
}

export class SapperApp {
  _options: Options = {
    skipDevelopmentBuild: false,
    path: "__sapper__/dev",
    buildOptions: {
      cwd: "."
    }
  };

  constructor(options: Options) {
    const { buildOptions } = options || {};
    this._options = {      
      ...this._options,
      ...(options || {}),
      buildOptions: {
        ...this._options.buildOptions,
        ...buildOptions
      }
    };
  }

  async prepareMiddleware(args: PrepareMiddlewareArguments) {
    const { dev, distDir } = args;

    const dir = dev ? this._options.path : distDir;
    if (dev) {
      if (!this._options.skipDevelopmentBuild) {
        const spinner = ora().start("Building Sapper application");

        try {
          await this.build({ distDir: dir });
          spinner.succeed();
        } catch (err) {
          spinner.fail(err);
        }
      }
    }

    const serverPath = resolve(dir, "server/server.js");
    return require(serverPath)();
  }

  build(args: BuildArguments): Promise<void> {
    const { distDir } = args;

    const options: SapperBuildOptions = {
      dest: distDir,
      ...this._options.buildOptions
    };

    return require("sapper/api").build(options);
  }
}
