import {getDb} from '@/db';
import {rounds} from '@/db/schema';
import {generate} from '@/lib/sudoku';
import {and,eq,isNull,asc,isNotNull} from 'drizzle-orm';
export async function GET(request:Request){const mode=new URL(request.url).searchParams.get('mode')==='hard'?'hard':'mini';const scores=await getDb().select({name:rounds.name,elapsed:rounds.elapsed,id:rounds.id}).from(rounds).where(and(eq(rounds.mode,mode),isNotNull(rounds.name))).orderBy(asc(rounds.elapsed)).limit(10);return Response.json(scores);}
export async function POST(request:Request){try{const data=await request.json() as Record<string,unknown>;const db=getDb();
 if(data.action==='start'){const mode=data.mode==='hard'?'hard':'mini';const {puzzle,solution}=generate(mode);const id=crypto.randomUUID(),started=Date.now();await db.insert(rounds).values({id,mode,puzzle:JSON.stringify(puzzle),solution:JSON.stringify(solution),started});return Response.json({id,puzzle,started});}
 const round=await db.select().from(rounds).where(eq(rounds.id,String(data.id))).get();if(!round)return Response.json({error:'Rundan hittades inte.'},{status:404});
 if(data.action==='finish'){if(round.finished)return Response.json({elapsed:round.elapsed});if(!Array.isArray(data.board)||JSON.stringify(data.board)!==round.solution)return Response.json({error:'Kontrollera siffrorna. Lösningen stämmer inte ännu.'},{status:400});const finished=Date.now(),elapsed=finished-round.started;await db.update(rounds).set({finished,elapsed}).where(and(eq(rounds.id,round.id),isNull(rounds.finished)));const saved=await db.select().from(rounds).where(eq(rounds.id,round.id)).get();return Response.json({elapsed:saved!.elapsed});}
 if(data.action==='score'){const name=typeof data.name==='string'?data.name.trim():'';if(!round.finished||!name||name.length>24)return Response.json({error:'Skriv ett namn med 1–24 tecken.'},{status:400});await db.update(rounds).set({name}).where(and(eq(rounds.id,round.id),isNull(rounds.name)));return Response.json({ok:true});}
 return Response.json({error:'Ogiltig begäran.'},{status:400});
 }catch{return Response.json({error:'Kunde inte ansluta. Försök igen.'},{status:503});}}
