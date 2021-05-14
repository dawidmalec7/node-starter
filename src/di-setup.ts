import { createContainer, InjectionMode, asValue, Lifetime } from "awilix";

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
    `${__dirname}/controller/*.ts`,
    `${__dirname}/service/*.ts`,
    `${__dirname}/repository/*.ts`,
  ],
  {
    formatName: formatModulesName,
    resolverOptions: {
      lifetime: Lifetime.SCOPED,
    },
  }
);

container.loadModules([`${__dirname}/model/*.ts`], {
  formatName: "camelCase",
  resolverOptions: {
    lifetime: Lifetime.SCOPED,
    register: asValue,
  },
});

const setupDIMiddleware = function (req: any, res: any, next: any) {
  req.container = container.createScope();

  req.container.register({
    request: asValue(req),
    response: asValue(res),
  });

  next();
};

export { setupDIMiddleware, container };
