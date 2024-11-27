const fs = require('fs');
const readline = require('readline');

async function d12(r=1) { 
    const fileStream = fs.createReadStream('input1_2.txt');

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    
    let ret = 0;
    for await (let line of rl) {
      let mapr = line.split(" ")[0];
      let numsr = [...line.matchAll(/\d+/g)].map(x=>+(x[0]));
      let nums = [0];
      let map = ""
      for (let i=0;i<r;i++) {
        map = map + (mapr + "?");
        nums = nums.concat(numsr);
      }
      let counts = [];
      for (let i=0;i<map.length;i++) {
        counts[i] = [];
      }
      //counts[i][j] is amount up to (pos in map) (nums used)
      let c = (mi,ni)=>{
        if (mi == -1 && ni == 0) return 1;
        if (counts[mi]) return counts[mi][ni]??0;
          return 0;
      }
      
      for (let ni=0;ni<nums.length;ni++) {
          for (let mi=0;mi<map.length;mi++) {
          let cur = 0;
          if (map[mi] != '#') cur += c(mi-1,ni);
          if (ni > 0) {
            let docount = true;
            for (let k=1;k<=nums[ni];k++) {
              if (map[mi-k] == '.') docount = false;
            }
            if (map[mi] == '#') docount = false;
            if (docount) cur += c(mi-nums[ni]-1,ni-1);
          }
            counts[mi][ni] = cur;
        }
      }
      //console.log(map,nums,count);
      ret += counts[map.length-1][nums.length-1];
    }
    return ret;
  }
 
  async function solve(){
      const result = await d12(5);
      console.log("Result ", result);
  }

  solve();