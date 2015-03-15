var travelInfo = {
  startJourney: function (start, end) {
    this.userInput.startStation = start;
    this.userInput.endStation = endStation;

    /* Setup stations info: name, line, index */
    getInputstationInfo(start, end);

    /* Setup Value to check both station are in the same line*/
    this.isSameLine = checkLineSame(startStation.line, endStation.line);
    this.haveIntersection = this.findIntersection();
    this.totalStop = noOfStops(this.haveIntersection);
    this.allStopsName = joinStopsName(this.haveIntersection);

  },
  userInput: { startStation: '', endStation: '' },
  
  findIntersection: function() {
    console.log("findIntersection");
    if(this.isSameLine === true) {
      return false;
    } else {
      var startArray = train[startStation.line];
      var endArray = train[endStation.line];
      var array = findLineIntersection(startArray, endArray);
      this.setupIntersection(array);
      return true;
    }
  },
  setupIntersection: function(array) {
    if(array.length > 0) {
        var intarray =[];
        for(var i in array) {
          var fromStartIndex = getTrainStationIndex(array[i], startStation.line);
          var toEndIndex = getTrainStationIndex(array[i], endStation.line);
          var fromStartDirection = lineDirection(startStation.index, fromStartIndex);
          var toEndDirection = lineDirection(endStation.index, toEndIndex);
          var intersectionObject = {
            name: array[i],
            index: { fromStart: fromStartIndex, toEnd: toEndIndex },
            direction: {fromStart: fromStartDirection, toEnd: toEndDirection}
          }
          intarray.push(intersectionObject);
        }
        this.intersection = intarray;
        return this.intersection;
      }
  },
  // allStopsName: [],

}

var startStation = {
  setStation: function(name) {
    this.name = name;
    this.line = findStopLine(name);
    this.index = getTrainStationIndex(name, this.line);
  },
}

var endStation = {
  setStation: function(name) {
    this.name = name;
    this.line = findStopLine(name);
    this.index = getTrainStationIndex(name, this.line);
  },
}


