import * as utils from '../utilities.js';

export function runMergesort(originalArray){
    var workingArray = utils.copyArray(originalArray);
    var frames = [utils.copyArray(workingArray)];
    function mergesort(start, end){
        if (start == end){
            return workingArray[start]
        } else {
            var midpoint = Math.floor((start + end) / 2);
            mergesort(start, midpoint);
            mergesort(midpoint + 1, end);
            utils.colorRange(workingArray, start, midpoint, utils.color1);
            utils.colorRange(workingArray, midpoint + 1, end, utils.color3);
            frames.push(utils.copyArray(workingArray));
            var arr = [];
            var k = start;
            var j = midpoint + 1;
            while (k <= midpoint && j <= end){
                var kval, kr, kg, kb;
                [kval, kr, kg, kb] = workingArray[k];
                var jval, jr, jg, jb;
                [jval, jr, jg, jb] = workingArray[j];
                if(kval <= jval){
                    arr.push(workingArray[k]);
                    k += 1;                    
                } else {
                    arr.push(workingArray[j]); 
                    j += 1;                                       
                }
            }
            while (k <= midpoint){
                arr.push(workingArray[k]);
                k += 1;
            }
            while (j <= end){
                arr.push(workingArray[j]);
                j += 1;
            }
            var j = 0;
            for (var k = start; k <= end; k++){
                workingArray[k] = arr[j];
                utils.colorIndex(workingArray, k, utils.color2);
                frames.push(utils.copyArray(workingArray));
                j += 1;
            }
            utils.colorRange(workingArray, start, end, utils.color5);
            frames.push(utils.copyArray(workingArray));
        }
    }
    mergesort(0, workingArray.length - 1);
    var description = (
        <span>
            <b>Mergesort</b> is an efficient stable sorting algorithm with a
            runtime of O(n log n) and a memory requirement of O(n). 
            <br /><a href="https://en.wikipedia.org/wiki/Merge_sort">Learn about how Mergesort works on Wikipedia.</a>
        </span>
    );    
    var legend = [["Mergesort Legend", utils.color5], ["Left in-order partition", utils.color1], ["Right in-order partition", utils.color3], ["Merged in-order partition", utils.color2]];
    return [frames, legend, description];
}