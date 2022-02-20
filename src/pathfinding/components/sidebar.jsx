import React, { useEffect } from "react";

const Sidebar = (props) => {
  const [advice, setAdvice] = React.useState(false);
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  useEffect(() => {
    if (window.innerWidth <= 820) {
      setAdvice(true);
    }
  }, []);

  return (
    <aside>
      <div>
        {advice && (
          <div id="advice">
            <p
              style={{
                color: "#E53E3E",
                fontSize: "16px",
              }}
            >
              Pathfinding is currently not optimized for touchscreen's devices
              and small ones
            </p>
          </div>
        )}
        <div id="dnd">
          <div className="description">
            ADD a NODE by dragging this node to the sheet.
          </div>
          <div className="drag">
            <div
              className="react-flow__node-default"
              onDragStart={(event) => onDragStart(event, "default")}
              draggable
            >
              i++
            </div>
          </div>
        </div>
        <div className="box">
          <div>
            <p>
              CHANGE the WEIGHT by selecting edge by source {"(output)"} and
              target {"(input)"} nodes
            </p>
            <div>
              <input
                className="boxInputST"
                id="source"
                type="number"
                placeholder="source"
              ></input>
              <input
                className="boxInputST"
                id="target"
                type="number"
                placeholder="target"
              ></input>
            </div>
            <p>Select the new weight:</p>
            <input
              className="boxInput"
              id="weight"
              type="number"
              placeholder="weight"
            ></input>
            <button
              className="buttonSecondary"
              type="button"
              onClick={props.updateWeight}
            >
              CHANGE WEIGHT
            </button>
          </div>
        </div>
        <div>
          <button className="buttonSecondary" onClick={props.delete}>
            DELETE ALL EDGES
          </button>
          {/* 
          <div>
            <button
              className="buttonSecondary"
              style={{ width: "45%" }}
              onClick={props.reset}
            >
              RESET GRAPH
            </button>
            <button
              className="buttonSecondary"
              style={{ width: "45%" }}
              onClick={props.save}
            >
              SAVE GRAPH
            </button>
          </div>*/}
          <button className="buttonPrimary" onClick={props.calculate}>
            CALCULATE SHORTEST PATH
          </button>
        </div>

        <div>
          {props.results && (
            <div className="box">
              <div>
                <h3>Distance: {props.results.distance}</h3>
              </div>
              <div>
                <h3>
                  Shortest Path:{" "}
                  {props.results.path.map((e, i, row) => {
                    return (
                      <li style={{ display: "inline" }} key={i}>
                        {e}{" "}
                        {i + 1 !== row.length && (
                          <p style={{ color: "red", display: "inline" }}>
                            - -{"> "}
                          </p>
                        )}
                      </li>
                    );
                  })}
                </h3>
              </div>
              <div>
                <h3>
                  Visited Nodes:{" "}
                  {props.results.visited.map((e, i, row) => {
                    return (
                      <li style={{ display: "inline", color: "blue" }} key={i}>
                        {e}
                        {i + 1 !== row.length && (
                          <p style={{ display: "inline", color: "blue" }}>
                            {",  "}
                          </p>
                        )}
                      </li>
                    );
                  })}
                </h3>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
