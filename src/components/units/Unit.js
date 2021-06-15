import React, { Fragment, useState, useEffect } from "react";
import GadModal from "../ui/GadModal";
import ImageGallery from "../ui/ImageGallery";
import ImageSlider from "../ui/ImageSlider";

const Unit = ({ match, unit }) => {
  const [unitProfile, setUnitProfile] = useState(null);
  useEffect(() => {
    const getUnits = async () => {
      const unitsFromServer = await fetchUnits();
      setUnitProfile(
        unitsFromServer.find((unit) => unit.serial === match.params.serial)
      );
    };
    getUnits();
  }, []);

  const fetchUnits = async () => {
    const res = await fetch("http://localhost:5000/units");
    const data = await res.json();

    return data;
  };
  return (
    <Fragment>
      {unitProfile && (
        <div className="container mx-auto">
          <div className="flex justify-between items-center my-3">
          <GadModal />
            <h1 className="text-5xl font-mono text-gray-800">
              {match.params.serial}-{unitProfile.company}
            </h1>
          </div>
          <ImageSlider unitProfile={unitProfile} className="mb-10" />
          <ImageGallery unitProfile={unitProfile} />
        </div>
      )}
    </Fragment>
  );
};

export default Unit;
