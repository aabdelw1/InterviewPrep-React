import React from "react";
import "./styles.css";

const grid = new Array(10).fill(new Array(10).fill(""));
console.log(grid);

const POSITIONS = {
  UP: "↑",
  RIGHT: "→",
  DOWN: "↓",
  LEFT: "←"
};

const OBSTACLES = [
  [8, 3],
  [4, 7],
  [0, 5],
  [1, 6],
  [2, 4],
  [2, 5]
];

export default function App() {
  const [robotPosition, setRobotPosition] = React.useState([0, 0]);
  const [robotDirection, setRobotDirection] = React.useState(POSITIONS.RIGHT);

  const turnRight = () => {
    let nextPosition = "";

    switch (robotDirection) {
      case POSITIONS.UP:
        nextPosition = POSITIONS.RIGHT;
        break;
      case POSITIONS.RIGHT:
        nextPosition = POSITIONS.DOWN;
        break;
      case POSITIONS.DOWN:
        nextPosition = POSITIONS.LEFT;
        break;
      case POSITIONS.LEFT:
        nextPosition = POSITIONS.UP;
        break;
      default:
        nextPosition = "";
    }

    setRobotDirection(nextPosition);
  };

  const moveForward = () => {
    const [column, line] = robotPosition;
    let newPosition = [];

    switch (robotDirection) {
      case POSITIONS.UP:
        newPosition = [column, line - 1];
        if (line === 0 || isObstacle(...newPosition)) {
          return turnRight();
        }
        break;
      case POSITIONS.RIGHT:
        newPosition = [column + 1, line];
        if (column === grid.length - 1 || isObstacle(...newPosition)) {
          return turnRight();
        }
        break;
      case POSITIONS.DOWN:
        newPosition = [column, line + 1];
        if (line === grid.length - 1 || isObstacle(...newPosition)) {
          return turnRight();
        }
        break;
      case POSITIONS.LEFT:
        newPosition = [column - 1, line];
        if (column === 0 || isObstacle(...newPosition)) {
          return turnRight();
        }
        break;
      default:
    }

    setRobotPosition(newPosition);
  };

  const isRobot = (column, line) =>
    column === robotPosition[0] && line === robotPosition[1];

  const isObstacle = (column, line) =>
    OBSTACLES.some(
      ([obsColumn, obsLine]) => column === obsColumn && line === obsLine
    );

  return (
    <div>
      <div className="Control">
        <button onClick={turnRight}>Turn Right</button>
        <button onClick={moveForward}>Move Forward</button>
      </div>
      <div className="Grid">
        {grid.map((gridColumn, indexColumn) => {
          return (
            <div className="Column" key={indexColumn}>
              {gridColumn.map((gridCell, indexCell) => (
                <div className="Cell" key={indexCell}>
                  {isRobot(indexColumn, indexCell)
                    ? robotDirection
                    : isObstacle(indexColumn, indexCell)
                    ? "X"
                    : gridCell}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
