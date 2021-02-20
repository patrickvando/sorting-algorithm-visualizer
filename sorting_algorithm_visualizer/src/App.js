import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { runHeapsort } from "./sorts/heapsort.js";
import { runQuicksort } from "./sorts/quicksort.js";
import { runMergesort } from "./sorts/mergesort.js";
import { runSelectionsort } from "./sorts/selectionsort.js";
import { runBubblesort } from "./sorts/bubblesort.js";
import { runInsertionsort } from "./sorts/insertionsort.js";
import * as utils from "./utilities.js";
import "bootstrap/dist/css/bootstrap.min.css";

import {
  FastForward,
  FastRewind,
  SkipPrevious,
  SkipNext,
  Pause,
  PlayArrow,
} from "@material-ui/icons";

const algorithmOptions = [
  ["Quicksort", runQuicksort, "Quicksort description"],
  ["Mergesort", runMergesort, "Mergesort Description"],
  ["Heapsort", runHeapsort, "Heapsort Description"],
  ["Insertion sort", runInsertionsort, "Insertionsort Description"],
  ["Selection sort", runSelectionsort, "Selectionsort Description"],
  ["Bubble Sort", runBubblesort, "Bubblesort Description"],
];

function AlgorithmSelect(props) {
  let currentAlgorithmName, currentAlgorithmRunner, currentAlgorithmDescription;
  [
    currentAlgorithmName,
    currentAlgorithmRunner,
    currentAlgorithmDescription,
  ] = props.currentAlgorithm;
  return (
    <div>
      <div className="select-row">
        {props.algorithmOptions.map(
          ([algorithmName, algorithm, algorithmDescription]) => {
            let classes = "btn btn-outline-dark algorithm-button ";
            if (currentAlgorithmName == algorithmName) {
              classes += "active ";
            }
            return (
              <button
                key={algorithmName}
                className={classes}
                onClick={() => {
                  props.changeAlgorithm([
                    algorithmName,
                    algorithm,
                    algorithmDescription,
                  ]);
                  props.runAlgorithm();
                }}
              >
                {algorithmName}
              </button>
            );
          }
        )}
      </div>
    </div>
  );
}

