const { readLines, parseInt } = require("../lib");
const without = require("lodash/without");

const parse = l => l.split("/").map(parseInt);

const nodes = readLines("./input1")
  .map(parse)
  .map(([a, b]) => ({ a, b }));

const expandBridge = ({ nodes, weight, tip }, node) => ({
  nodes: nodes.concat(node),
  weight: weight + node.a + node.b,
  tip: node.a === tip ? node.b : node.a
});

const matchesTip = tip => node => node.a === tip || node.b === tip;

const emptyBridge = { nodes: [], weight: 0, tip: 0 };

const possibleBridges = (res, pairs) => {
  if (!pairs.length) return res;

  const newPairs = [];
  pairs.forEach(({ bridge, remainingNodes }) => {
    const matchingNodes = remainingNodes.filter(matchesTip(bridge.tip));
    if (!matchingNodes.length) {
      res.push(bridge);
    }
    matchingNodes.forEach(node => {
      newPairs.push({
        bridge: expandBridge(bridge, node),
        remainingNodes: without(remainingNodes, node)
      });
    });
  });

  return possibleBridges(res, newPairs);
};

console.log(
  Math.max(
    ...possibleBridges(
      [],
      [{ bridge: emptyBridge, remainingNodes: nodes }]
    ).map(({ weight }) => weight)
  )
);
