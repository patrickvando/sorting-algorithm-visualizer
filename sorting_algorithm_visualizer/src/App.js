import logo from "./logo.svg";
import "./App.css";
import React from "react";

//todo -> does () => vs bind have a runtime impact performance?
//invert how speed works
class PlayBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { speedMultiplier: this.props.speedMultipliers[0] };
    this.handleSpeedMultiplierChange = this.handleSpeedMultiplierChange.bind(
      this
    );
  }
  handleSpeedMultiplierChange(event) {
    let speedMultiplier = event.target.value;
    console.log(speedMultiplier);
    this.props.changeAnimationSpeed(
      speedMultiplier * this.props.baseAnimationSpeed
    );
    this.setState({ speedMultiplier: speedMultiplier });
  }
  pauseAndChangeFrame(frameIndex) {
    this.props.pause(true);
    this.props.changeFrame(frameIndex);
  }
  render() {
    return (
      <div>
        <div>
          <input
            className="slider"
            type="range"
            min={0}
            max={this.props.maxFrameIndex}
            value={this.props.frameIndex}
            width={500}
            onChange={(event) => this.props.changeFrame(event.target.value)}
          />
        </div>
        <div>
          <button>Randomize Order</button>
          <button onClick={(event) => this.pauseAndChangeFrame(0)}>
            Go to beginning
          </button>
          <button
            onClick={(event) =>
              this.pauseAndChangeFrame(this.props.frameIndex - 1)
            }
          >
            Step backwards
          </button>
          <button onClick={(event) => this.props.pause(!this.props.isPaused)}>
            Pause/Play
          </button>
          <button
            onClick={(event) =>
              this.pauseAndChangeFrame(this.props.frameIndex + 1)
            }
          >
            Step forwards
          </button>
          <button
            onClick={(event) =>
              this.pauseAndChangeFrame(this.props.maxFrameIndex)
            }
          >
            Go to end
          </button>
          <form>
            <label>Speed:</label>
            <select
              value={this.state.speed_multiplier}
              onChange={this.handleSpeedMultiplierChange}
            >
              {this.props.speedMultipliers.map((multiplier) => (
                <option key={multiplier} value={multiplier}>
                  {multiplier + "x"}
                </option>
              ))}
            </select>
          </form>
        </div>
      </div>
    );
  }
}

class Display extends React.Component {
  paintFrame() {
    let canvas = this.props.canvasRef.current;
    let ctx = canvas.getContext("2d");
    let frame = this.props.frame;

    let barWidth = this.props.barWidth;
    let barSpacing = this.props.barSpacing;
    let xOffset =
      (canvas.width - frame.length * (barWidth + barSpacing) - barSpacing) / 2;
    let yOffset = this.props.yOffset;
    let fontSize = this.props.fontSize;
    let magnitudeMultiplier = this.props.magnitudeMultiplier;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let k = 0; k < frame.length; k++) {
      let val, color;
      [val, color] = frame[k];
      ctx.fillStyle = color;
      ctx.fillRect(
        xOffset + (barWidth + barSpacing) * k,
        canvas.height - yOffset,
        barWidth,
        -val * magnitudeMultiplier
      );
      ctx.font = fontSize + "px Roboto Mono";
      ctx.fillText(
        val,
        xOffset + (barWidth + barSpacing) * k,
        canvas.height - yOffset + fontSize
      );
    }
  }

  componentDidMount() {
    this.paintFrame();
  }

  render() {
    let frame = this.props.frame;
    if (this.props.canvasRef.current) {
      this.paintFrame();
    }
    return (
      <div>
        <canvas
          width={this.props.width}
          height={this.props.height}
          ref={this.props.canvasRef}
        />
      </div>
    );
  }
}

class AlgorithmSelect extends React.Component {
  constructor(props) {
    super(props);
    //mapping options to selected without hardcoding names?
    let algorithmName, algorithm;
    [algorithmName, algorithm] = algorithmOptions[0];
    this.props.runAlgorithm(algorithm);
    this.state = { selectedAlgorithm: algorithmName };
    this.handleAlgorithmChange = this.handleAlgorithmChange.bind(this);
  }

  handleAlgorithmChange(event, algorithmName, algorithm) {
    this.setState({ selectedAlgorithm: algorithmName });
    this.props.runAlgorithm(algorithm);
  }

