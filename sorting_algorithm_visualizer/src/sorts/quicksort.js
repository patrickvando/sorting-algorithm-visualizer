import * as utils from '../utilities.js';

export function runQuicksort(originalArray){
    var workingArray = utils.copyArray(originalArray);
    var frames = [utils.copyArray(originalArray)];
    function quicksort(start, end){
        if(start >= end){
            return;
        }
        var midpoint = partition(start, end);
        quicksort(start, midpoint - 1);
        quicksort(midpoint + 1, end);
    }

    function partition(start, end){
        var pivot = end;
        var pval, pr, pg, pb;
        [pval, pr, pg, pb] = workingArray[pivot];
        utils.colorRange(workingArray, start, end, utils.color4);
        frames.push(utils.copyArray(workingArray));
        utils.colorIndex(workingArray, pivot, utils.color2);
        frames.push(utils.copyArray(workingArray));
        var j = start;
        for (var k = start; k < end; k++){
            var val, r, g, b;
            [val, r, g, b] = workingArray[k];
            if (val < pval){
                [workingArray[j], workingArray[k]] = [workingArray[k], workingArray[j]];
                j += 1;
            }
            utils.colorRange(workingArray, start, j - 1, utils.color3)
            utils.colorRange(workingArray, j, k, utils.color1);
            frames.push(utils.copyArray(workingArray));
        }
        [workingArray[j], workingArray[pivot]] = [workingArray[pivot], workingArray[j]];
        frames.push(utils.copyArray(workingArray));
        utils.colorRange(workingArray, start, end, utils.color5);
        return j;
    }
    quicksort(0, workingArray.length - 1);
    frames.push(workingArray);
    var legend = [["Quicksort Legend", utils.color5], ["Remaining elements in partition", utils.color4], ["Pivot", utils.color2], ["Elements in partition less than pivot", utils.color3], ["Elements in partition greater than or equal to pivot", utils.color1]];
    return [frames, legend];
}