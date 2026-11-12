import json, re, os, shutil, sys
D='_projeto/fonte/'
SITE_URL=os.environ.get('SITE_URL','')  # ex.: https://usuario.github.io/rk-sportstyle/
dados=json.load(open('dados_vivos.json'))
for p in dados['produtos']:
    for k,v in (('nome',''),('oculto',False),('novidade',False),('criado',None)): p.setdefault(k,v)
c=dados['config']
if not c.get('urlSite'): c['urlSite']='https://claude.ai/artifact/GAWRuRaRkDgyb19rp49HPZ'

def css_compat(css):
    # inset -> top/right/bottom/left (Safari < 14.1)
    def ins(m):
        v=m.group(1).split(); v=(v*4)[:4] if len(v)==1 else (v+v)[:4] if len(v)==2 else v+[v[1]] if len(v)==3 else v
        return 'top: %s; right: %s; bottom: %s; left: %s;'%tuple(v)
    css=re.sub(r'(?<![-\w])inset:\s*([^;}]+?)\s*;', ins, css)
    # clamp() -> valor mínimo antes (Safari < 13.1)
    def decl(m):
        prop,val=m.group(1),m.group(2)
        if 'clamp(' not in val: return m.group(0)
        fb=re.sub(r'clamp\(\s*([^,]+?)\s*,[^;]*?\)(?=[\s;]|$)', lambda k:k.group(1), val)
        fb=re.sub(r'clamp\(\s*([^,]+?)\s*,.*', lambda k:k.group(1), fb) if 'clamp(' in fb else fb
        return '%s: %s; %s: %s;'%(prop,fb,prop,val)
    css=re.sub(r'([a-z-]+)\s*:\s*([^;{}]*clamp\([^;{}]*)\s*;', decl, css)
    # separa listas de seletores com :focus-visible / :has() (um seletor desconhecido invalida a regra inteira)
    def sep(m):
        sels,body=m.group(1),m.group(2)
        parts=[s.strip() for s in sels.split(',')]
        risk=[s for s in parts if ':focus-visible' in s or ':has(' in s]
        safe=[s for s in parts if s not in risk]
        if not risk or not safe or len(parts)<2: return m.group(0)
        return ', '.join(safe)+' {'+body+'}\n'+'\n'.join(s+' {'+body+'}' for s in risk)
    css=re.sub(r'(?m)^([^@{}\n][^{}\n]*)\{([^{}]*)\}', sep, css)
    return css

css=css_compat(open(D+'base.css').read()+'\n'+open(D+'casa.css').read()+'\n'+open('docs.css').read()+'\n'+open('painel.css').read())+'\n'+open(D+'compat.css').read()+'\n'+css_compat(open(D+'claro.css').read()+'\n'+open(D+'hero.css').read())
open(D+'app.css','w').write(css)

def montar(base):
    tpl=open(D+'index.template.html').read().replace('%%BASE%%',base)
    js=json.dumps(dados,ensure_ascii=False,separators=(',',':')).replace('<','\\u003c').replace('\u2028','\\u2028').replace('\u2029','\\u2029')
    html=tpl.replace('/*RK_DADOS*/',js,1)
    src=open(D+'app.src.js').read(); assert '/*RK_TEMPLATE*/""' in src
    app=src.replace('/*RK_TEMPLATE*/""',json.dumps(tpl,ensure_ascii=False).replace('\u2028','\\u2028').replace('\u2029','\\u2029').replace('</','<\\/'),1)
    return html,app
html,app=montar('')
open(D+'index.html','w').write(html); open(D+'app.js','w').write(app)

# site independente
S='site/'
if '--site' in sys.argv:
    os.makedirs(S,exist_ok=True)
    html,app=montar(SITE_URL)
    SEG=('<meta name="rk-site" content="1">\n'
         '<meta http-equiv="Content-Security-Policy" content="default-src \'self\'; script-src \'self\'; style-src \'self\' \'unsafe-inline\'; img-src \'self\' data: blob:; font-src \'self\'; connect-src \'self\' https://api.github.com; object-src \'none\'; base-uri \'self\'; form-action \'self\'; frame-src \'none\'; manifest-src \'self\'; upgrade-insecure-requests">\n'
         '<meta name="referrer" content="strict-origin-when-cross-origin">\n')
    assert '<meta charset="utf-8">' in html
    html=html.replace('<meta charset="utf-8">','<meta charset="utf-8">\n'+SEG,1)
    open(S+'index.html','w').write(html); open(S+'app.js','w').write(app); open(S+'app.css','w').write(css)
    for d in ('fonts','img'):
        if os.path.exists(S+d): shutil.rmtree(S+d)
        shutil.copytree(D+d,S+d)
    shutil.copytree('jpg/c',S+'img/c',dirs_exist_ok=True); shutil.copytree('jpg/s',S+'img/s',dirs_exist_ok=True); shutil.copytree('jpg/x',S+'img',dirs_exist_ok=True); shutil.copytree('jpg/e',S+'img/e',dirs_exist_ok=True)
    open(S+'.nojekyll','w').write('')
    open(S+'robots.txt','w').write('User-agent: *\nAllow: /\n')
    open(S+'404.html','w').write('<!DOCTYPE html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>RK Sport Style</title><meta http-equiv="refresh" content="0; url=./"></head><body style="background:#fff;color:#0b0b0c;font-family:sans-serif;padding:24px"><a href="./" style="color:#0b0b0c">Ir para o catálogo RK Sport Style</a></body></html>')
print(len(dados['produtos']),'produtos; css',len(css))
