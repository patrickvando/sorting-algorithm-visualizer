import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Visualizer from "./SortVisualizer.js";
import { runHeapsort } from "./sorts/heapsort.js";
import { runQuicksort } from "./sorts/quicksort.js";
import { runMergesort } from "./sorts/mergesort.js";
import { runSelectionsort } from "./sorts/selectionsort.js";
import { runBubblesort } from "./sorts/bubblesort.js";
import { runInsertionsort } from "./sorts/insertionsort.js";

const algorithmOptions = [
  ["Quicksort", runQuicksort],
  ["Mergesort", runMergesort],
  ["Heapsort", runHeapsort],
  ["Insertion sort", runInsertionsort],
  ["Selection sort", runSelectionsort],
  ["Bubble Sort", runBubblesort],
];

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
      <br />
      <br />
      <div className="description-block">
        Use this visualizer to compare different sorts. Each "frame" of the
        visualization roughly corresponds to a single comparison between two elements. Try
        customizing the values!
      </div>
    </div>
  );
}

export default App;
