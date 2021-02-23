import React from "react";
import {
  FastForward,
  FastRewind,
  SkipPrevious,
  SkipNext,
  Pause,
  PlayArrow,
} from "@material-ui/icons";

import * as utils from "./utilities.js";

/* The Controls component is responsible for manipulating which frame is currently shown on the Display.
This includes rewinding, fast-forwarding, etc. The controls are also responsible for manipulating
the seed array - this includes randomizing the existing seed array, or handling custom values
input by the user.*/
class Controls extends React.Component {
  constructor(props) {
    super(props);
    let startingValues = this.seedArrayToCustomValues(
      this.props.seedArray
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

  seedArrayToCustomValues(arr) {
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
                  this.props.seedArray
                );
                this.props.changeseedArray(randomizedArray);
                this.setState({
                  customValues: this.seedArrayToCustomValues(
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
          </div>
        </div>
        <ValueCustomizer
          customValues={this.state.customValues}
          handleCustomValuesChange={this.handleCustomValuesChange}
          changeseedArray={this.props.changeseedArray}
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

  customValuesToseedArray(customValues) {
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
      this.props.changeseedArray(
        this.customValuesToseedArray(customValues)
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

export default Controls;
