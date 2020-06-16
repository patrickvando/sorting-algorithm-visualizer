var c1 = [];
var c2 = [];
var c3 = [];
var c4 = [];

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

function color_index(arr, ind, color){
    arr[ind] = [arr[ind][0], color];
}

function color_range(arr, start, end, color){
    for(var k = start; k <= end; k++){
        color_index(arr, k, color);
    }
}