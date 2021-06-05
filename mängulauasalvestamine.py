#!/usr/bin/python
# -*- coding: iso-8859-1 -*-
# -*- coding: utf-8 -*-
import cgi,cgitb,sys, json, os
import random, webbrowser
cgitb.enable(format="text")


print "Content-type: text/html"
print


scorefile="skoor.txt"
template="index.html"


formatdata = cgi.FieldStorage()
inmethod = os.environ['REQUEST_METHOD']
if inmethod =="POST":
    f = open(scorefile, "a")
    if formatdata.has_key("name"):
        getName = formatdata["name"].value
        f.write(getName + " ")
    else:
        print "puudu"
    if formatdata.has_key("movesmade"):
        getMoves = formatdata["movesmade"].value
        f.write(getMoves + " ")
    else:
        print "Puudub"
    if formatdata.has_key("boardsize"):
        getBoardSize = formatdata["boardsize"].value
        f.write(getBoardSize + " ")
    else:
        print "Puudub"
    if formatdata.has_key("numberofbombs"):
        getNumberOfBombs = formatdata["numberofbombs"].value
        f.write(getNumberOfBombs + " ")
    else:
        print "Puudub"
    if formatdata.has_key("board"):
        getIsWinner = formatdata["board"].value
        f.write(getIsWinner + " ")
    f.close()

f = open(scorefile, "r")
for rida in f:
    values = rida.split(" ")


f.close()