function Description(props) {
  return (
    <div className="Description">
      <div className="description-block">
        Use this visualizer to compare different sorts. Each "frame" of the
        visualization corresponds to a single swap between two elements. Try
        customizing the values!
      </div>
      <br />
      <div>{props.description}</div>
    </div>
  );
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

  // Draw the legend on the canvas
  paintLegend() {
    let canvas = this.props.canvasRef.current;
    let ctx = canvas.getContext("2d");
    let startX = 95;
    let startY = 50;
    let lineSpacing = 10;
    let blockSize = 10;
    let blockSpacing = 5;
    let fontSize = 20;
    let text, color;
    let currentLegend = this.props.legend;
    [text, color] = currentLegend[0];
    ctx.font = fontSize + "px Roboto Mono";
    ctx.fillStyle = color;
    ctx.fillText(text, startX, startY + fontSize / 2);
    for (let k = 1; k < currentLegend.length; k++) {
      let text, color;
      [text, color] = currentLegend[k];
      ctx.fillStyle = color;
      ctx.fillRect(
        startX,
        startY + (fontSize + lineSpacing) * k,
        blockSize,
        blockSize
      );
      ctx.font = fontSize + "px Roboto Mono";
      ctx.fillText(
        text,
        startX + blockSize + blockSpacing,
        startY + (fontSize + lineSpacing) * k + fontSize / 2
      );
    }
  }

  componentDidMount() {
    this.paintFrame();
    this.paintLegend();
  }

  render() {
    let frame = this.props.frame;
    if (this.props.canvasRef.current) {
      this.paintFrame();
      this.paintLegend();
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

class Controls extends React.Component {
  constructor(props) {
    super(props);
    let startingValues = this.startingArrayToCustomValues(
      this.props.startingArray
    );
    this.state = {
      speedModifier: 0,
      customValues: startingValues,
    };
    this.handleSpeedSliderChange = this.handleSpeedSliderChange.bind(this);
    this.handleCustomValuesChange = this.handleCustomValuesChange.bind(this);
  }

  handleSpeedSliderChange(event) {
    let speedModifier = event.target.value;
    this.props.changeAnimationSpeed(
      Math.pow(4, -(speedModifier / 10)) * this.props.baseAnimationSpeed
    );
    this.setState({ speedModifier: speedModifier });
  }
  pauseAndChangeFrame(frameIndex) {
    this.props.pause(true);
    this.props.changeFrame(frameIndex);
  }

  startingArrayToCustomValues(arr) {
    let customValues = "";
    for (let k = 0; k < arr.length; k++) {
      customValues += arr[k][0] + ", ";
    }
    if (customValues) {
      customValues = customValues.substring(0, customValues.length - 2);
    }
    return customValues;
  }

  handleCustomValuesChange(event) {
    let customValues = event.target.value;
    this.setState({ customValues: customValues });
  }

  randomizeArray(array) {
    let randomizedArray = array.slice();
    for (let k = 0; k < randomizedArray.length; k++) {
      let randInd = Math.floor(
        Math.random() * (randomizedArray.length - k) + k
      );
      [randomizedArray[k], randomizedArray[randInd]] = [
        randomizedArray[randInd],
        randomizedArray[k],
      ];
    }
    return randomizedArray;
  }

  render() {
    let frameIndex = (this.props.frameIndex + 1).toString();
    let maxFrameIndex = (this.props.maxFrameIndex + 1).toString();
    frameIndex = frameIndex.padStart(maxFrameIndex.length, " ");
    return (
      <div>
        <div>
          <div>
            <div className="frame-controls">
              <div>
                <span className="frame-slider-label">
                  {"Frame: " + frameIndex + "/" + maxFrameIndex}
                </span>
              </div>
              <input
                className="frame-slider"
                type="range"
                min={0}
                max={this.props.maxFrameIndex}
                value={this.props.frameIndex}
                onChange={(event) =>
                  this.pauseAndChangeFrame(event.target.value)
                }
              />
            </div>
          </div>
          <div className="playback-bar">
            <button
              className="btn btn-outline-dark"
              onClick={() => {
                let randomizedArray = this.randomizeArray(
                  this.props.startingArray
                );
                this.props.changeStartingArray(randomizedArray);
                this.setState({
                  customValues: this.startingArrayToCustomValues(
                    randomizedArray
                  ),
                });
              }}
            >
              Randomize Order
            </button>
            <div className="step-controls">
              <button
                className="btn btn-outline-dark"
                onClick={(event) => this.pauseAndChangeFrame(0)}
              >
                <FastRewind />
              </button>
              <button
                className="btn btn-outline-dark"
                onClick={(event) =>
                  this.pauseAndChangeFrame(this.props.frameIndex - 1)
                }
              >
                <SkipPrevious />
              </button>
              <button
                className="btn btn-outline-dark"
                onClick={(event) => this.props.pause(!this.props.isPaused)}
              >
                {this.props.isPaused ? <PlayArrow /> : <Pause />}
              </button>
              <button
                className="btn btn-outline-dark"
                onClick={(event) =>
                  this.pauseAndChangeFrame(this.props.frameIndex + 1)
                }
              >
                <SkipNext />
              </button>
              <button
                className="btn btn-outline-dark"
                onClick={(event) =>
                  this.pauseAndChangeFrame(this.props.maxFrameIndex)
                }
              >
                <FastForward />
              </button>
            </div>
            <form>
              <label className="speed">
                <span className="speed-label">Speed:</span>
                <input
                  className="speed-slider"
                  type="range"
                  min={-10}
                  max={10}
                  value={this.state.speedModifier}
                  onChange={this.handleSpeedSliderChange}
                />
              </label>
            </form>
          </div>
        </div>
        <ValueCustomizer
          customValues={this.state.customValues}
          handleCustomValuesChange={this.handleCustomValuesChange}
          changeStartingArray={this.props.changeStartingArray}
          maxVal={this.props.maxVal}
          minVal={this.props.minVal}
          maxLength={this.props.maxLength}
        />
      </div>
    );
  }
}

class ValueCustomizer extends React.Component {
  constructor(props) {
    super(props);
    this.handleCustomValuesSubmission = this.handleCustomValuesSubmission.bind(
      this
    );

    this.state = {
      validCustomValueSubmission: true,
    };
  }

  customValuesToStartingArray(customValues) {
    if (!customValues) {
      return [];
    }
    const regex = /[0-9]+/g;
    return customValues
      .match(regex)
      .map((value) => [parseInt(value), utils.color5]);
  }

  validateCustomValues(customValues) {
    let regex = /^(\s*[0-9]+\s*,)*(\s*[0-9]+\s*)?$/g;
    if (customValues.match(regex) == null) {
      return false;
    }
    regex = /[0-9]+/g;
    let values = customValues.match(regex).map((value) => parseInt(value));
    if (
      Math.max(...values) > 100 ||
      Math.min(...values) < 0 ||
      values.length >= this.props.maxLength
    ) {
      return false;
    }
    return true;
  }

  handleCustomValuesSubmission(event) {
    let customValues = this.props.customValues;
    event.preventDefault();
    if (this.validateCustomValues(customValues)) {
      this.props.changeStartingArray(
        this.customValuesToStartingArray(customValues)
      );
      this.setState({ validCustomValueSubmission: true });
    } else {
      this.setState({ validCustomValueSubmission: false });
    }
  }

  render() {
    let validCriteriaMessage = (
      <span
        className={
          this.state.validCustomValueSubmission
            ? ""
            : "invalid-custom-value-submission"
        }
      >
        {"Custom values must be integers greater than or equal to " +
          this.props.minVal +
          " and less than " +
          this.props.maxVal +
          "."}
        <br />
        {"Separate values using commas. Maximum length of " +
          this.props.maxLength +
          " values."}
      </span>
    );
    return (
      <div>
        <form onSubmit={this.handleCustomValuesSubmission}>
          <label className="custom-value-submission-label">
            <textarea
              rows="2"
              cols="100"
              onChange={this.props.handleCustomValuesChange}
              value={this.props.customValues}
            />
            <input
              className="btn btn-outline-dark"
              type="submit"
              value="Customize Values"
            />
          </label>
        </form>
        <div>{validCriteriaMessage}</div>
      </div>
    );
  }
}

class Visualizer extends React.Component {
  constructor(props) {
    super(props);
    let startingArray = this.generateStartingArray(
      this.props.arrayLength,
      this.props.minimum,
      this.props.maximum
    );
    let defaultAlgorithmName, defaultAlgorithmRunner;
    [
      defaultAlgorithmName,
      defaultAlgorithmRunner,
    ] = this.props.defaultAlgorithm;
    let frames, legend, description;
    [frames, legend, description] = defaultAlgorithmRunner(startingArray);
    this.state = {
      startingArray: startingArray,
      isPaused: true,
      frames: frames,
      legend: legend,
      frameIndex: 0,
      animationSpeed: this.props.baseAnimationSpeed,
      currentAlgorithm: this.props.defaultAlgorithm,
      description: description,
    };
    this.canvasRef = React.createRef();
    this.animationInterval = null;
    this.runAlgorithm = this.runAlgorithm.bind(this);
    this.pause = this.pause.bind(this);
    this.changeFrame = this.changeFrame.bind(this);
    this.changeAnimationSpeed = this.changeAnimationSpeed.bind(this);
    this.changeAlgorithm = this.changeAlgorithm.bind(this);
    this.changeStartingArray = this.changeStartingArray.bind(this);
  }
  generateStartingArray(arrayLength, minimum, maximum) {
    let startingArray = [];
    for (let k = 0; k < arrayLength; k++) {
      let value = Math.floor(Math.random() * (maximum + 1)) + minimum;
      startingArray.push([value, utils.color5]);
    }
    return startingArray;
  }

  runAlgorithm() {
    this.setState((state) => {
      let algorithmName, algorithmRunner;
      [algorithmName, algorithmRunner] = state.currentAlgorithm;
      let frames, legend, description;
      [frames, legend, description] = algorithmRunner(state.startingArray);
      clearInterval(this.animationInterval);
      return {
        legend: legend,
        frames: frames,
        description: description,
        frameIndex: 0,
        isPaused: true,
      };
    });
  }

  changeAlgorithm(currentAlgorithm) {
    this.setState({ currentAlgorithm: currentAlgorithm });
  }

  pause(shouldPause) {
    let isPaused = this.state.isPaused;
    if (shouldPause == isPaused) {
      return;
    }
    clearInterval(this.animationInterval);    
    if (!shouldPause) {
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
    if (!this.state.isPaused) {
      clearInterval(this.animationInterval);
      this.animationInterval = setInterval(
        () => this.changeFrame(this.state.frameIndex + 1),
        speed
      );
    }
    this.setState({ animationSpeed: speed });
  }

  changeStartingArray(startingArray) {
    this.setState({ startingArray: startingArray });
    this.runAlgorithm();
  }

  render() {
    let currentFrame = this.state.frames[this.state.frameIndex];
    return (
      <div>
        <AlgorithmSelect
          currentAlgorithm={this.state.currentAlgorithm}
          algorithmOptions={this.props.algorithmOptions}
          runAlgorithm={this.runAlgorithm}
          changeAlgorithm={this.changeAlgorithm}
        />
        <Description description={this.state.description} />
        <Display
          canvasRef={this.canvasRef}
          width={1200}
          height={480}
          frame={currentFrame}
          legend={this.state.legend}
          barWidth={10}
          barSpacing={12}
          yOffset={50}
          fontSize={12}
          magnitudeMultiplier={2}
        />
        <Controls
          frame={this.state.frameIndex}
          pause={this.pause}
          isPaused={this.state.isPaused}
          maxFrameIndex={this.state.frames.length - 1}
          frameIndex={this.state.frameIndex}
          changeFrame={this.changeFrame}
          baseAnimationSpeed={this.props.baseAnimationSpeed}
          changeAnimationSpeed={this.changeAnimationSpeed}
          startingArray={this.state.startingArray}
          changeStartingArray={this.changeStartingArray}
          maxVal={this.props.maximum}
          minVal={this.props.minimum}
          maxLength={this.props.maxLength}
        />
      </div>
    );
  }
}

function App() {
  return (
    <div className="App">
      <span>
        <b>Sort Visualizer</b>
      </span>
      <Visualizer
        arrayLength={40}
        minimum={0}
        maximum={100}
        maxLength={50}
        baseAnimationSpeed={100}
        algorithmOptions={algorithmOptions}
        defaultAlgorithm={algorithmOptions[0]}
      />
    </div>
  );
}

export default App;
