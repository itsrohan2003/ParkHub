from turfpy.measurement import boolean_point_in_polygon
from geojson import Polygon, Point, Feature

# Define the polygon representing your geofenced area using GeoJSON format.
geofence_polygon = Polygon([[
    (-77.090, 38.881),
    (-77.038, 38.889),
    (-77.032, 38.895),
    # Add more coordinates to complete the polygon.
    (-77.090, 38.881)
]])

# Define the user's location as a point (latitude and longitude) using GeoJSON format.
user_location = Point((-77.058, 38.889))

# Check if the user's location is inside the geofence.
is_inside = boolean_point_in_polygon(user_location, geofence_polygon)

if is_inside:
    print('User is inside the geofenced area.')
    # You can trigger actions or notifications here.
else:
    print('User is outside the geofenced area.')
