const utils ={};


utils.flaggedUsers = [];

utils.style = {
    car:{color:'grey',text:'🚗'},
    fish:{color:'yellow',text:'🐟'},
    tree:{color:'green',text:'🌳'},
    house:{color:'red',text:'🏡'},
    bicycle:{color:'cyan',text:'🚲'},
    guitar:{color:'brown',text:'🎸'},
    pencil:{color:'gold',text:'✏️'},
    clock:{color:'blue',text:'🕑'}
}

utils.formatPercent=(n)=>{
    
    return (n*100).toFixed(2)+"%";
}

utils.printProgress = (count, max) =>{

    process.stdout.clearLine(); 
    process.stdout.cursorTo(0);
    const percent = utils.formatPercent(
        count/max
    );

    process.stdout.write(count+"/"+ max+ " ("+percent+")");


}

utils.groupBy = (objArray, key) =>{

    const groups = {};
    for (let obj of objArray){
        const val = obj [key];
        if (groups[val] == null){
            groups[val] = [];
        }
        groups[val].push(obj);
    }
    return groups;
}

if (typeof module !== 'undefined'){
    module.exports= utils;
}

utils.getNearest=(loc,points, k=1)=>{

    const obj=points.map((val,ind)=>{
        return (ind,val);
    });

    const sorted = obj.sort((a,b)=>{
        return utils.distance(loc,a.val)-utils.distance(loc,b.val);
    });

    const indices=sorted.map((obj)=>obj.ind);

    return indices.slice(0,k);


    // let minDist=Number.MAX_SAFE_INTEGER;
    // let nearestIndex=0;
 
    // for(let i=0;i<points.length;i++){
    //    const point=points[i];
    //    const d=utils.distance(loc,point);
 
    //    if(d<minDist){
    //       minDist=d;
    //       nearestIndex=i;
    //    }
    // }
    // return nearestIndex;
 }


 utils.distance=(p1,p2)=>{
    return Math.sqrt(
       (p1[0]-p2[0])**2+
       (p1[1]-p2[1])**2
    );
 }

 utils.invLerp=(a,b,v)=>{
    return (v-a)/(b-a);
 }

 utils.normalizePoints=(point, minMax )=>{
    let min,max;
    const dimensions = point[0].length;
    if (minMax){
        min = minMax.min;
        max = minMax.max;
    }
    else{
        min = [...point[0]];
        max = [...point[0]];
        for (let i=1;i<point.length;i++){
            for (let j=0;j<dimensions;j++){
                min[j] = Math.min(min[j], point[i][j]);
                max[j] = Math.max(max[j], point[i][j]);
            }
        }
    }

    for(let i=0;i<point.length;i++){
        for(let j=0;j<dimensions;j++){
            point[i][j] = utils.invLerp(min[j], max[j], point[i][j]);
        }
    }

    return {min,max};

 }