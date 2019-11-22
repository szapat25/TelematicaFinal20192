from textblob import TextBlob
import requests
from googletrans import Translator

url = 'https://vaso-rest.herokuapp.com/api/comentarios/'
response = requests.get(url)
#file = open("comments.txt", 'r')
# = file.readlines()
analysis = open("analysis.txt", 'w')
positivecomments = []
negativecomments = []
neutralcomments = []
average = 0
translator = Translator()

def clasifier(polarity, line):
    if polarity > 0:
        positivecomments.append(line.replace("\n", '') + " (" + polarity.__str__() + ")")
    elif polarity < 0:
        negativecomments.append(line.replace("\n", '') + " (" + polarity.__str__() + ")")
    elif polarity == 0:
        neutralcomments.append(line.replace("\n", '') + " (" + polarity.__str__() + ")")

def sentimentAnalysis(line):
    trans = translator.translate(line, dest='en')
    comment = TextBlob(trans.__str__())
    comment.sentiment
    clasifier(comment.sentiment.polarity, line)

def printComments():
    analysis.write("Positive comments\n")
    for comment in positivecomments:
        analysis.write("-> " + comment + "\n")
    analysis.write("\n\nNegative comments\n")
    for comment in negativecomments:
        analysis.write("-> " + comment + "\n")
    analysis.write("\n\nNeutral comments\n")
    for comment in neutralcomments:
        analysis.write("-> " + comment + "\n")
    analysis.write("\n\nProducts' average rating: " + average.__str__())

if response.status_code == 200:
    content = response.content
    sent = content.__str__().split(',')
    i = 0
    calificacion = 0
    contcal = 0.0
    while i < len(sent):
        if sent[i].__contains__("mensaje"):
            mensaje = sent[i].split(':')
            sentimentAnalysis(mensaje[1].replace('"', '').replace('}', '').replace(']', ''))
            i = i + 1
        elif sent[i].__contains__("calificacion"):
            ratings = sent[i].split(':')
            calificacion = calificacion + float(ratings[1].replace('"', ''))
            i = i + 1
            contcal = contcal + 1
        else:
            i = i + 1

average = calificacion / contcal
printComments()
analysis.close()