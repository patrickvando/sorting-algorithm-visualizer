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
        color_range(working_array, start, end, "#F0F0F0");
        frames.push(copy_array(working_array));
        color_index(working_array, pivot, "#00FF00");
        frames.push(copy_array(working_array));
        var j = start;
        for (var k = start; k < end; k++){
            var val, r, g, b;
            [val, r, g, b] = working_array[k];
            if (val < pval){
                [working_array[j], working_array[k]] = [working_array[k], working_array[j]];
                j += 1;
            }
            color_range(working_array, start, j - 1, "#0000FF")
            color_range(working_array, j, k, "#FF0000");
            frames.push(copy_array(working_array));
        }
        [working_array[j], working_array[pivot]] = [working_array[pivot], working_array[j]];
        frames.push(copy_array(working_array));
        color_range(working_array, start, end, "#000000");
        return j;
    }
    quicksort(0, working_array.length - 1);
    frames.push(working_array);
    var legend = [["Quicksort Legend", "#000000"], ["Current Partition", "#F0F0F0"], ["Pivot", "#00FF00"], ["Items in partition less than Pivot", "#0000FF"], ["Items in partition greater than or equal to Pivot", "#FF0000"]];
    return [frames, legend];
}