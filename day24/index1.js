const { readLines, parseInt } = require("../lib");
const without = require("lodash/without");

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

let maxWeight = 0;
let pairs = [{ bridge: emptyBridge, remainingNodes: nodes }];

while (pairs.length) {
  const newPairs = [];
  pairs.forEach(({ bridge, remainingNodes }) => {
    const matchingNodes = remainingNodes.filter(matchesTip(bridge.tip));
    if (!matchingNodes.length) {
      maxWeight = Math.max(maxWeight, bridge.weight);
    }
    matchingNodes.forEach(node => {
      newPairs.push({
        bridge: expandBridge(bridge, node),
        remainingNodes: without(remainingNodes, node)
      });
    });
  });

  pairs = newPairs;
}

console.log(Math.max(maxWeight));
