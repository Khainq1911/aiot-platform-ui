import type { LatLngTuple } from "leaflet";
import { Card, CardContent } from "./card";
import { MapPin, Trash2 } from "lucide-react";
import { Badge } from "./badge";
import { Button } from "./button";
import type { Dispatch, SetStateAction } from "react";

export default function ListPointCard({
  handleSetZone,
  polygonPoints,
  setPolygonPoints,
}: {
  handleSetZone: () => void;
  polygonPoints: LatLngTuple[];
  setPolygonPoints: Dispatch<SetStateAction<LatLngTuple[]>>;
}) {
  const handleRemoveLocation = (point: LatLngTuple) => {
    setPolygonPoints((prev: LatLngTuple[]) =>
      prev.filter(
        (item: LatLngTuple) => item[0] !== point[0] && item[1] !== point[1]
      )
    );
  };

  const handleClearLocations = () => {
    setPolygonPoints([]);
  };
  return (
    <>
      {polygonPoints.length === 0 ? (
        <p className="text-sm text-gray-500">No points selected</p>
      ) : (
        polygonPoints.map((location: LatLngTuple, index: number) => {
          return (
            <Card key={index} className="overflow-hidden">
              <CardContent className="px-4">
                <div className="flex justify-between items-start gap-2">
                  <div className="flex items-center gap-1 mb-1">
                    <MapPin className="h-4 w-4 text-blue-600" />
                    <Badge variant="outline" className="font-normal">
                      Point {index + 1}
                    </Badge>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                    onClick={() => handleRemoveLocation(location)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="font-normal">
                  <p>
                    <span className="mr-2 font-semibold">Latitude:</span>
                    {location[0].toFixed(6)}
                  </p>
                  <p>
                    <span className="mr-2 font-semibold">Longitude:</span>
                    {location[1].toFixed(6)}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })
      )}
      <Button
        variant="outline"
        className="w-full text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
        onClick={handleClearLocations}
      >
        <Trash2 className="h-4 w-4 mr-2" />
        Clear All Locations
      </Button>
      <Button
        variant="outline"
        className="w-full border border-blue-200 text-blue-600 hover:bg-blue-50 hover:text-blue-700 transition-colors"
        onClick={handleSetZone}
      >
        <MapPin className="h-4 w-4 mr-2" />
        Set Zone
      </Button>
    </>
  );
}
