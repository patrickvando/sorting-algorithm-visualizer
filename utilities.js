function copy_array(arr){
    if(!Array.isArray(arr)){
        return arr;
    } else {
        var new_arr = []
        for(var k = 0; k < arr.length; k++){
            new_arr.push(copy_array(arr[k]));
        }
        return new_arr;
    }
}

function color_index(arr, ind, r, g, b){
    arr[ind] = [arr[ind][0], r, g, b];
}

function color_range(arr, start, end, r, g, b){
    for(var k = start; k <= end; k++){
        color_index(arr, k, r, g, b);
    }
}