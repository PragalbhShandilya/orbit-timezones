/* Pure clock rules shared by the app and repeatable tests. */
const OrbitClock = {
 timeAt(zone,date=new Date(),locale){return new Intl.DateTimeFormat(locale,{timeZone:zone,hour:'numeric',minute:'2-digit'}).format(date)},
 offsetAt(zone,date=new Date()){
  const p=Object.fromEntries(new Intl.DateTimeFormat('en-US',{timeZone:zone,year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'}).formatToParts(date).map(p=>[p.type,p.value]));
  return (Date.UTC(+p.year,+p.month-1,+p.day,+p.hour,+p.minute,+p.second)-Math.floor(date.getTime()/1000)*1000)/3600000;
 },
 differenceAt(target,local,date=new Date()){const h=this.offsetAt(target,date)-this.offsetAt(local,date);return h===0?'Same time as you':`${Math.abs(h)}h ${h>0?'ahead of':'behind'} you`},
 signedDifferenceAt(target,local,date=new Date()){const minutes=Math.round((this.offsetAt(target,date)-this.offsetAt(local,date))*60);if(!minutes)return '±0h';const value=Math.abs(minutes),hours=Math.floor(value/60),remaining=value%60;return (minutes>0?'+':'−')+(hours?hours+'h':'')+(remaining?(hours?' ':'')+remaining+'m':'')},
 dayAt(zone,date=new Date()){return new Intl.DateTimeFormat('en-CA',{timeZone:zone,year:'numeric',month:'2-digit',day:'2-digit'}).format(date)}
};
if(typeof module!=='undefined')module.exports=OrbitClock;
