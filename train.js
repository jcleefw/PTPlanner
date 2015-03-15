/* Write a JS program that takes the line + stop that a user is getting on at and the line + stop that user is getting off at and prints the total number of stops for the trip. */

/*Hints:

Get your JS program to work for a single line before trying to tackle multiple lines. Consider diagramming the lines by sketching out the train lines and their stops and intersection. Make train lines keys in a hash, while the values are an array of all the stops on each line.

The key to the lab is the intersection of the lines at Richmond.*/

/*Non-Required Bonus:

List the stations on the journey in order of travel
Use input validation
User must enter a line and station in the subway network
If the user enters something else, your program should handle it
Add an additional lines
Allow trains to have multiple intersection points*/




function getTrainStationIndex(station, lineName) { 
  return train[lineName].indexOf(station);
}

function getRichmondStationindex(lineName) {
  return train[lineName].indexOf("Richmond");
}


function noOfStops(startIndex, endIndex, toRichmond) {
  var start = startIndex;
  var end = endIndex;
  var totalStop;
  
  // Based on index no use to detemine whether operation should be + or - because of negative
  if(start > end ) {
    totalStop =  start - end ;
  } else {
    if(!toRichmond) {
      totalStop =  end - start ;
    } else {
      totalStop = (end + start);
    }
  }
  return totalStop;
}

function lineDirection(startIndex, richmondIndex) {
  var start = startIndex;
  var end = richmondIndex;
  var direction;
  console.log("start = " + start + "; end = "+ end);
  if(start > end ) {
    direction = "back";
  } else {
    direction = "forward";
  }
  return direction;
}

function findStopLine(stopName) {
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


function lineStopsName (toRichmond, array, sliceBegin, sliceEnd) {
  var stopsArray;
  console.log('sliceBegin = ' + sliceBegin + "; sliceEnd = "+sliceEnd);
  console.log('toRichmond = ' + toRichmond);

  if(sliceEnd > sliceBegin) {
    console.log("bigger");
    
    if(!toRichmond) {
      console.log('toRichmond = ' + toRichmond);
      return array.slice(sliceBegin+1, sliceEnd+1);
    } else {
      return array.slice(sliceBegin, sliceEnd);
    }
  } else {
    return array.slice(sliceEnd+1, sliceBegin+1);
  }
}

function joinStopsName (toRichmond, startArray, startDirection, endArray, endDirection) {

  console.log(startArray);
  console.log(endArray);
  console.log("startDirection = " + startDirection + " ; endDirection = " + endDirection);

  var start = startArray;
  var end = endArray;
  if(startDirection === "back") {
    start = startArray.reverse();
  }

  if(toRichmond) {
    start.push('Richmond');
    return start.concat(end);
  } else {
    return start;
  }
}

function setStationProperties(station) {
  var stationInfo = {};

  // line it belong
  var line = findStopLine(station);
  // station index of the line it belong
  var stationIndex = getTrainStationIndex(station, line);

  stationInfo.line = line;
  stationInfo.stationIndex = line;

  return stationInfo;
}


function planDestination(start, end){
  console.log("I start from " + start + "; end at " + end);

  console.log(setStationProperties(start));
  // get which line does the stop belongs to
  var startLine = findStopLine(start);
  var endLine = findStopLine(end);

  //get the index of the station of the line it belong to
  var stationStartIndex = getTrainStationIndex(start, startLine);
  var stationEndIndex = getTrainStationIndex(end, endLine);

  // get the index of richmond station where start and end line belongs to
  var startToRichmond = getRichmondStationindex(startLine);
  var endToRichmond = getRichmondStationindex(endLine);

  var goingToRichmond;
  var totalStop;

  var stopFromStart; 
  var stopTilEnd;

  
  var allStops;

  var startDirection;
  var endDirection;
  var startStationArray;
  var endStationArray

  // check whether the line is the same.
  if(startLine === endLine) {
    console.log('They are on the same line');
    console.log("stationStartIndex = " + stationStartIndex + "; stationEndIndex = " + stationEndIndex);
    console.log('startToRichmond =' + startToRichmond);

    // if start and end station is less than Richmond index on the same line
    if (stationStartIndex < startToRichmond && stationEndIndex < endToRichmond || stationStartIndex > startToRichmond && stationEndIndex > endToRichmond) {
      console.log('I am not going through Richmond');
      goingToRichmond = false;
      totalStop = noOfStops(stationStartIndex, stationEndIndex, goingToRichmond);

      startStationArray = lineStopsName(goingToRichmond, train[startLine],stationStartIndex, stationEndIndex);

      allStops = joinStopsName(goingToRichmond, startStationArray, startDirection);

    // get the no of stop from the start and end index incomparison to start & end station
    } else {
      goingToRichmond = true;
      stopFromStart = noOfStops(stationStartIndex, startToRichmond, goingToRichmond);
      stopTilEnd = noOfStops(stationEndIndex, endToRichmond);

      totalStop = stopFromStart + stopTilEnd;

      // get train line direction whether forward or backwards
      startDirection = lineDirection(stationStartIndex, startToRichmond);
      endDirection = lineDirection(stationEndIndex, endToRichmond);

      startStationArray = lineStopsName(goingToRichmond, train[startLine], stationStartIndex, startToRichmond);
      endStationArray = lineStopsName(goingToRichmond, train[endLine], stationEndIndex, endToRichmond);
      allStops = joinStopsName(goingToRichmond, startStationArray, startDirection, endStationArray, endDirection);
    }
  } else { // if line is different
      console.log('I am going through Richmond');
      goingToRichmond = true;

      // get the no of stope from the start and end index incomparison to richmond station
      stopFromStart =  noOfStops(stationStartIndex, startToRichmond, goingToRichmond);
      stopTilEnd = noOfStops(stationEndIndex, endToRichmond, goingToRichmond);

      console.log("stopFromStart = " + stopFromStart + " ; stopTilEnd = " + stopTilEnd);
      // get total no of stops
      totalStop = stopFromStart + stopTilEnd;

      // get train line direction whether forward or backwards
      startDirection = lineDirection(stationStartIndex, startToRichmond);
      endDirection = lineDirection(stationEndIndex, endToRichmond);
      
      // get each line stops from the departure & destination
      startStationArray = lineStopsName(goingToRichmond, train[startLine], stationStartIndex, startToRichmond);
      endStationArray = lineStopsName(goingToRichmond, train[endLine], stationEndIndex, endToRichmond);
      allStops = joinStopsName(goingToRichmond, startStationArray, startDirection, endStationArray, endDirection);
    }

  

  

  
  console.log(allStops);
  //console.log(startStationArray);
  //console.log(endStationArray);

  //console.log(endStationArray.concat(startStationArray));

  //console.log("startLine = " + startLine + "; endLine = " + endLine);
  

  //console.log("startToRichmond = " + startToRichmond + "; endToRichmond = " + endToRichmond);
  

  
  
  
  
  return console.log("You total stop from start to destination is " + totalStop);

}


