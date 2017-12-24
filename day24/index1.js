const { readLines, parseInt } = require("../lib");
const without = require("lodash/without");
const find = require("lodash/find");

const parse = l => l.split("/").map(parseInt);

const nodes = readLines("./input")
  .map(parse)
  .map(([a, b]) => ({ a, b }));

const expandBridge = ({ nodes, weight, tip }, node) => ({
  nodes: nodes.concat(node),
  weight: weight + node.a + node.b,
  tip: node.a === tip ? node.b : node.a
});

const matchesTip = tip => node => node.a === tip || node.b === tip;

const emptyBridge = { nodes: [], weight: 0, tip: 0 };

const possibleBridges = (bridge, remainingNodes) => {
  const matchingNodes = remainingNodes.filter(matchesTip(bridge.tip));
  if (!matchingNodes.length) return [bridge];

  const res = [];
  matchingNodes.forEach(node => {
    res.push(
      ...possibleBridges(
        expandBridge(bridge, node),
        without(remainingNodes, node)
      )
    );
  });

  return res;
};

console.log(
  Math.max(...possibleBridges(emptyBridge, nodes).map(({ weight }) => weight))
);
