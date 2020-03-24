import { Params, Callback, Route, CompiledRoute } from './types';
import { default as pathMatch, Match } from 'path-match';

const matcher = pathMatch({
  sensitive: false,
  strict: false,
  end: false
});

class WrongKindError extends Error {}
class NotFoundError extends Error {}

export default class ThingRouter {

  routes: CompiledRoute[];

  constructor(routes: Route[] = []) {

    this.routes = []
    for(const route of routes) {
      this.add(...route);
    }
  }

  add(path: string, cb: Callback<any, any>, kind?: string) {

    this.routes.push([path, matcher(path), cb, kind]);

  }

  find<T = any>(path: string, checkKind?: string): T {

    for(const route of this.routes) {

      const result = route[1](path);
      if (result !== false) {
        if (checkKind && checkKind !== route[3]) {
          throw new WrongKindError(`Resource at ${path} is an item with type ${route[3]}, but a ${checkKind} was expected`);
        }
        const thing = route[2](result);
        if (thing===null) {
          throw new NotFoundError('No resource exists at ${path}');
        }
        return thing;

      }

    }
    throw new NotFoundError('No resource exists at ${path}');

  }

}
