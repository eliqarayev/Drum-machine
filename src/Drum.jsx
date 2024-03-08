import * as Tone from "tone";
import { MdOutlineNotStarted } from "react-icons/md";
import { TbMetronome } from "react-icons/tb";
import React, { useEffect, useRef, useState } from "react";
import SampleName from "./components/SampleName";
import Button from "./components/Button";
import Volume from "./components/Volume";

const Drum = ({ samples, numOfStepsSeq }) => {
  const [buttonClick, setButtonClick] = useState(false);
  const elementRef = useRef([]);
  const samplesIndex = [...Array(samples.length).keys()];
  const stepSeq = [...Array(numOfStepsSeq).keys()];
  let tracks = [];

  if (Tone.context.state !== "running") {
    Tone.context.resume();
  }

  const handleStart = (e) => {
    if (Tone.Transport.state === "started") {
      Tone.Transport.pause();
    } else {
      Tone.start();
      Tone.Transport.start();
    }
    setButtonClick(!buttonClick);
  };

  const handleVolumeChange = (index, newVolume) => {
    tracks[index].sampler.volume.value = newVolume;
  };

  const handleBPMChange = (newBPM) => {
    Tone.Transport.bpm.value = newBPM;
    console.log(Tone.Transport.bpm.value + " bmp");
  };

  Tone.Transport.bpm.value = 90;

  useEffect(() => {
    tracks = samples.map((sample, i) => ({
      id: i,
      sampler: new Tone.Sampler({
        urls: {
          ["C2"]: sample.url,
        },
      }).toDestination(),
    }));

    Tone.Transport.swing = 0.5;
    Tone.Transport.swingSubdivision = "32n";

    new Tone.Sequence(
      (time, step) => {
        tracks.map((trk) => {
          if (elementRef.current[trk.id]?.[step]?.checked) {
            trk.sampler.triggerAttack("C2", time);
          }
        });
      },
      [...stepSeq],
      "16n"
    ).start(0);
  }, [handleVolumeChange]);

  return (
    <>
      <div className="top">
        <button
          title="start"
          onClick={(e) => {
            handleStart(e);
          }}
          className={`btn ${buttonClick ? "btn-pressed" : ""}`}
        >
          <MdOutlineNotStarted
            style={{
              fontSize: "30px",
              color: "white",
            }}
          />
        </button>
        <div className="ranges">
          <TbMetronome
            style={{
              fontSize: "25px",
              color: "white",
            }}
          />
          <input
            id="bpm"
            type="number"
            min={"50"}
            max={"190"}
            defaultValue={"90"}
            onChange={(e) => handleBPMChange(parseInt(e.target.value))}
          />
        </div>
      </div>
      <div className="drum">
        <div className="drum-left">
          {samples.map((sample, i) => (
            <div key={i}>
              <Volume index={i} handleVolumeChange={handleVolumeChange} />
              {/* <SampleName sample={sample} /> */}
            </div>
          ))}
        </div>

        <div className="drum-right">
          {samplesIndex.map((sample, i) => (
            <div key={sample} className="steps">
              {stepSeq.map((step, index) => {
                return (
                  <Button
                    key={index}
                    ref={(elm) => {
                      if (!elm) return;
                      if (!elementRef.current[sample]) {
                        elementRef.current[sample] = [];
                      }
                      elementRef.current[sample][step] = elm;
                    }}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Drum;
