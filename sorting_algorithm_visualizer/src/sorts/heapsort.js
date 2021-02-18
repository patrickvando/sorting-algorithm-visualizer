import * as utils from '../utilities.js';

export function runHeapsort(originalArray){
    var workingArray = utils.copyArray(originalArray);
    var frames = [utils.copyArray(originalArray)];
    var heap_size = 0;
    for(var k = 0; k < originalArray.length; k++){
        insertIntoHeap();
        frames.push(utils.copyArray(workingArray));
    }
    for(var k = workingArray.length - 1; k >= 0; k--){
        pop_from_heap();
    }

    function insertIntoHeap(){
        var ind = heap_size;
        utils.colorIndex(workingArray, ind, utils.color1);
        frames.push(utils.copyArray(workingArray));            
        utils.colorIndex(workingArray, ind, utils.color3);        
        var ival, ir, ig, ib;
        [ival, ir, ig, ib] = workingArray[ind];
        var parent = Math.floor((ind - 1) / 2);
        var pval, pr, pg, pb;
        if(parent > -1){
            [pval, pr, pg, pb] = workingArray[parent];
        }
        while(parent > 0 && ival > pval){
            utils.colorIndex(workingArray, ind, utils.color1);
            frames.push(utils.copyArray(workingArray));            
            utils.colorIndex(workingArray, ind, utils.color3);
            [workingArray[ind], workingArray[parent]] = [workingArray[parent], workingArray[ind]];
            ind = parent;
            parent = Math.floor((ind - 1) / 2);
            [pval, pr, pg, pb] = workingArray[parent];
            [ival, ir, ig, ib] = workingArray[ind];
        }
        if (ival > pval){
            [workingArray[ind], workingArray[parent]] = [workingArray[parent], workingArray[ind]];            
        }
        heap_size += 1;
    }

    function pop_from_heap(){
        [workingArray[0], workingArray[heap_size - 1]] = [workingArray[heap_size - 1], workingArray[0]];
        utils.colorIndex(workingArray, heap_size - 1, utils.color2);
        utils.colorIndex(workingArray, 0, utils.color1);        
        frames.push(utils.copyArray(workingArray));
        heap_size -= 1;
        var ind = 0;
        var ival, ir, ig, ib;
        [ival, ir, ig, ib] = workingArray[ind];
        var child1 = ind * 2 + 1;
        var c1val, c1r, c1g, c1b;
        if (child1 < heap_size){
            [c1val, c1r, c1g, c1b] = workingArray[child1];
        }
        var child2 = ind * 2 + 2;
        var c2val, c2r, c2g, c2b;
        if (child2 < heap_size){
            [c2val, c2r, c2g, c2b] = workingArray[child2];
        }
        while(child1 < heap_size && child2 < heap_size  && (ival < c1val || ival < c2val)){
            if (c1val > c2val){
                [workingArray[child1], workingArray[ind]] = [workingArray[ind], workingArray[child1]];
                ind = child1;
            } else {
                [workingArray[child2], workingArray[ind]] = [workingArray[ind], workingArray[child2]];                
                ind = child2;
            }
            frames.push(utils.copyArray(workingArray)); 
            child1 = ind * 2 + 1;
            if (child1 < heap_size){
                [c1val, c1r, c1g, c1b] = workingArray[child1];
            }            
            child2 = ind * 2 + 2;
            if (child2 < heap_size){
                [c2val, c2r, c2g, c2b] = workingArray[child2];
            }
        }
        if (child2 < heap_size && ival < c2val){
            [workingArray[child2], workingArray[ind]] = [workingArray[ind], workingArray[child2]];                
        } else if(child1 < heap_size && ival < c1val){
            [workingArray[child1], workingArray[ind]] = [workingArray[ind], workingArray[child1]];            
        }
        utils.colorIndex(workingArray, ind, utils.color3);        
        frames.push(utils.copyArray(workingArray));
    }
    utils.colorRange(workingArray, 0, workingArray.length - 1, utils.color5);
    frames.push(utils.copyArray(workingArray));
    var legend = [["Heapsort Legend", utils.color5], ["In-place max heap", utils.color3], ["Element being sifted", utils.color1], ["Sorted elements", utils.color2]]
    return [frames, legend];
}