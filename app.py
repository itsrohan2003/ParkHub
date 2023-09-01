from flask import Flask
from mqtt import start_mqtt

app = Flask(__name__)

if __name__ == "__main__":
    start_mqtt()  # Start MQTT when the app starts
    app.run(debug=True)
