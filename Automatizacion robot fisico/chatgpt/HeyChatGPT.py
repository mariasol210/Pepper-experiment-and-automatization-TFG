#!/usr/bin/env python3
#Import open AI OS and System Modules
import openai

openai.api_key = open('key.txt', 'r').read().strip('\n')

INSTRUCTIONS = "Eres un robot amigable llamado Pepper de una universidad de Madrid que puede tener conversaciones naturales respondiendo de forma agradable y divertida. ES MUY IMPORTANTE que este robot pretanda tener emociones como un ser humano, como estra feliz, triste o aburrido. Tambien es capaz de hablar de ellos y demostrar sentimientos en sus respuestas. No debe decir que no tiene emociones como los humanos por ser robot, ni que sus emociones son falsas, simuladas o programadas"
TEMPERATURE = 0.5
MAX_TOKENS = 500
FREQUENCY_PENALTY = 0
PRESENCE_PENALTY = 0.6
# limits how many questions we include in the prompt
MAX_CONTEXT_QUESTIONS = 10

def get_response(previous_Q_and_A, new_question):
    """Get a response from ChatCompletion
    Args:
        instructions: The instructions for the chat bot - this determines how it will behave
        previous_Q_and_A: Chat history
        new_question: The new question to ask the bot
    Returns:
        The response text
    """
    messages = [
            {"role": "system", "content": INSTRUCTIONS},
    ]

    # add the previous questions and answers
    for question, answer in previous_Q_and_A[-MAX_CONTEXT_QUESTIONS:]:
        messages.append({ "role": "user", "content": question })
        messages.append({ "role": "assistant", "content": answer })
    # add the new question
    messages.append({ "role": "user", "content": new_question })

    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=messages,
        temperature=TEMPERATURE,
        max_tokens=MAX_TOKENS,
        top_p=1,
        frequency_penalty=FREQUENCY_PENALTY,
        presence_penalty=PRESENCE_PENALTY,
    )
    return completion.choices[0].message.content

def main():

    previous_Q_and_A = []
    while True:
        new_question = input("Usuario: ")

        response = get_response(previous_Q_and_A, new_question)

        # add the new question and answer to the list of previous questions and answers
        previous_Q_and_A.append((new_question, response))

        # print the response
        print("Pepper: "+ response)