  render() {
    return (
      <div>
        {algorithmOptions.map(([algorithmName, algorithm]) => {
          let classes = "algorithm-button ";
          if (this.state.selectedAlgorithm == algorithmName) {
            classes += "selected-algorithm-button ";
          }
          return (
            <button
              key={algorithmName}
              className={classes}
              onClick={(event) =>
                this.handleAlgorithmChange(event, algorithmName, algorithm)
              }
            >
              {algorithmName}
            </button>
          );
        })}
      </div>
    );
  }
}

function ValueCustomizer(props) {
  return <div>ValueCustomizer</div>;
}

class Visualizer extends React.Component {
  constructor(props) {
    super(props);
    let startingArray = generateStartingArray(
      this.props.arrayLength,
      this.props.minimum,
      this.props.maximum
    );
    //placeholder
    let frames = [];
    for (let k = 0; k < 100; k++) {
      // frames.push(startingArray.slice());
      frames.push(
        generateStartingArray(
          this.props.arrayLength,
          this.props.minimum,
          this.props.maximum
        )
      );
    }
    this.state = {
      startingArray: startingArray,
      isPaused: true,
      frames: frames,
      frameIndex: 0,
      animationSpeed: this.props.baseAnimationSpeed,
    };
    this.canvasRef = React.createRef();
    this.animationInterval = null;
    this.runAlgorithm = this.runAlgorithm.bind(this);
    this.pause = this.pause.bind(this);
    this.changeFrame = this.changeFrame.bind(this);
    this.changeAnimationSpeed = this.changeAnimationSpeed.bind(this);
  }

  runAlgorithm(algorithm) {
    //set the current frame to 0
    //update the frames, reset the dispaly
    let fframes = this.state.frames;
    this.setState({ frames: fframes });
  }

  pause(shouldPause) {
    let isPaused = this.state.isPaused;
    if (shouldPause == isPaused) {
      return;
    }
    if (shouldPause) {
      clearInterval(this.animationInterval);
    } else {
      this.animationInterval = setInterval(
        () => this.changeFrame(this.state.frameIndex + 1),
        this.state.animationSpeed
      );
    }
    this.setState({ isPaused: shouldPause });
  }

  changeFrame(frameIndex) {
    frameIndex = Math.max(
      0,
      Math.min(this.state.frames.length - 1, frameIndex)
    );
    this.setState({ frameIndex: frameIndex });
  }

  changeAnimationSpeed(speed) {
    console.log(speed);
    this.pause(true);
    this.setState({ animationSpeed: speed });
    this.pause(false);
  }

  changeStartingArray(arr) {
    //run algorithm again
    //change current algorithm
  }

  render() {
    let currentFrame = this.state.frames[this.state.frameIndex];
    return (
      <div>
        <AlgorithmSelect runAlgorithm={this.runAlgorithm} />
        <Display
          canvasRef={this.canvasRef}
          width={1200}
          height={480}
          frame={currentFrame}
          barWidth={10}
          barSpacing={12}
          yOffset={50}
          fontSize={12}
          magnitudeMultiplier={2}
        />
        <PlayBar
          frame={this.state.frameIndex}
          pause={this.pause}
          isPaused={this.state.isPaused}
          maxFrameIndex={this.state.frames.length - 1}
          frameIndex={this.state.frameIndex}
          changeFrame={this.changeFrame}
          baseAnimationSpeed={this.props.baseAnimationSpeed}
          changeAnimationSpeed={this.changeAnimationSpeed}
          speedMultipliers={[1, 2, 3, 4]}
        />
        <ValueCustomizer
          handleStartingArrayChange={this.handleStartingArrayChange}
        />
      </div>
    );
  }
}

function generateStartingArray(arrayLength, minimum, maximum) {
  let startingArray = [];
  for (let k = 0; k < arrayLength; k++) {
    let value = Math.floor(Math.random() * (maximum + 1)) + minimum;
    startingArray.push([value, "#000000"]);
  }
  return startingArray;
}

//map to their respective functions in other files
const algorithmOptions = [
  ["Quicksort", null],
  ["Mergesort", null],
  ["Heapsort", null],
  ["Insertion sort", null],
  ["Selection sort", null],
  ["Bubble Sort", null],
];

function App() {
  return (
    <div className="App">
      <Visualizer
        arrayLength={50}
        minimum={10}
        maximum={50}
        baseAnimationSpeed={150}
      />
    </div>
  );
}

export default App;
