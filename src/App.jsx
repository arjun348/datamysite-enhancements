import { useEffect } from "react";
import CustomCursor from "./components/CustomCursor";
import Header from "./components/Header";
import Hero from "./sections/Hero";
import Solutions from "./sections/Solutions";
import TrackRecord from "./sections/TrackRecord";
import MoreSections from "./sections/MoreSections";
import {
  initSmoothScroll,
  destroySmoothScroll,
} from "./animations/smoothScroll";

export default function App() {
  useEffect(() => {
    initSmoothScroll();

    return () => destroySmoothScroll();
  }, []);

  return (
    <>
      <CustomCursor />
      <Header />

      <main>
        <Hero />
        <Solutions />
        <TrackRecord />
        <MoreSections />
      </main>
    </>
  );
}
