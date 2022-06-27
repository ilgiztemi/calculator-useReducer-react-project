import "./App.css";
import { useReducer } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "first": {
      return { ...state, firstPart: (state.firstPart + action.payload), show: (state.show + action.payload) };
    }
    case "second": {
      return { ...state, secondPart: (state.secondPart + action.payload), show: (state.show + action.payload) };
    }
    case "operation": {
      return { ...state, operation: action.payload, show: (state.show + ' ' + action.payload) + ' ' };
    }
    case "result": {
      if (state.operation === "-") {
        return {
          ...state,
          result: Number(state.firstPart) - Number(state.secondPart),show: '', operation: ''
        };
      } else if (state.operation === "+") {
        return {
          ...state,
          result: Number(state.firstPart) + Number(state.secondPart),show: '', operation: ''
        };
      } else if (state.operation === "*") {
        return {
          ...state,
          result: Number(state.firstPart) * Number(state.secondPart), show: '', operation: ''
        };
      } else if (state.operation === "/") {
        return {
          ...state,
          result: Number(state.firstPart) / Number(state.secondPart), show: '', operation: ''
        };
      }
    }
    case "clear":
      return { ...state, firstPart: "", secondPart: "", result: 0, show: '' };
    default:
      return state;
  }
};
const initialState = {
  firstPart: "",
  secondPart: "",
  operation: "",
  show: '',
  result: 0,
};
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const operations = ["-", "+", "*", "/"];
  console.log(state.operation);
  const handleNumber = (el) => {
    if (state.operation === "") {
      dispatch({
        type: "first",
        payload: `${el}`,
      });
    } else {
      dispatch({
        type: "second",
        payload: el,
      });
    }
    console.log(el);
  };
  console.log(state.show);
  const handleOperations = (el) => {
    dispatch({
      type: "operation",
      payload: el,
    });
  };
  const handleResult = () => {
    dispatch({
      type: "result",
      payload: {
        first: state.firstPart,
        second: state.secondPart,
        operation: state.operation,
      },
    });
  };
  const handleClear = () => {
    dispatch({
      type: "clear",
    });
  };
  console.log(state);
  return (
    <div className="main">
      <div className="results">{
        !state.show ? state.result : state.show
      }</div>
      <div className="App">
        <div className="numbers">
          {numbers.map((el, ind) => (
            <div onClick={() => handleNumber(el)} className="number" key={ind}>
              {el}
            </div>
          ))}
          <div onClick={handleClear} className="clear">
            Clear
          </div>
          <div onClick={handleResult} className="equals">
            =
          </div>
        </div>
        <div className="operations">
          {operations.map((el, ind) => (
            <div
              onClick={() => handleOperations(el)}
              className="operation"
              key={ind}
            >
              {el}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
