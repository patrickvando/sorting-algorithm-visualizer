import * as utils from "../utilities.js";

export function runSelectionsort(originalArray) {
    var workingArray = utils.copyArray(originalArray);
    var frames = [utils.copyArray(workingArray)];
    for (var k = 0; k < workingArray.length; k++) {
        var min = k;
        var minval, mr, mg, mb;
        [minval, mr, mg, mb] = workingArray[min];
        utils.colorIndex(workingArray, min, utils.color1);
        for (var j = k + 1; j < workingArray.length; j++) {
            var jval, jr, jg, jb;
            [jval, jr, jg, jb] = workingArray[j];
            if (jval < minval) {
                utils.colorIndex(workingArray, min, utils.color5);
                min = j;
                [minval, mr, mg, mb] = workingArray[min];
            }
            utils.colorIndex(workingArray, j, utils.color3);
            utils.colorIndex(workingArray, min, utils.color1);
            frames.push(utils.copyArray(workingArray));
            utils.colorIndex(workingArray, j, utils.color5);
            utils.colorIndex(workingArray, min, utils.color1);
        }
        [workingArray[min], workingArray[k]] = [
            workingArray[k],
            workingArray[min],
        ];
        utils.colorIndex(workingArray, k, utils.color2);
    }
    utils.colorRange(workingArray, 0, workingArray.length - 1, utils.color5);
    frames.push(utils.copyArray(workingArray));
    var legend = [
        ["Selection Sort Legend", utils.color5],
        ["Current element", utils.color3],
        ["Current minimum among unsorted elements", utils.color1],
        ["Sorted elements", utils.color2],
    ];
    var description = (
        <span>
            <b>Selection sort</b> is an inefficient sorting algorithm with an
            runtime of O(n^2). <br />
            <a href="https://en.wikipedia.org/wiki/Selection_sort">
                Learn about how Selection sort works on Wikipedia.
            </a>
        </span>
    );
    return [frames, legend, description];
}
