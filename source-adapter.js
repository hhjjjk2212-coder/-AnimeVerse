/** Legal provider adapter contract. Implement only for providers you are authorized to access. */
export class AnimeSourceAdapter {
  constructor(info){ this.info=info; }
  async searchAnime(_query){ throw new Error('Not implemented'); }
  async getAnimeDetails(_id){ throw new Error('Not implemented'); }
  async getEpisodes(_id){ throw new Error('Not implemented'); }
  async getStreamingSources(_episodeId){ throw new Error('Not implemented'); }
  async getSubtitles(_episodeId){ throw new Error('Not implemented'); }
}

export class DemoLegalSourceAdapter extends AnimeSourceAdapter {
  constructor(data){ super({id:'demo-legal',name:'Demo / Legal Source',languages:['en','my'],subtitleTypes:['srt','vtt'],authorized:true}); this.data=data; }
  async searchAnime(query){ const q=String(query||'').toLowerCase(); return this.data.filter(a=>(a.title+' '+a.alt+' '+a.genres.join(' ')).toLowerCase().includes(q)); }
  async getAnimeDetails(id){ return this.data.find(a=>a.id===id)||null; }
  async getEpisodes(id){ const a=await this.getAnimeDetails(id); return a?Array.from({length:a.eps},(_,i)=>({id:`${id}-${i+1}`,animeId:id,number:i+1})):[]; }
  async getStreamingSources(episodeId){ return [{type:'video/mp4',url:'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',quality:'Demo',authorized:true,episodeId}]; }
  async getSubtitles(_episodeId){ return []; }
}
