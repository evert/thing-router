ThingRouter
===========

A small router package, written in typesript. The goal of this router
is to simply call a function if a path such as `/author/:author/article/:id`
matches.

The primary reason this was made, is to create a simple system for finding
an 'entity' or 'model' based on its url.

This package does not aim to replace routers commonly found in server-side
frameworks, but such a router could be built with this library.

This package uses the following two dependencies matching express-style
url patterns:

* [path-to-regexp](https://www.npmjs.com/package/path-to-regexp)
* [path-match](https://www.npmjs.com/package/path-match)

Installation
------------

    npm i thing-router

Usage
-----

Setting up a route:

```typescript
import ThingRouter from 'thing-router';

const thingRouter = new ThingRouter();

type ArticleParams = {
  id: string
}
type Article = {
  id: number,
  title: string
};

thingRouter.add(
  '/article/:id',
  (params: ArticleParams): Article => {

    return {
      id: parseInt(params.id, 10),
      title: 'Article id: '  + params.id,
    };
  }
);
```

The above example registers a new route `/article/:id`. This callback should
find an article associated with this url.

It's recommended to specify the types of both the parameters you're expecting,
and the type that's being returned for a matched path.

### Matching the route

```typescript
const article = thingRouter('/article/5');
```

If the path could not be matched in the router, or if the callback returned
`null`, a `NotFoundError` will be thrown.

### Ensuring that the you're getting the right kind of thing.

Suppose you expect to receive an 'author' from the router, but the user
specified a url to an 'article', you can let the router check this.

To do this, you must specifiy a 'kind' argument when setting up the route.
This is the optional 3rd argument to 'add()':

```typescript
thingRouter.add(
  '/author/:name',
  (params: AuthorParams): Author => {

    return {
      name: params.name,
      favouriteColor: 'yellow',
    };
  },
  'author' // this is the 'kind'
);
```

Now we're trying to fetch an author, but the path leads to a category
instead:

```typescript
const author = thingRouter('/article/5', 'author');
```

The above will thow a `WrongKindError`.
