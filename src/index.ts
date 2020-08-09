import { GraphQLResolveInfo } from 'graphql';
import graphqFields from 'graphql-fields';

const fieldsToRelations = (
  info: GraphQLResolveInfo,
  options: { depth?: number; root?: string } = { depth: undefined, root: '' },
): string[] => {
  const paths: string[][] = [];

  const nested = (field: any, key: string = undefined as any, deep = 0, parent: string[] = []) => {
    if (Object.values(field).length === 0) {
      return;
    }

    if (deep > 0 || !!options.root) {
      parent.push(key);
      if (
        parent.slice(!options.root ? 0 : options.root?.split('.').length).length > 0 &&
        parent.slice(0, !options.root ? 0 : options.root?.split('.').length).toString() ===
          (!options.root ? '' : options.root?.split('.').toString())
      ) {
        const path = parent.slice(!options.root ? 0 : options.root?.split('.').length);
        paths.push(path);
      }
    }

    Object.keys(field).forEach((key: any) => {
      if (Object.values(field[key]).length > 0 && !!options.depth ? deep < options.depth : true) {
        nested(field[key], key, deep + 1, [...parent]);
      }
    });
  };

  const value = !options.root
    ? graphqFields(info)
    : options.root.split('.').reduce(function (p, prop) {
        return p[prop];
      }, graphqFields(info));

  nested(value, !!options.root ? options.root.split('.').pop() : undefined);

  return paths.map((list: string[]) => list.join('.'));
};

// why not export default?
// https://markus.oberlehner.net/blog/building-npm-packages-with-typescript/
export = fieldsToRelations;
