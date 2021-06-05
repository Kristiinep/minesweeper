#!/usr/bin/python
# -*- coding: iso-8859-1 -*-
import cgi,cgitb,sys, json
import random
cgitb.enable()


print "Content-type: text/plain"
print

print "tere tali!"

scorefile="skoor.txt"
#template="index.html"
formatdata = cgi.FieldStorage()

getName = formatdata["name"].value
getMoves = formatdata["movesmade"].value
getNumberOfBombs = formatdata["numberofbombs"].value
getBoardSize = formatdata["boardsize"].value
getIsWinner = formatdata["winner"].value
f = open(scorefile, "a")
f.write(getName)
f.write(getMoves)
f.write(getBoardSize)
f.write(getNumberOfBombs)
f.close()
f = open(scorefile)
for rida in f:
    print(rida)
f.close()

print "lol"


"""
def main():
    inmethod = os.environ['REQUESTI_METHOD']
    if inmethod =="GET":
        formatdata = cgi.FieldStorage()
        if formatdata.has_key("voitja") and formatdata["voitja"].value=="kuva":
            show()
        else:
            store()
    else:
        #POST
        storeboard()

def storeboard():
    indata=sys.stdin.read()
    data=json.loads(indata)
    fname="/home/krparn/fetch"+data["player"]+"_game.txt"
    f=open(fname,"w")
    f.write(json.dumps(data["board"]))
    f.close()
    print"ok"

#def show():
"""