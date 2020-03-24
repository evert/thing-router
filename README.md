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

### Structuring code

If you're setting up many routes, it might be beneficial to define the
callback function in another file, simply pass in the imported function.

```typescript
thingRouter.add('/article/:id', articleFinder);
thingRouter.add('/author/:id', authorFinder);
thingRouter.add('/category/:id', categoryFinder);
```

This will make long lists more readable. It's also possible to pass all
the routes via the constructor. This has the same effect:

```typescript
const thingRouter = new ThingRouter([
  ['/article/:id',  articleFinder],
  ['/author/:id',   authorFinder],
  ['/category/:id', categoryFinder],
]);
```

### Ensuring that the you're getting the right kind of thing.

Suppose you expect to receive an 'author' from the router, but the user
specified a url to an 'article', you can let the router check this.

To do this, you must specifiy a 'kind' argument when setting up the route.
This is the optional 3rd argument to 'add()':

```typescript
thingRouter.add(
  '/author/:name', //path
  authorFinder, // callback
  'author', // kind
);
```

Now we're trying to fetch an author, but the path leads to a category
instead:

```typescript
const author = thingRouter('/category/5', 'author');
```

The above will thow a `WrongKindError`.

If you are using json-schema a suggested value for the `kind` parameter could
be the `$id` attribute.
