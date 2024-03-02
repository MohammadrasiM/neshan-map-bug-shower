"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React, { useMemo, useRef, useState } from "react";

const MapPage = () => {
  const MapPointsShowe = useMemo(
    () =>
      dynamic(() => import("@/components/Map"), {
        ssr: false,
      }),
    []
  );

  const router = useRouter();
  const map = useRef<any>(null);
  const [center, setCenter] = useState([51.3778346, 35.7709651]);

  return (
    <div>
      <button
        onClick={() => {
          router.back();
        }}
      >
        {" "}
        go back
      </button>

      <div className="w-screen h-screen relative">
        {" "}
        <MapPointsShowe center={center} setCenter={setCenter} map={map} />
      </div>
    </div>
  );
};

export default MapPage;
