const OrbitJourney={
 day(point){const p=Object.fromEntries(new Intl.DateTimeFormat('en-US',{timeZone:point.zone||'UTC',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date(point.at*1000)).map(p=>[p.type,p.value]));return `${p.year}-${p.month}-${p.day}`},
 daily(points){const days=new Map();for(const p of [...points].sort((a,b)=>a.at-b.at))days.set(this.day(p),{...p,day:this.day(p)});return [...days.values()].sort((a,b)=>a.at-b.at)},
 project(lon,lat){const phi=Math.max(-80,Math.min(80,lat))*Math.PI/180;return [(lon+180)/360*1000,300-Math.log(Math.tan(Math.PI/4+phi/2))*1000/(2*Math.PI)]},
 segment(a,b,project=this.project){const p=project(a.lon,a.lat),q=project(b.lon,b.lat);let dx=q[0]-p[0];if(Math.abs(dx)<=500)return [[p,q]];const shifted=[q[0]+(dx>0?-1000:1000),q[1]];const edge=dx>0?0:1000;const t=(edge-p[0])/(shifted[0]-p[0]);const y=p[1]+(q[1]-p[1])*t;return [[p,[edge,y]],[[edge===0?1000:0,y],q]]},
 interpolate(a,b,t){let d=b.lon-a.lon;if(d>180)d-=360;if(d< -180)d+=360;return {lon:((a.lon+d*t+540)%360)-180,lat:a.lat+(b.lat-a.lat)*t}}
};
if(typeof module!=='undefined')module.exports=OrbitJourney;
