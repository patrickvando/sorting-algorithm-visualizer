function run_bubblesort(original_array){
    var working_array = copy_array(original_array);
    var frames = [copy_array(working_array)];
    var run = true;
    while(run){
        var swaps = 0;
        for(var k = 1; k < working_array.length; k++){
            var kval, kr, kg, kb;
            [kval, kr, kg, kb] = working_array[k];
            var pval, pr, pg, pb;
            [pval, pr, pg, pb] = working_array[k - 1];
            color_index(working_array, k, "#FF0000");
            color_index(working_array, k - 1, "#0000FF");
            frames.push(copy_array(working_array));
            if(kval < pval){
                [working_array[k], working_array[k - 1]] = [working_array[k - 1], working_array[k]];
                color_index(working_array, k, "#0000FF");
                color_index(working_array, k - 1, "#FF0000");
                frames.push(copy_array(working_array));
                swaps += 1;               
            }
            color_index(working_array, k, "#000000");
            color_index(working_array, k - 1, "#000000");
        }
        if(swaps == 0){
            run = false;
        }
    }
    color_range(working_array, 0, working_array.length - 1, "#000000");
    frames.push(copy_array(working_array)); 
    var legend = [["Bubblesort Legend", "#000000"], ["Left item", "#0000FF"], ["Right item", "#FF0000"]];   
    return [frames, legend];
}