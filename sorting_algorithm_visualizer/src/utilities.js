const color1 = "#FF0000";
const color2 = "#008000";
const color3 = "#0000FF";
const color4 = "#8B4513";
const color5 = "#000000";
const color6 = "#FFFFFF";
const color7 = "#010101";
const color8 = "#800080";

export function copyArray(arr){
    if(!Array.isArray(arr)){
        return arr;
    } else {
        let newArr = []
        for(let k = 0; k < arr.length; k++){
            newArr.push(copyArray(arr[k]));
        }
        return newArr;
    }
}

export function colorIndex(arr, ind, color){
    arr[ind] = [arr[ind][0], color];
}

export function colorRange(arr, start, end, color){
    for(let k = start; k <= end; k++){
        colorIndex(arr, k, color);
    }
}

export {color1, color2, color3, color4, color5, color6, color7, color8};