import json, os, numpy as np
from rembg import remove, new_session
from PIL import Image
from scipy import ndimage as nd
fs=json.load(open('ordem.json'))
GR={'Corinthians_branca':(0,1),'Corinthians_preta_listrada':(5,6),'Palmeiras_branca':(10,11),'Flamengo_branca':(15,16),'Santos_listrada':(20,21),'Sao_Paulo_branca':(26,27)}
s=new_session('isnet-general-use'); S=1200; FIT=0.88
def mascara(im,cor=True):
    a=np.array(remove(im,session=s,only_mask=True,post_process_mask=True)).astype(float)/255
    rgb=np.array(im).astype(float)
    # buracos internos que são roupa (listras) -> preencher; depois retirar o que é fundo
    cheio=nd.binary_fill_holes(a>0.12)
    a=np.where(cheio,np.maximum(a,1.0*(a>0.12)),a); a=np.where(cheio,np.where(a>0.12,a,1.0),a)
    # modelo do fundo (gradiente do estúdio) a partir dos pixels certamente fundo
    bgm=(a<0.05).astype(float); sig=40
    num=np.stack([nd.gaussian_filter(rgb[...,c]*bgm,sig) for c in range(3)],-1); den=nd.gaussian_filter(bgm,sig)[...,None]+1e-6
    bg=num/den
    lum=rgb.mean(-1); blum=bg.mean(-1); sat=rgb.max(-1)-rgb.min(-1)
    d=np.abs(rgb-bg).max(-1)
    cand=(a>0.05)&(sat<14)&(d<16) | (a>0.05)&(sat<12)&(lum<blum)&(lum>blum-38)&(lum>42)
    if not cor: cand=np.zeros_like(cand)
    lab,n=nd.label(cand); 
    tam=nd.sum(cand,lab,range(1,n+1)); medl=nd.mean(lum,lab,range(1,n+1))
    ok=np.zeros(n+1,bool)
    for k in range(n):
        if tam[k]>250 and medl[k]>42: ok[k+1]=True
    fundo=ok[lab]
    fundo=nd.binary_opening(fundo,iterations=1)
    a=np.where(fundo,0.0,a)
    a=nd.gaussian_filter(a,0.7)
    return np.clip(a,0,1)
def recorte(i):
    im=Image.open('zip/'+fs[i]).convert('RGB')
    a=mascara(im, i not in (10,11)); A=Image.fromarray((a*255).astype('uint8'))
    o=im.convert('RGBA'); o.putalpha(A)
    rows=(a>0.2).sum(1); W=rows.max(); ys=np.where(rows>0)[0]; bot=ys[-1]
    while bot>ys[0] and rows[bot]<0.12*W: bot-=1
    bb=A.point(lambda v:255 if v>20 else 0).getbbox(); o=o.crop((bb[0],bb[1],bb[2],min(bb[3],bot+6)))
    sc=min(S*FIT/o.width,S*FIT/o.height); o=o.resize((round(o.width*sc),round(o.height*sc)),Image.LANCZOS)
    c=Image.new('RGBA',(S,S),(0,0,0,0)); c.paste(o,((S-o.width)//2,(S-o.height)//2),o); return c
import sys
for nome,(f,b) in GR.items():
    if len(sys.argv)>1 and nome not in sys.argv[1:]: continue
    recorte(f).save(f'saida/{nome}/frente.png',optimize=True); recorte(b).save(f'saida/{nome}/costas.png',optimize=True); print(nome,flush=True)
