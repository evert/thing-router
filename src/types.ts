import { Match } from 'path-match';

export type Params = {
  [key: string]: string
};

export type Callback<TParams = Params, TReturn = any> = (params: TParams) => TReturn;

export type Route = [
  string, // path
  Callback, // callback
  string?, // kind
];

export type CompiledRoute = [
  string, // path
  Match, // path-to-regex match
  Callback, // callback
  string?, // kind
];
