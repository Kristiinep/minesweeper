#!/usr/bin/python
# -*- coding: iso-8859-1 -*-
# -*- coding: utf-8 -*-
import cgi,cgitb,sys, json, os
import random, webbrowser
cgitb.enable(format="text")


print "Content-type: text/html"
print


scorefile="names.txt"
template="index.html"


formatdata = cgi.FieldStorage()
inmethod = os.environ['REQUEST_METHOD']
if inmethod =="POST":
    if formatdata.has_key("pname"):
        f = open(scorefile, "w")
        names = formatdata["pname"].value
        f.write(names)
        print (names)
        f.close()
    else:
        print "dont know"
print "not good"