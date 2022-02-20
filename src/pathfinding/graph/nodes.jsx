// get all node
export const getAllNodes = (els) => {
  let result = [];
  els.forEach((e) => {
    if (e.position) {
      result.push(e);
    }
  });
  return result;
};

// get all node visited
export const getNodesVisited = (els, visited) => {
  let result = [];
  els.forEach((e) => {
    visited.forEach((v) => {
      if (String(v) === String(e.id)) {
        result.push(e);
      }
    });
  });
  return result;
};

// update style of visited nodes
export const updateNodeStyle = (n, color, els) => {
  let result = [];
  els.forEach((e) => {
    if (n.id === e.id) {
      e = { ...e, style: { border: "1px solid " + color } };
    }
    result.push(e);
  });
  return result;
};
