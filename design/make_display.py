from fontTools.fontBuilder import FontBuilder
from fontTools.pens.ttGlyphPen import TTGlyphPen
from pathlib import Path

out=Path('outputs/atto-portfolio/dist')
glyphs={}; metrics={}; cmap={}
def polygon(p, pts):
    p.moveTo(pts[0])
    for pt in pts[1:]: p.lineTo(pt)
    p.closePath()
def make(char,width,draw):
    p=TTGlyphPen(None); draw(p); glyphs[char]=p.glyph(); metrics[char]=(width+45,0); cmap[ord(char)]=char
def rect(p,x,y,w,h):polygon(p,[(x,y),(x,y+h),(x+w,y+h),(x+w,y)])
def a(p):
    polygon(p,[(0,0),(235,800),(565,800),(800,0),(560,0),(510,180),(290,180),(240,0)])
    polygon(p,[(345,390),(455,390),(400,590)])
make('A',800,a)
make('H',750,lambda p:polygon(p,[(0,0),(0,800),(225,800),(225,510),(525,510),(525,800),(750,800),(750,0),(525,0),(525,290),(225,290),(225,0)]))
make('I',230,lambda p:rect(p,0,0,230,800))
make('L',660,lambda p:polygon(p,[(0,0),(0,800),(230,800),(230,220),(660,220),(660,0)]))
make('N',780,lambda p:polygon(p,[(0,0),(0,800),(230,800),(550,370),(550,800),(780,800),(780,0),(550,0),(230,430),(230,0)]))
def oval(p):
    p.moveTo((420,0));p.qCurveTo((0,0),(0,400));p.qCurveTo((0,800),(420,800));p.qCurveTo((840,800),(840,400));p.qCurveTo((840,0),(420,0));p.closePath()
    p.moveTo((420,230));p.qCurveTo((610,230),(610,400));p.qCurveTo((610,570),(420,570));p.qCurveTo((230,570),(230,400));p.qCurveTo((230,230),(420,230));p.closePath()
make('O',840,oval)
def u(p):
    p.moveTo((0,800));p.lineTo((230,800));p.lineTo((230,340));p.qCurveTo((230,220),(390,220));p.qCurveTo((550,220),(550,340));p.lineTo((550,800));p.lineTo((780,800));p.lineTo((780,340));p.qCurveTo((780,0),(390,0));p.qCurveTo((0,0),(0,340));p.closePath()
make('U',780,u)
make('.',200,lambda p:rect(p,0,0,200,200))
make(' ',260,lambda p:None)
glyphs['.notdef']=TTGlyphPen(None).glyph();metrics['.notdef']=(500,0)
fb=FontBuilder(1000,isTTF=True);fb.setupGlyphOrder(['.notdef']+list(cmap.values()));fb.setupCharacterMap(cmap);fb.setupGlyf(glyphs);fb.setupHorizontalMetrics(metrics);fb.setupHorizontalHeader(ascent=800,descent=-100)
fb.setupNameTable({'familyName':'Hounain Display','styleName':'Black','uniqueFontIdentifier':'HounainDisplay-Black-1','fullName':'Hounain Display Black','psName':'HounainDisplay-Black','version':'Version 1.0'})
fb.setupOS2(sTypoAscender=800,sTypoDescender=-100,usWinAscent=800,usWinDescent=100);fb.setupPost();fb.setupMaxp();fb.font.flavor='woff2';fb.save(out/'hounain-display.woff2')
print('Created Hounain Display: A H I L N O U, period, space')
