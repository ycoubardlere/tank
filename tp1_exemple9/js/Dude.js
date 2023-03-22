export default class Dude {
    constructor(dudeMesh, speed) {
        this.dudeMesh = dudeMesh;
        this.speed = speed || 1;
  
        // attach the instance to the mesh itself
        dudeMesh.Dude = this;
  
        // initialize the starting position and direction
        this.startPos = dudeMesh.position.clone();
        this.direction = new BABYLON.Vector3(1, 0, 0); // start by moving to the right
        this.distTraveled = 0; // distance traveled along current line segment
        this.lineLength = 100; // length of each line segment
        this.lineCount = 0; // number of lines traveled
        this.dudeMesh.rotation.y = -Math.PI / 2;
        console.log("Dude rotation set to: ", this.dudeMesh.rotation.y);

    }
  
    move() {
        // update the direction of movement when the distance traveled along the current segment is greater than or equal to the segment length
        if (this.distTraveled >= this.lineLength) {
            this.distTraveled = 0;
            this.lineCount++;
            // update the direction and rotation based on the current line count
            switch (this.lineCount % 4) {
                case 0: // move to the right
                    this.direction = new BABYLON.Vector3(1, 0, 0);
                    this.dudeMesh.rotation.y = -Math.PI / 2;
                    console.log("Dude rotation set to: ", this.dudeMesh.rotation.y);
                    break;
                case 1: // move down
                    this.direction = new BABYLON.Vector3(0, 0, 1);
                    this.dudeMesh.rotation.y = Math.PI;
                    console.log("Dude rotation set to: ", this.dudeMesh.rotation.y);
                    break;
                case 2: // move to the left
                    this.direction = new BABYLON.Vector3(-1, 0, 0);
                    this.dudeMesh.rotation.y = Math.PI / 2;
                    console.log("Dude rotation set to: ", this.dudeMesh.rotation.y);
                    break;
                case 3: // move up
                    this.direction = new BABYLON.Vector3(0, 0, -1);
                    this.dudeMesh.rotation.y = 0;
                    console.log("Dude rotation set to: ", this.dudeMesh.rotation.y);
                    break;
              }
      
              // reset the starting position for each line
              this.startPos = this.dudeMesh.position.clone();
        }
      
        // update the position of the dude
        let newPos = this.dudeMesh.position.add(this.direction.multiplyByFloats(this.speed, this.speed, this.speed));
        this.dudeMesh.position.copyFrom(newPos);
      
        // update the distance traveled along the current segment
        this.distTraveled += this.speed;
    }
  }
  

