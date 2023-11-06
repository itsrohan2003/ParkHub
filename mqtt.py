import paho.mqtt.client as mqtt

MQTT_BROKER_HOST = "mqtt-dashboard.com"
MQTT_BROKER_PORT = 1883  # Use the Websocket port, which is typically 8000
TOPIC = "public/hivemqtt/testtopic/#"  # Replace with the actual topic you want to subscribe to
CLIENT_ID = "clientId-wehrirxS8q"  # Your client ID

client = mqtt.Client(client_id=CLIENT_ID)  # Set the client ID

def on_connect(client, userdata, flags, rc):
    print("Connected to MQTT broker with result code " + str(rc))
    client.subscribe(TOPIC)

def on_message(client, userdata, msg):
    print("Received message: " + msg.payload.decode())

client.on_connect = on_connect
client.on_message = on_message

def start_mqtt():
    client.connect(MQTT_BROKER_HOST, MQTT_BROKER_PORT, 60)
    client.loop_start()
