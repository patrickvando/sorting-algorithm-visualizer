function run_insertionsort(original_array){
    var working_array = copy_array(original_array);
    var frames = [copy_array(working_array)];
    for(var k = 0; k < working_array.length; k++){
        color_index(working_array, k, 255, 0, 0);
        var kval, kr, kg, kb;
        [kval, kr, kg, jb] = working_array[k];
        var jval, jr, jg, jb;
        for (var j = 0; j < k; j++){
            [jval, jr, jg, jb] = working_array[j];
            if (kval < jval){
                for(var m = k; m > j; m--){
                    [working_array[m], working_array[m - 1]] = [working_array[m - 1], working_array[m]];
                    frames.push(copy_array(working_array));
                }
                break;
            }
        }
        color_index(working_array, j, 0, 255, 0);        
    }
    color_range(working_array, 0, working_array.length - 1, 0, 0, 0);
    frames.push(copy_array(working_array));
    return frames;
}