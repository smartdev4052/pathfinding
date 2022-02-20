//get all edges
export const getAllEdges = (els) => {
  let result = [];
  els.forEach((e) => {
    if (e.source && e.target) {
      result.push(e);
    }
  });
  return result;
};

// get edge of the shortest path
export const getEdgeShortestPath = (els, path) => {
  let result = [];
  els.forEach((e) => {
    path.forEach((s, i, row) => {
      let t = row[++i];
      if (e.source && e.target) {
        if (String(e.target) === String(t) && String(e.source) === String(s)) {
          result.push(e);
        }
      }
    });
  });
  return result;
};

// update style edge
export const updateStyleEdges = (ng, color, animated, els) => {
  let result = [];
  els.forEach((e) => {
    if (e.source && e.target) {
      if (
        String(e.target) === String(ng.target) &&
        String(e.source) === String(ng.source)
      ) {
        e = { ...e, animated: animated, style: { stroke: color } };
      }
    }
    result.push(e);
  });
  return result;
};

// update weight of edge
export const updateWeightEdge = (source, target, weight, els) => {
  if (source && target && weight) {
    weight = Math.abs(weight);
    let result = [];
    els.forEach((e) => {
      if (e.source && e.target) {
        if (
          String(e.target) === String(target) &&
          String(e.source) === String(source)
        ) {
          e = { ...e, label: String(weight) };
        }
      }
      result.push(e);
    });
    return result;
  }
};
