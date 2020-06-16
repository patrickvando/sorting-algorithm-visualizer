function run_selectionsort(original_array){
    var working_array = copy_array(original_array);
    var frames = [copy_array(working_array)];
    for (var k = 0; k < working_array.length; k++){
        var min = k;
        var minval, mr, mg, mb;
        [minval, mr, mg, mb] = working_array[min];
        color_index(working_array, min, "#FF0000")
        for (var j = k + 1; j < working_array.length; j++){
            var jval, jr, jg, jb;
            [jval, jr, jg, jb] = working_array[j];
            if(jval < minval){
                color_index(working_array, min, "#000000");
                min = j;
                [minval, mr, mg, mb] = working_array[min];              
            }
            color_index(working_array, j, "#0000FF");
            color_index(working_array, min, "#FF0000")
            frames.push(copy_array(working_array));
            color_index(working_array, j, "#000000");
            color_index(working_array, min, "#FF0000")
        }
        [working_array[min], working_array[k]] = [working_array[k], working_array[min]];
        color_index(working_array, k, "#00FF00");
    }
    color_range(working_array, 0, working_array.length - 1, "#000000");
    frames.push(copy_array(working_array));
    var legend = [["Selection Sort Legend", "#000000"], ["Current item", "#0000FF"], ["Current minimum among unsorted items", "#FF0000"], ["Sorted Items", "#00FF00"]]
    return [frames, legend];
}