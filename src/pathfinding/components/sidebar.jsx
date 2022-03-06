import i18next from "i18next";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import logo from "../assets/logo.png";

const Sidebar = (props) => {
  const { t } = useTranslation();
  const [sideBool, setSideBool] = React.useState(false);
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  useEffect(() => {
    if (window.innerWidth <= 820) {
      setSideBool(true);
    }
  }, []);

  return (
    <aside>
      <div id="logo">
        <img alt="Pathfinding - logo" src={logo}></img>
      </div>
      <div>
        {sideBool && (
          <div id="advice">
            <p
              style={{
                color: "#E53E3E",
                fontSize: "16px",
              }}
            >
              {t("advice")}
            </p>
          </div>
        )}
        {!sideBool && (
          <div id="dnd">
            <div className="description">{t("addNode")}</div>
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
        )}
        <div className="box">
          <div>
            <p>{t("changeWeight")}</p>
            <div>
              <input
                className="boxInputST"
                id="source"
                type="number"
                placeholder={t("source")}
              ></input>
              <input
                className="boxInputST"
                id="target"
                type="number"
                placeholder={t("target")}
              ></input>
            </div>
            <p>{t("newWeight")}</p>
            <input
              className="boxInput"
              id="weight"
              type="number"
              placeholder={t("weight")}
            ></input>
            <button
              className="buttonSecondary"
              type="button"
              onClick={props.updateWeight}
            >
              {t("B-weight")}
            </button>
          </div>
        </div>
        <div>
          {!sideBool && (
            <button className="buttonSecondary" onClick={props.delete}>
              {t("B-edges")}
            </button>
          )}
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
            {t("B-calculate")}
          </button>
        </div>

        <div>
          {props.results && (
            <div className="box">
              <div>
                <h3>
                  {t("distance")}: {props.results.distance}
                </h3>
              </div>
              <div>
                <h3>
                  {t("shortestPath")}:{" "}
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
                  {t("visitedNodes")}:{" "}
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
      <div id="footer">
        <div className="lang">
          <select
            name="lang"
            defaultValue={() => {
              let lang = navigator.language;
              lang = lang === "IT-it" ? it : "en";
              return lang;
            }}
            onChange={(event) => {
              i18next.changeLanguage(event.target.value);
            }}
          >
            <option value="it">Italiano</option>
            <option value="en">English</option>
          </select>
        </div>
        <div className="copy">
          <p>
            ©Copyright {new Date().getFullYear()}{" "}
            <a href="https://francescopapini.com">Francesco Papini</a>
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
