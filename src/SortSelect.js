/* The AlgorithmSelect component is responsible for displaying the algorithm options
and running the algorithm on the seed array when an algorithm is selected.*/
function AlgorithmSelect(props) {
  let currentAlgorithmName, currentAlgorithmRunner;
  [currentAlgorithmName, currentAlgorithmRunner] = props.currentAlgorithm;
  return (
    <div>
      <div className="select-row">
        {props.algorithmOptions.map(([algorithmName, algorithm]) => {
          let classes = "btn btn-outline-dark algorithm-button ";
          if (currentAlgorithmName == algorithmName) {
            classes += "active ";
          }
          return (
            <button
              key={algorithmName}
              className={classes}
              onClick={() => {
                props.changeAlgorithm([algorithmName, algorithm]);
                props.runAlgorithm();
              }}
            >
              {algorithmName}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default AlgorithmSelect;
