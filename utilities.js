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