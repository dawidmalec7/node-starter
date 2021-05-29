import {
  createContainer,
  InjectionMode,
  asValue,
  Lifetime,
  asClass,
} from "awilix";

const container = createContainer({
  injectionMode: InjectionMode.PROXY,
});

const formatModulesName = (name: string, descriptor: any) => {
  const splat = descriptor.path.split("/");
  const namespace = splat[splat.length - 2];
  const upperNamespace =
    namespace.charAt(0).toUpperCase() + namespace.substring(1);
  return name + upperNamespace;
};

container.loadModules(
  [
    [`${__dirname}/controller/*.ts`, Lifetime.SCOPED],
    [`${__dirname}/service/*.ts`, Lifetime.SCOPED],
    [`${__dirname}/repository/*.ts`, Lifetime.SINGLETON],
  ],
  {
    formatName: formatModulesName,
  }
);

container.loadModules([`${__dirname}/model/*.ts`], {
  formatName: "camelCase",
  resolverOptions: {
    lifetime: Lifetime.SINGLETON,
    register: asValue,
  },
});

const setupDIMiddleware = function (req: any, res: any, next: any) {
  req.container = container.createScope();

  req.container.register({
    session: asValue(req.session),
    request: asValue(req),
    response: asValue(res),
  });

  next();
};

export { setupDIMiddleware, container };
