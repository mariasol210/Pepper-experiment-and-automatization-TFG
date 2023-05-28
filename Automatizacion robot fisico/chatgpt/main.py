from fastapi import FastAPI
from HeyChatGPT import get_response
app = FastAPI()

previous_Q_and_A = []

@app.get("/pepper-chatgpt")
def get_AI_response(question: str):
  response = get_response(previous_Q_and_A, question)

  # add the new question and answer to the list of previous questions and answers
  previous_Q_and_A.append((question, response))

  return {response}

@app.get("/pepper-chatgpt-history")
def get_history():
  return previous_Q_and_A