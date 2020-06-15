function run_quicksort(original_array){
    var working_array = copy_array(original_array);
    var frames = [copy_array(original_array)];
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
        color_range(working_array, start, end, 0, 150, 0);
        frames.push(copy_array(working_array));
        color_index(working_array, pivot, 0, 255, 0);
        frames.push(copy_array(working_array));
        var j = start;
        for (var k = start; k < end; k++){
            var val, r, g, b;
            [val, r, g, b] = working_array[k];
            if (val < pval){
                [working_array[j], working_array[k]] = [working_array[k], working_array[j]];
                j += 1;
            }
            color_range(working_array, start, j - 1, 0, 0, 255)
            color_range(working_array, j, k, 255, 0, 0);
            frames.push(copy_array(working_array));
        }
        [working_array[j], working_array[pivot]] = [working_array[pivot], working_array[j]];
        frames.push(copy_array(working_array));
        color_range(working_array, start, end, 0, 0, 0);
        return j;
    }
    quicksort(0, working_array.length - 1);
    frames.push(working_array);
    var legend = [["Quicksort Legend", 0, 0, 0], ["Current Partition", 0, 150, 0], ["Pivot", 0, 255, 0], ["Items in partition less than Pivot", 0, 0, 255], ["Items in partition greater than or equal to Pivot", 255, 0, 0]];
    return [frames, legend];
}