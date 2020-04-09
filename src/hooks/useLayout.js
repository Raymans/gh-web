import { useEffect, useState } from 'react';
import FontFaceObserver from 'fontfaceobserver';
import { getScreenWidth, timeoutThrottlerHandler } from '../utils/helpers';

export default function () {
  const [layoutState, setLayoutState] = useState({
    font400loaded: false,
    font600loaded: false,
    screenWidth: getScreenWidth(),
    headerMinimized: false,
  });
  const timeouts = {};

  const resizeHandler = () => {
    setLayoutState({ ...layoutState, screenWidth: getScreenWidth() });
  };

  const resizeThrottler = () => timeoutThrottlerHandler(timeouts, 'resize', 100, resizeHandler);

  const loadFont = (name, family, weight) => {
    const font = new FontFaceObserver(family, {
      weight,
    });

    font.load(null, 10000).then(
      () => {
        setLayoutState({ ...layoutState, [`${name}loaded`]: true });
      },
      () => {
        console.log(`${name} is not available`);
      },
    );
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      loadFont('font400', 'Open Sans', 400);
      loadFont('font600', 'Open Sans', 600);
    }
  }, []);

  useEffect(() => {
    setLayoutState({
      ...layoutState,
      screenWidth: getScreenWidth(),
    });
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', resizeThrottler, false);
    }
  }, []);
  return [layoutState, setLayoutState];
}
