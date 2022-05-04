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

In the case a field isn't actually a relation in your database you would like to exclude those fields. To exclude the fields pass an array to the options argument

```
const relations = fieldsToRelations(info, {
  excludeFields: ['user.data']
})
```

When the field has arguments it is likely the child resolver handles the relation. In that case you would like to exclude all fields that have arguments

```
const relations = fieldsToRelations(info, {
  excludeFieldsWithArguments: true
})
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
