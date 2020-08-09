# graphql-fields-to-relations

FieldsToRelations is a graphql helper that gets your relation string from graphql's input fields.
This package was created for the [MikroOrm Graphql Example](https://github.com/driescroons/mikro-orm-graphql-example).

[![NPM link](https://img.shields.io/npm/v/graphql-fields-to-relations)](https://www.npmjs.com/package/graphql-fields-to-relations)

## 🔧 Usage

Install the package with yarn:

```
yarn add graphql-fields-to-relations
```

or with npm:

```
npm install graphql-fields-to-relations
```

And use it like so:

```
const fieldsToRelations = require('fieldsToRelations');

// in your resolver
const relations = fieldsToRelations(info);
```

## 🔍 Example

As an example, take following query:

```
query {
  getBoards {
    id name memberships {
      id user {
        email
      }
    }
    lists {
      items {
        id name list {
          id name
          board {
            id name
            memberships {
              id user {
                id email
              }
            }
          }
        }
      }
    }
  }
}
```

The helper will return the following relation string:

```
[
  "memberships",
  "memberships.user",
  "lists",
  "lists.items",
  "lists.items.list",
  "lists.items.list.board",
  "lists.items.list.board.memberships",
  "lists.items.list.board.memberships.user"
]
```
