import React from "react";

import Controls from "./SortControls.js";
import Display from "./SortDisplay.js";
import AlgorithmSelect from "./SortSelect.js";
import * as utils from "./utilities.js";

/* The Visualizer component is responsible for managing the state data that is shared 
across the Display, the Controls, and the AlgorithmSelect. This includes things
like the current frame on display, the current animation speed, the seed array, etc.*/
class Visualizer extends React.Component {
  constructor(props) {
    super(props);
    let seedArray = this.generateseedArray(
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
    [frames, legend, description] = defaultAlgorithmRunner(seedArray);
    this.state = {
      seedArray: seedArray,
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
    this.changeseedArray = this.changeseedArray.bind(this);
  }
  generateseedArray(arrayLength, minimum, maximum) {
    let seedArray = [];
    for (let k = 0; k < arrayLength; k++) {
      let value = Math.floor(Math.random() * (maximum + 1)) + minimum;
      seedArray.push([value, utils.color5]);
    }
    return seedArray;
  }

  runAlgorithm() {
    // Running the algorithm depends on the state of the starting Array.
    this.setState((state) => {
      let algorithmName, algorithmRunner;
      [algorithmName, algorithmRunner] = state.currentAlgorithm;
      let frames, legend, description;
      [frames, legend, description] = algorithmRunner(state.seedArray);
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

  changeseedArray(seedArray) {
    this.setState({ seedArray: seedArray });
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
        <div className="Description">
          <div>{this.state.description}</div>
        </div>
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
          seedArray={this.state.seedArray}
          changeseedArray={this.changeseedArray}
          maxVal={this.props.maximum}
          minVal={this.props.minimum}
          maxLength={this.props.maxLength}
        />
      </div>
    );
  }
}

export default Visualizer;
