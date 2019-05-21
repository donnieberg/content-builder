export function cloneObject(obj) {
  return Object.assign({}, obj);
}

export function getAssistiveText(cmpType, region, index, numCmpsInRegion, action) {
  return (`
    ${cmpType} ${action}, 
    in ${region}. 
    Current position ${index + 1} of ${numCmpsInRegion}.
  `);
}

export function getNewIndex(arr, currIndex, operation) {
  let newIndex = currIndex;
  if (operation === 'add') {
    newIndex++;
    if (newIndex > arr.length - 1) newIndex = arr.length - 1;
  } else if (operation === 'sub') {
    newIndex--;
    if (newIndex < 0) newIndex = 0;
  }
  return newIndex;
}

export function getObjectbyKey(obj, key, val) {
  return obj.find(el => el[key] === val);
}
