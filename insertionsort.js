function run_insertionsort(original_array){
    var working_array = copy_array(original_array);
    var frames = [copy_array(working_array)];
    for(var k = 0; k < working_array.length; k++){
        color_index(working_array, k, "#FF0000");
        var kval, kr, kg, kb;
        [kval, kr, kg, jb] = working_array[k];
        var jval, jr, jg, jb;
        for (var j = 0; j < k; j++){
            [jval, jr, jg, jb] = working_array[j];
            color_range(working_array, 0, j, "#0000FF");
            frames.push(copy_array(working_array));
            if (kval < jval){
                frames.pop()
                color_index(working_array, j, "#00FF00");
                for(var m = k; m > j; m--){
                    [working_array[m], working_array[m - 1]] = [working_array[m - 1], working_array[m]];
                    frames.push(copy_array(working_array));
                }
                break;
            }
        }
        color_range(working_array, 0, k, "#00FF00");
        frames.push(copy_array(working_array));
    }
    color_range(working_array, 0, working_array.length - 1, "#000000");
    frames.push(copy_array(working_array));
    var legend = [["Insertion Sort Legend", "#000000"], ["Target item", "#FF0000"], ["Items less than or equal to target item", "#0000FF"], ["Sorted items", "#00FF00"]];
    return [frames, legend];
}