import * as utils from '../utilities.js';

export function runInsertionsort(originalArray){
    var workingArray = utils.copyArray(originalArray);
    var frames = [utils.copyArray(workingArray)];
    for(var k = 0; k < workingArray.length; k++){
        utils.colorIndex(workingArray, k, utils.color1);
        var kval, kr, kg, kb;
        [kval, kr, kg, jb] = workingArray[k];
        var jval, jr, jg, jb;
        for (var j = 0; j < k; j++){
            [jval, jr, jg, jb] = workingArray[j];
            utils.colorRange(workingArray, 0, j, utils.color3);
            frames.push(utils.copyArray(workingArray));
            if (kval < jval){
                frames.pop()
                utils.colorIndex(workingArray, j, utils.color2);
                for(var m = k; m > j; m--){
                    [workingArray[m], workingArray[m - 1]] = [workingArray[m - 1], workingArray[m]];
                    frames.push(utils.copyArray(workingArray));
                }
                break;
            }
        }
        utils.colorRange(workingArray, 0, k, utils.color2);
        frames.push(utils.copyArray(workingArray));
    }
    utils.colorRange(workingArray, 0, workingArray.length - 1, utils.color5);
    frames.push(utils.copyArray(workingArray));
    var legend = [["Insertion Sort Legend", utils.color5], ["Target element", utils.color1], ["Items less than or equal to target element", utils.color3], ["Sorted elements", utils.color2]];
    return [frames, legend];
}