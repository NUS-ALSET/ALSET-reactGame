class Utils {
  rect2Rect(collective, player) {
    return (
      collective.getBoundingClientRect().left <=
        player.getBoundingClientRect().left +
          player.getBoundingClientRect().width &&
      collective.getBoundingClientRect().left +
        collective.getBoundingClientRect().width >=
        player.getBoundingClientRect().left &&
      collective.getBoundingClientRect().top +
        collective.getBoundingClientRect().height >=
        player.getBoundingClientRect().top &&
      collective.getBoundingClientRect().top <=
        player.getBoundingClientRect().top +
          player.getBoundingClientRect().height
    );
  }
  rect2parent(player, parentEl, direction) {
    var parentOffset = parentEl.getBoundingClientRect();
    var playerOffset = player.getBoundingClientRect();
    var top = playerOffset.top;
    var left = playerOffset.left;
    var right = playerOffset.right;
    var bottom = playerOffset.bottom;
    var parentTop = parentOffset.top;
    var parentLeft = parentOffset.left;
    var parentRight = parentOffset.right;
    var parentBottom = parentOffset.bottom;
    if (direction == 'left') return left <= parentLeft ? false : true;
    else if (direction == 'right') return right >= parentRight ? false : true;
    else if (direction == 'up') return top <= parentTop ? false : true;
    else if (direction == 'down') return bottom >= parentBottom ? false : true;
  }
  rundomGenerateCollectives(min, max, size, width, height) {
    var collectives = [];
    var stonesQuant = Math.floor(Math.random() * (max - min + 1) + min);
    for (var i = 0; i < stonesQuant; i++) {
      var stoneObj = { x: 0, y: 0 };
      stoneObj.x = Math.floor(Math.random() * (width / size - 0) + 0) * size;
      stoneObj.y = Math.floor(Math.random() * (height / size - 0) + 0) * size;
      stoneObj.size = size;
      collectives.push(stoneObj);
    }
  }
  getCommands(world) {
    var player = world.player;
    var closestGem = false;
    world.collectives.forEach(stone => {
      if (closestGem == false) closestGem = stone;
      else if (
        Math.sqrt(
          Math.pow(player.x - closestGem.x, 2) +
            Math.pow(player.y - closestGem.y, 2)
        ) >
        Math.sqrt(
          Math.pow(player.x - stone.x, 2) + Math.pow(player.y - stone.y, 2)
        )
      ) {
        closestGem = stone;
      }
    });
    if (closestGem) {
      if (closestGem.x - player.x > 64) {
        var direction = { left: false, right: true, up: false, down: false };
      } else if (closestGem.x - player.x < 0) {
        var direction = { left: true, right: false, up: false, down: false };
      } else if (closestGem.y - player.y > 64) {
        var direction = { left: false, right: false, up: false, down: true };
      } else if (closestGem.y - player.y < 0) {
        var direction = { left: false, right: false, up: true, down: false };
      }
      return direction;
    }
  }
  getPassengerCommands(world, findPathCallback) {
    var player = world.player;
    var closestPassenger = false;
    if(world.path.length == 0&&!world.passenger){
      world.collectives.forEach(passenger => {
        if (closestPassenger == false)
          closestPassenger = passenger;
        else if (
          Math.sqrt(
            Math.pow(player.x - closestPassenger.x, 2) +
              Math.pow(player.y - closestPassenger.y, 2)
          ) >
          Math.sqrt(
            Math.pow(player.x - passenger.x, 2) + Math.pow(player.y - passenger.y, 2)
          )
        ) {
          closestPassenger = passenger;
        }
      });
      if(closestPassenger){
        console.log(world.path);
        world.path = findPathCallback(closestPassenger);
        console.log(world.path);
      }
    }
    else if(world.path.length == 0&&world.passenger){
      world.path = findPathCallback(world.passenger);
    }
    if(world.path.length>0){
      var point = world.path[world.path.length-1];
      if (point.x - player.x > 15) {
        var direction = { left: false, right: true, up: false, down: false };
      } else if (point.x - player.x < 0) {
        var direction = { left: true, right: false, up: false, down: false };
      } else if (point.y - player.y > 15) {
        var direction = { left: false, right: false, up: false, down: true };
      } else if (point.y - player.y < 0) {
        var direction = { left: false, right: false, up: true, down: false };
      }
      return direction;
    }
  }
  findShortestPath(arr, pointA, pointB){
    var heuristic = function (a,b){
      var x = a.x - b.x;
      var y = a.y - b.y;
      var d = Math.sqrt( x*x + y*y );
      return d;
    }
    var removeFromArray = function(arr,elt){
      for(var i = arr.length-1; i>=0; i--){
        if(arr[i] == elt){
          arr.splice(i,1);
        }
      }
    }
    var cellPointA = arr[Math.floor( (pointA.y)/30 )][Math.floor( (pointA.x)/30 )];
    var cellPointB = arr[Math.floor( (pointB.y)/30 )][Math.floor( (pointB.x)/30 )];

    //console.log(pointA, cellPointA);
    //console.log(pointB, cellPointB);
    var openSet = [];
    var closeSet = [];
    var path = [];
    var current = pointA;
    openSet.push(cellPointA);
    //searching path function started here
    console.log(arr);
    while(openSet.length>0){
      var winner = 0;
      for(var i=0; i < openSet.length; i++){
        if(openSet[i].f < openSet[winner].f){
          winner = i;
        }
      }
      var current = openSet[winner];
      console.log(current);
      
      if(current === cellPointB){
        var temp = current;
        path.push(temp);
        while(temp.previous){
          path.push(temp.previous);
          temp = temp.previous;
        }
        console.log("DONE!");
        return path;
      }
      removeFromArray(openSet,current);
      closeSet.push(current);
      var neighbors = current.neighbors;
      for(var i=0; i < neighbors.length; i++){
        var neighbor = neighbors[i];
        
        if(!closeSet.includes(neighbor) && !neighbor.wall){
          var tempG = current.g+1;
          var newPath = false;
          if(openSet.includes(neighbor)){
            if(tempG<neighbor.g){
              neighbor.g = tempG;
              newPath = true;
            }
          }
          else{
            neighbor.g = tempG;
            newPath = true;
            openSet.push(neighbor);
          }
          if(newPath){
            neighbor.h = heuristic(neighbor, cellPointB);
            neighbor.f = neighbor.g + neighbor.h;
            neighbor.previous = current;
          }
          
        }
      }
    }
  }
}
export default new Utils();
