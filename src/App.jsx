import React from "react";
import Drum from "./Drum";

const App = () => {
  return (
    <div>
      <Drum
        samples={[
          {
            url: "/Drumkit-Samples/80s-Digital-kit/80s Digital Clap 01.wav",
            name: "clap",
          },
          {
            url: "/Drumkit-Samples/80s-Digital-kit/80s Digital Closed Hat 02.wav",
            name: "closed-Hihat",
          },
          {
            url: "/Drumkit-Samples/80s-Digital-kit/80s Digital Snare 01.wav",
            name: "snare",
          },
          {
            url: "/Drumkit-Samples/80s-Digital-kit/80s Digital Kick 04.wav",
            name: "kick",
          },
        ]}
        numOfStepsSeq={16}
      />
    </div>
  );
};

export default App;
