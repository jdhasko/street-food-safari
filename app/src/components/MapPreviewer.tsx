import MapView, { Marker } from "react-native-maps";
import { View } from "react-native";

interface MapPreviewProps {
  lat: number;
  lng: number;
}

const MapPreviewer = ({ lat, lng }: MapPreviewProps) => {
  return (
    <View className="h-48 rounded-xl overflow-hidden">
      <MapView
        style={{ flex: 1 }}
        pointerEvents="none" // static preview, not interactive
        initialRegion={{
          latitude: lat,
          longitude: lng,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker coordinate={{ latitude: lat, longitude: lng }} />
      </MapView>
    </View>
  );
};

export default MapPreviewer;
