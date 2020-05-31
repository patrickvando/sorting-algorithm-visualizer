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
            color_index(working_array, k, 255, 0, 0);
            color_index(working_array, k - 1, 0, 0, 255);
            frames.push(copy_array(working_array));
            if(kval < pval){
                [working_array[k], working_array[k - 1]] = [working_array[k - 1], working_array[k]];
                color_index(working_array, k, 0, 0, 255);
                color_index(working_array, k - 1, 255, 0, 0);
                frames.push(copy_array(working_array));
                swaps += 1;               
            }
            color_index(working_array, k, 0, 0, 0);
            color_index(working_array, k - 1, 0, 0, 0);
        }
        if(swaps == 0){
            run = false;
        }
    }
    color_range(working_array, 0, working_array.length - 1, 0, 0, 0);
    frames.push(copy_array(working_array));    
    return frames;
}