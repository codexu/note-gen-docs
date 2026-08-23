import type { Node, Root } from 'fumadocs-core/page-tree';

export const isSelfHostedEnabled = process.env.NODE_ENV === 'development';

export function isSelfHostedDocsPath(slugs?: string[]) {
  return slugs?.[0] === 'self-hosted';
}

export function isSelfHostedDocsUrl(url: string) {
  return url.endsWith('/docs/self-hosted');
}

function filterSelfHostedNode(node: Node): Node | undefined {
  if (node.type === 'page') {
    return isSelfHostedDocsUrl(node.url) ? undefined : node;
  }

  if (node.type === 'folder') {
    return {
      ...node,
      children: node.children
        .map(filterSelfHostedNode)
        .filter((child): child is Node => child !== undefined),
    };
  }

  return node;
}

export function getVisibleDocsTree(tree: Root): Root {
  if (isSelfHostedEnabled) return tree;

  return {
    ...tree,
    children: tree.children
      .map(filterSelfHostedNode)
      .filter((child): child is Node => child !== undefined),
  };
}
