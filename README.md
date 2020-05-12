# Extension examples

## The simplest extension

Commit with the implementation is [here](https://github.com/mateuszwozniak/falcon-platform-extension-examples/pull/1/files)

How to test:

1. run `yarn start` in the `server` folder (client doesn't need to be started)

2. open your browser at http://localhost:4000/graphql

3. execute the following query to see the result:

```graphql
{
  product(id: "24-MB01") {
    id
    additionalContent
  }
}
```
