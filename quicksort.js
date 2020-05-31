function run_quicksort(original_array){
    var working_array = copy_array(original_array);
    var frames = [copy_array(working_array)];
    function quicksort(start, end){
        if(start >= end){
            return;
        }
        midpoint = partition(start, end);
        quicksort(start, midpoint - 1);
        quicksort(midpoint + 1, end);
    }

    function partition(start, end){
        var pivot = end;
        var pval, pr, pg, pb;
        [pval, pr, pg, pb] = working_array[pivot];
        color_index(working_array, pivot, 0, 255, 0);
        frames.push(copy_array(working_array));
        var j = start;
        for (var k = start; k < end; k++){
            var val, r, g, b;
            [val, r, g, b] = working_array[k];
            color_index(working_array, j, 0, 0, 255);
            color_index(working_array, k, 255, 0, 0);
            frames.push(copy_array(working_array));
            color_index(working_array, k, 0, 0, 0);
            if (val < pval){
                color_index(working_array, j, 0, 0, 0);
                [working_array[j], working_array[k]] = [working_array[k], working_array[j]];
                j += 1;
            }

        }
        [working_array[j], working_array[pivot]] = [working_array[pivot], working_array[j]];
        color_index(working_array, j, 0, 0, 0);
        color_index(working_array, pivot, 0, 0, 0);
        return j;
    }
    quicksort(0, working_array.length - 1);
    frames.push(working_array);
    return frames;
}