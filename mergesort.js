function run_mergesort(original_array){
    var working_array = copy_array(original_array);
    var frames = [copy_array(working_array)];
    function mergesort(start, end){
        console.log(start, end);
        if (start == end){
            return working_array[start]
        } else {
            var midpoint = Math.floor((start + end) / 2);
            mergesort(start, midpoint);
            mergesort(midpoint + 1, end);
            color_range(working_array, start, midpoint, 255, 0, 0);
            color_range(working_array, midpoint + 1, end, 0, 0, 255);
            frames.push(copy_array(working_array));
            var arr = [];
            var k = start;
            var j = midpoint + 1;
            while (k <= midpoint && j <= end){
                var kval, kr, kg, kb;
                [kval, kr, kg, kb] = working_array[k];
                var jval, jr, jg, jb;
                [jval, jr, jg, jb] = working_array[j];
                if(kval <= jval){
                    arr.push(working_array[k]);
                    k += 1;                    
                } else {
                    arr.push(working_array[j]); 
                    j += 1;                                       
                }
            }
            while (k <= midpoint){
                arr.push(working_array[k]);
                k += 1;
            }
            while (j <= end){
                arr.push(working_array[j]);
                j += 1;
            }
            var j = 0;
            for (var k = start; k <= end; k++){
                working_array[k] = arr[j];
                color_index(working_array, k, 0, 255, 0);
                frames.push(copy_array(working_array));
                j += 1;
            }
            color_range(working_array, start, end, 0, 0, 0);
            frames.push(copy_array(working_array));
        }
    }
    mergesort(0, working_array.length - 1);
    console.log("done");
    console.log(frames.length);
    return frames;
}