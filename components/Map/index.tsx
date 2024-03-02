"use client";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

import "@neshan-maps-platform/mapbox-gl/dist/NeshanMapboxGl.css";
import nmp_mapboxgl from "@neshan-maps-platform/mapbox-gl";

type mapType = {
  map: React.MutableRefObject<any>;

  center: number[];
  setCenter: (e: number[]) => void | null;
};

const MapPointsShowe = ({
  map,

  center,
  setCenter,
}: mapType) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  // const map = useRef<any>(null);

  const [isMoving, setIsMoving] = useState(false);
  const [zoom] = useState(16);
  const [API_KEY] = useState("web.a9e19c84138f45fe8660b154ad366d3b");
  // const [center, setCenter] = useState([lng, lat]);

  useEffect(() => {
    if (map.current || !mapContainer.current) return; // stops map from intializing more than once

    map.current = new nmp_mapboxgl.Map({
      mapType: nmp_mapboxgl.Map.mapTypes.neshanRaster,
      container: mapContainer.current || "map",
      center: [center[0], center[1]],
      zoom: zoom,
      minZoom: 2,
      maxZoom: 21,
      trackResize: true,
      mapKey: API_KEY,
      poi: true,

      traffic: true,
      mapTypeControllerOptions: {
        show: false,
        position: "bottom-left",
      },
    });
    // map.current.on("error", (e) => {
    //   console.log(e, "erroooooor");
    // });
    if (map?.current && !!nmp_mapboxgl) {
      map?.current?.addControl(
        new nmp_mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
          },
          trackUserLocation: true,
        })
      );

      map?.current?.addControl(new nmp_mapboxgl.NavigationControl(), "top-right");
      map?.current?.on("move", () => {
        setCenter([map.current.getCenter().lng, map.current.getCenter().lat]);
        setIsMoving(true);
      });
    }
  }, [API_KEY, zoom, map, mapContainer]);

  useEffect(() => {
    return () => {
      // map?.current?.remove();
    };
  }, []);

  console.log(map.current, "sssssssssssssssssssssssss");
  return (
    <div className="map-wrap !rounded-xl !h-full relative">
      <div ref={mapContainer} id="map" className="map !rounded-xl w-screen h-screen" />
    </div>
  );
};

export default MapPointsShowe;
