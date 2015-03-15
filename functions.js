/* All global functions */

/* Setup all information for stations object */
var getInputstationInfo = function(start, end) {
  startStation.setStation(start);
  endStation.setStation(end);
}

/* Find Station line. Loop through array to find the match station */
var findStopLine = function(stopName) {
  var objectSize = Object.keys(train).length;

  for(var i = 0 ; i < objectSize; i++) {
    var line = Object.keys(train)[i];
    var lineLength = train[line].length;
    
    var foundLine;
    for (var j = 0; j < lineLength; j++) {
      var stopIndex;
      if(train[line][j] === stopName) {
        stopIndex = train[line].indexOf(stopName);
        foundLine = line;
      } 
    }
  }
  return foundLine;
}

/* get station index to the line it belongs */
var getTrainStationIndex = function(station, lineName) { 
  return train[lineName].indexOf(station);
}

/* Check whether line is the same */
var checkLineSame = function (startLine, endLine) {
  console.log("startLine = " + startLine);
  console.log("endLine = " + endLine);
  var sameLine = (startLine===endLine) ? true : false;
  return sameLine;
}

/* find the line intersection */
var findLineIntersection = function(startLineArray, endLineArray) {
  console.log("I have intersection!");

  var ret = [];
  for(var i in startLineArray) {
      if(endLineArray.indexOf( startLineArray[i] ) > -1){
          ret.push( startLineArray[i] );
      }
  }
  return ret;
}

var sumTotalStops = function() {
  console.log(startStation);
  console.log(endStation);
}

function lineDirection(startIndex, intersectionIndex) {
  var start = startIndex;
  var end = intersectionIndex;
  var direction;
  console.log("start = " + start + "; end = "+ end);

  return (start>end) ? "back" : "forward";
}

function noOfStops(hasIntersection) {
  var startIndex = startStation.index;
  var endIndex = endStation.index;
  

  //var intersectionIndex = intersection
  // console.log("hasIntersection = " + hasIntersection);
  var totalStop;
  // console.log("startIndex = "+ startIndex);
  // console.log("intersectionfromStartIndex = "+ intersectionfromStartIndex);
  // console.log("intersectiontoEndIndex = "+ intersectiontoEndIndex);
  // console.log("endIndex = "+ endIndex);
  
  
  if(hasIntersection){
    var intersectionfromStartIndex = travelInfo.intersection[0].index.fromStart;
    var intersectiontoEndIndex = travelInfo.intersection[0].index.toEnd;
    // console.log("I am going to start counting stops");
    // console.log((startIndex - (intersectionfromStartIndex)));
    // console.log((intersectiontoEndIndex-(endIndex)));

    totalStop = ((startIndex - intersectionfromStartIndex) + Math.abs(intersectiontoEndIndex-endIndex));
  } else {
    totalStop = Math.abs(startIndex - endIndex);
  }
  console.log("totalStop = " + totalStop);
  return totalStop;
}



function lineStopsName (hasIntersection, lineArray, begin) {
  var array = lineArray;
  var sliceBegin = begin;
  var sliceEnd;

  console.log("sliceBegin = "+ sliceBegin);

  if(hasIntersection){ 

    sliceEnd = travelInfo.intersection[0].index.fromStart;
    console.log('sliceBegin = ' + sliceBegin + "; sliceEnd = "+sliceEnd);
    if(sliceEnd > sliceBegin) {
      return array.slice(sliceEnd, sliceBegin);
    } else {
      return array = array.slice(sliceEnd+1, sliceBegin+1);
    }
      
    console.log(array);
  } else {
    sliceEnd = endStation.index;
      return array.slice(sliceBegin+1, sliceEnd+1);
  }

}


function joinStopsName (hasIntersection) {
  var startArray = lineStopsName(hasIntersection, train[startStation.line], startStation.index);
  
  if(hasIntersection) {
    var endArray = lineStopsName(hasIntersection, train[endStation.line], endStation.index);
    
    (travelInfo.intersection[0].direction.fromStart === "back") ? startArray.reverse(): null; 
    startArray.shift(); startArray.push(travelInfo.intersection[0].name);
    //console.log(startArray);
    return startArray.concat(endArray);
  } else {
    return startArray;
  }
}
