export function generate(mode:string) {
 const n=mode==='mini'?6:9, bh=mode==='mini'?2:3, bw=3;
 const shuffle=(a:number[])=>a.sort(()=>Math.random()-.5);
 const nums=shuffle(Array.from({length:n},(_,i)=>i+1));
 const rows=shuffle(Array.from({length:n/bh},(_,i)=>i)).flatMap(g=>shuffle(Array.from({length:bh},(_,i)=>g*bh+i)));
 const cols=shuffle(Array.from({length:n/bw},(_,i)=>i)).flatMap(g=>shuffle(Array.from({length:bw},(_,i)=>g*bw+i)));
 const solution=rows.flatMap(r=>cols.map(c=>nums[(bw*(r%bh)+Math.floor(r/bh)+c)%n]));
 const puzzle=[...solution];
 function count(b:number[]):number { let pos=-1, options:number[]=[];
 for(let i=0;i<n*n;i++)if(!b[i]){const r=Math.floor(i/n),c=i%n;const opts=Array.from({length:n},(_,j)=>j+1).filter(v=>!b.some((x,k)=>x===v&&(Math.floor(k/n)===r||k%n===c||(Math.floor(Math.floor(k/n)/bh)===Math.floor(r/bh)&&Math.floor((k%n)/bw)===Math.floor(c/bw)))));if(!opts.length)return 0;if(pos<0||opts.length<options.length){pos=i;options=opts;}if(opts.length===1)break;}
 if(pos<0)return 1;let total=0;for(const v of options){b[pos]=v;total+=count(b);if(total>1)break;}b[pos]=0;return total;}
 let remaining=n*n;for(const i of shuffle(Array.from({length:n*n},(_,i)=>i))){if(remaining<=(n===6?16:28))break;const old=puzzle[i];puzzle[i]=0;if(count([...puzzle])!==1)puzzle[i]=old;else remaining--;}
 return {puzzle,solution};
}
