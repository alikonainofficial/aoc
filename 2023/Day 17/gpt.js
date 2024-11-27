const fs = require('fs');
const readline = require('readline');

PrioQueue = class { //a basic priority queue class with custom metric.
    //(a,b)=>a.prio-b.prio gives a max heap.
    //prio should not be changed after insertion.
    
    //helper functions, not to be used outside
    swap(a,b) { //swap heap[a] and heap[b], then return b
      let tmp = this.heap[a];
      this.heap[a] = this.heap[b];
      this.heap[b] = tmp;
      return b;
    }
    parent(pos) {
      return Math.floor((pos-1)/2);
    }
    higherChild(pos) { //index of the higher child of pos, or null if it has none. if equal, prefers left
      //children are n*2+1, n*2+2
      if (pos >= (this.heap.length-2)/2) return null;
      if (this.cmp(pos*2+1, pos*2+2) < 0) return pos*2+2;
      return pos*2+1;
    }
    cmp(p1,p2) { //compare heap[p1] and heap[p2] with metr
      return this.metr(this.heap[p1],this.heap[p2]);
    }
    
    //main functions
    constructor(metr) {
      if (metr == undefined) metr = (a,b)=>a-b;
      
      this.metr = metr;
      this.heap = [];
    }
    push(item) {
      let itempos = this.heap.length;
      this.heap.push(item);
      
      while (itempos > 0 && this.cmp(itempos,this.parent(itempos)) > 0) {
        itempos = this.swap(itempos,this.parent(itempos));
      }
    }
    pop() {
      this.swap(0,this.heap.length-1);
      let pos = 0;
      let item = this.heap.pop();
      
      while (this.higherChild(pos) && this.cmp(pos,this.higherChild(pos)) < 0) {
        pos = this.swap(pos,this.higherChild(pos));
      }
      return item;
    }
  }
  function d17(inp) {
    // console.log(inp);
    // let inp = document.body.innerText.trim().split("\n");
    //let inp = ["2413432311323","3215453535623","3255245654254","3446585845452","4546657867536","1438598798454","4457876987766","3637877979653","4654967986887","4564679986453","1224686865563","2546548887735","4322674655533"]
    
    let pq = new PrioQueue((a,b)=>b[0]-a[0]);
    pq.push([0,0,0,0]); //dist,y,x,dir
    pq.push([0,0,0,1]); //dir: 0 is horiz, 1 is vert
    let seen = {};
    let ret = 0;
    let gm = (y,x)=>{
      if (y<0 || y>=inp.length || x<0 || x>=inp[y].length) return 1e99;
      return +(inp[y][x]);
    }
    
    while (pq.heap.length>0) {
      let [dist,y,x,dir] = pq.pop();
      //console.log([dist,y,x,dir])
      if (y<0 || y>=inp.length || x<0 || x>=inp[y].length) continue;
      if (seen[y+","+x+","+dir] != undefined) continue;
      seen[y+","+x+","+dir] = dist;
      if (y == inp.length-1 && x == inp[y].length-1) {
        return dist;
      }
      
      let cd;
      if (dir==0) {
        cd = dist;
        for (let i=1;i<=10;i++) {
          cd += gm(y,x+i);
          if (cd>1e90) break;
          if (i<4) continue;
                  pq.push([cd,y,x+i,1]);
        }
        cd = dist;
        for (let i=1;i<=10;i++) {
          cd += gm(y,x-i);
          if (cd>1e90) break;
          if (i<4) continue;
                  pq.push([cd,y,x-i,1]);
        }
      } else if (dir == 1) {
        cd = dist;
        for (let i=1;i<=10;i++) {
          cd += gm(y+i,x);
          if (cd>1e90) break;
          if (i<4) continue;
                  pq.push([cd,y+i,x,0]);
        }
        cd = dist;
        for (let i=1;i<=10;i++) {
          cd += gm(y-i,x);
          if (cd>1e90) break;
          if (i<4) continue;
                  pq.push([cd,y-i,x,0]);
        }
      }
    }
  }


async function processLineByLine() {
    const fileStream = fs.createReadStream('input1_1.txt');
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });

    let pathMatrix = [];

    for await (let line of rl) {
        if(line != ''){
            pathMatrix.push(line.trim());
        }
    }

    console.log(d17(pathMatrix));
    // displayMatrix(pathMatrix);
    // console.log("Total ", total);

}

processLineByLine();

// d17();