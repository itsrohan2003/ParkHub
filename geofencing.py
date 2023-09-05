import json

def is_inside_geofence(geojson_data):
  """
  This function checks if the user's location is inside the geofence.

  Args:
    geojson_data: The GeoJSON data representing the geofence.

  Returns:
    A boolean value indicating whether the user's location is inside the geofence.
  """

  # Parse the GeoJSON data.
  geofence = json.loads(geojson_data)

  # Get the user's location.
  user_location = geofence['features'][0]['geometry']['coordinates']

  # Check if the user's location is inside the geofence.
  is_inside = boolean_point_in_polygon(user_location, geofence['geometry'])

  return is_inside

if __name__ == '__main__':
  # Receive the GeoJSON data from the server.
  geojson_data = input()

  # Check if the user's location is inside the geofence.
  is_inside = is_inside_geofence(geojson_data)

  # Print the result.
  if is_inside:
    print('User is inside the geofenced area.')
  else:
    print('User is outside the geofenced area.')