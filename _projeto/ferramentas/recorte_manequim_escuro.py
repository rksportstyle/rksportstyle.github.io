import json,numpy as np
from rembg import remove,new_session
from PIL import Image
from scipy import ndimage as nd
fs=json.load(open('ordem.json')); s=new_session('isnet-general-use')
im=Image.open('zip/'+fs[10]).convert('RGB'); rgb=np.array(im).astype(int)
a=np.array(remove(im,session=s,only_mask=True,post_process_mask=True)).astype(float)/255
lum=rgb.mean(-1); sat=rgb.max(-1)-rgb.min(-1)
manequim=(lum<110)&(sat<32)
manequim=nd.binary_opening(manequim,iterations=2)
camisa=(a>0.3)&~manequim
ab=nd.binary_opening(camisa,structure=np.ones((3,3)),iterations=6)
lab,n=nd.label(ab); tam=nd.sum(ab,lab,range(1,n+1)); maior=lab==(np.argmax(tam)+1)
maior=nd.binary_dilation(maior,iterations=7)&camisa
cheio=nd.binary_fill_holes(maior)   # etiquetas e detalhes escuros dentro da camisa voltam
al=np.where(cheio,np.where(manequim&~cheio,0,np.maximum(a,cheio*1.0)),0)
# borda suave
al=nd.gaussian_filter(al.astype(float),0.8)*cheio.astype(float)+nd.gaussian_filter(al.astype(float),0.8)*(~cheio)
al=np.clip(al,0,1)
o=im.convert('RGBA'); o.putalpha(Image.fromarray((al*255).astype('uint8')))
bb=o.getchannel('A').point(lambda v:255 if v>20 else 0).getbbox(); o=o.crop(bb)
S=1200;FIT=0.88;sc=min(S*FIT/o.width,S*FIT/o.height);o=o.resize((round(o.width*sc),round(o.height*sc)),Image.LANCZOS)
c=Image.new('RGBA',(S,S),(0,0,0,0));c.paste(o,((S-o.width)//2,(S-o.height)//2),o);c.save('teste_palm_frente.png')
bg=Image.new('RGBA',c.size,(0,200,80,255));bg.alpha_composite(c);bg.convert('RGB').resize((700,700)).save('teste_palm.jpg')
