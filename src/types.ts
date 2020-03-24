import { Match } from 'path-match';

export type Params = {
  [key: string]: string
};

export type Callback<TReturn, TParams extends Params = Params> = (params: TParams) => TReturn;

export type Route = [
  string, // path
  Callback<any, any>, // callback
  string?, // kind
];

export type CompiledRoute = [
  string, // path
  Match, // path-to-regex match
  Callback<any, any>, // callback
  string?, // kind
];
