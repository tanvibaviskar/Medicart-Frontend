import { GoogleMap, InfoWindow, LoadScript, Marker } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { getNearbyMedicals } from "../../api/customerService";
import "./NearbyMedicals.css";

const containerStyle = {
  width: "100%",
  height: "350px",
};

const NearbyMedicals = () => {
  const [medicals, setMedicals] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetchNearby();
  }, []);

  const fetchNearby = async () => {
  try {
    const res = await getNearbyMedicals();
    console.log("Nearby Response 👉", res); // DEBUG
    setMedicals(res.data || res); // If data is undefined, fallback
  } catch (err) {
    console.error("Error fetching nearby medicals", err);
  }
};


  return (
    <div className="nearby-container">
      <h2>🏥 Nearby Medicals (Within 5 km)</h2>

      {medicals.length > 0 ? (
        <>
          {/* 🔵 GOOGLE MAP */}
         <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>

            <GoogleMap
              mapContainerStyle={containerStyle}
              center={{
                lat: medicals[0].latitude,
                lng: medicals[0].longitude,
              }}
              zoom={13}
            >
              {medicals.map((m) => (
                <Marker
                  key={m.medicalId}
                  position={{ lat: m.latitude, lng: m.longitude }}
                  onClick={() => setSelected(m)}
                />
              ))}

              {selected && (
                <InfoWindow
                  position={{
                    lat: selected.latitude,
                    lng: selected.longitude,
                  }}
                  onCloseClick={() => setSelected(null)}
                >
                  <div>
                    <h4>{selected.medicalName}</h4>
                   <p>{selected.distance?.toFixed(2)} km away</p>

                  </div>
                </InfoWindow>
              )}
            </GoogleMap>
          </LoadScript>

          {/* 🔵 LIST BELOW MAP */}
          <div className="medical-list">
            {medicals.map((m) => (
              <div key={m.medicalId} className="medical-card">
                <h4>{m.medicalName}</h4>
               <p>📍 {m.distance?.toFixed(2)} km away</p>

              </div>
            ))}
          </div>
        </>
      ) : (
        <p>No nearby medicals found.</p>
      )}
    </div>
  );
};

export default NearbyMedicals;
