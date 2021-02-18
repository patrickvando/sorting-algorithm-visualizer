import * as utils from '../utilities.js';

export function runBubblesort(originalArray){
    var workingArray = utils.copyArray(originalArray);
    var frames = [utils.copyArray(workingArray)];
    var run = true;
    while(run){
        var swaps = 0;
        for(var k = 1; k < workingArray.length; k++){
            var kval, kr, kg, kb;
            [kval, kr, kg, kb] = workingArray[k];
            var pval, pr, pg, pb;
            [pval, pr, pg, pb] = workingArray[k - 1];
            utils.colorIndex(workingArray, k, utils.color1);
            utils.colorIndex(workingArray, k - 1, utils.color3);
            frames.push(utils.copyArray(workingArray));
            if(kval < pval){
                [workingArray[k], workingArray[k - 1]] = [workingArray[k - 1], workingArray[k]];
                utils.colorIndex(workingArray, k, utils.color3);
                utils.colorIndex(workingArray, k - 1, utils.color1);
                frames.push(utils.copyArray(workingArray));
                swaps += 1;               
            }
            utils.colorIndex(workingArray, k, utils.color5);
            utils.colorIndex(workingArray, k - 1, utils.color5);
        }
        if(swaps == 0){
            run = false;
        }
    }
    utils.colorRange(workingArray, 0, workingArray.length - 1, utils.color5);
    frames.push(utils.copyArray(workingArray)); 
    var legend = [["Bubblesort Legend", utils.color5], ["Left element", utils.color3], ["Right element", utils.color1]];   
    return [frames, legend];
}