import * as Tone from "tone";
import { MdOutlineNotStarted } from "react-icons/md";
import React, { useEffect, useRef, useState } from "react";
import SampleName from "./components/SampleName";
import Button from "./components/Button";
import Volume from "./components/Volume";
import KeyboardHandler from "./components/keyboardHandler";

const Drum = ({ samples, numOfStepsSeq }) => {
  const MAIN_NOTE = "C2";

  const [isPlaying, setIsPlaying] = useState(false);
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

  useEffect(() => {
    tracks = samples.map((sample, i) => ({
      id: i,
      sampler: new Tone.Sampler({
        urls: {
          [MAIN_NOTE]: sample.url,
        },
      }).toDestination(),
    }));

    Tone.Transport.swing = 0.5;
    Tone.Transport.swingSubdivision = "32n";

    new Tone.Sequence(
      (time, step) => {
        tracks.map((trk) => {
          if (elementRef.current[trk.id]?.[step]?.checked) {
            trk.sampler.triggerAttack(MAIN_NOTE, time);
          }
        });
      },
      [...stepSeq],
      "16n"
    ).start(0);
  }, []);

  window.addEventListener("keydown", (e) => KeyboardHandler(e.code));

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
              color: `${buttonClick ? "white" : "white"}
              `,
            }}
          />
        </button>
      </div>
      <div className="drum">
        <div className="drum-left">
          {samples.map((sample, i) => (
            <div key={i}>
              <SampleName sample={sample} />
              <Volume />
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
