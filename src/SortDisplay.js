import React from "react";

/* The Display component is responsible for painting the current frame and legend onto the Canvas.*/
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

export default Display;
