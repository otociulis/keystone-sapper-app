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
export declare class SapperApp {
    _options: Options;
    constructor(options: Options);
    prepareMiddleware(args: PrepareMiddlewareArguments): Promise<any>;
    build(args: BuildArguments): Promise<void>;
}
export {};
