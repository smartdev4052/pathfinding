// transform react-flow-renderer elements to a weighted adjacency list
export const getGraph = (els) => {
  let edge = {};
  els.forEach((e) => {
    if (e.source) {
      let target = e.target;
      let weight;
      if (e.label) {
        weight = parseFloat(e.label);
        weight = Math.abs(weight);
      } else weight = 1;

      edge[e.source] = { ...edge[e.source], [target]: weight };
    }
  });
  return edge;
};
