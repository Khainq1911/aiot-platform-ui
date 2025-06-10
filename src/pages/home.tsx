import {
  MapContainer,
  Marker,
  Polygon,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState, type Dispatch, type SetStateAction } from "react";
import type { LatLngTuple } from "leaflet";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import ListPointCard from "@/components/ui/list-point-card";
import { toast } from "sonner";

interface location {
  lat: number;
  lng: number;
}

function LocationMarker({
  polygonPoints,
  setPolygonPoints,
}: {
  polygonPoints: LatLngTuple[];
  setPolygonPoints: Dispatch<SetStateAction<LatLngTuple[]>>;
}) {
  useMapEvents({
    click(e) {
      if (polygonPoints.length < 4) {
        const { lat, lng }: location = e.latlng;
        setPolygonPoints((prev: LatLngTuple[]) => [...prev, [lat, lng]]);
      } else {
        toast.error("Maximum points reached", {
          description: "You can only add up to 4 points to the polygon.",
          style: {
            background: "var(--toast-error-bg)",
            color: "var(--toast-text)",
          },
        });
      }
    },
  });

  return (
    <>
      {polygonPoints.map((item: LatLngTuple, index: number) => (
        <Marker position={item} key={index}>
          <Popup>point {`${index + 1}`}</Popup>
        </Marker>
      ))}
      <Polygon pathOptions={{ color: "red" }} positions={polygonPoints} />
    </>
  );
}

export default function HomePage() {
  const [polygonPoints, setPolygonPoints] = useState<LatLngTuple[]>([]);

  return (
    <div className="lg:flex relative">
      <div className="w-full lg:w-[80%]">
        <MapContainer
          center={[21.005, 105.845]}
          zoom={13}
          scrollWheelZoom={false}
          style={{
            height: "calc(100vh - 60px)",
            width: "100%",
            position: "relative",
            zIndex: 1,
          }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <LocationMarker
            polygonPoints={polygonPoints}
            setPolygonPoints={setPolygonPoints}
          />
          <Marker position={[51.505, -0.09]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </div>

      <div className="hidden lg:block w-[20%] space-y-4 p-4">
        <h1 className="font-bold">Selected Location</h1>
        <ListPointCard
          polygonPoints={polygonPoints}
          setPolygonPoints={setPolygonPoints}
        />
      </div>

      <Sheet>
        <SheetTrigger
          asChild
          className="absolute z-20 bottom-4 right-2 lg:hidden"
        >
          <Button className="btn">Open list points</Button>
        </SheetTrigger>

        <SheetContent>
          <SheetHeader>
            <SheetTitle>Selected Location</SheetTitle>
          </SheetHeader>
          <div>
            {polygonPoints.length === 0 ? (
              <p className="text-sm text-gray-500">No points selected</p>
            ) : (
              <ListPointCard
                polygonPoints={polygonPoints}
                setPolygonPoints={setPolygonPoints}
              />
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
