import { useEffect, useState } from 'react';
import { ClassRocket, FunctionalRocket } from './Rocket';
import '../styles/_launchpad.scss';

export default function LaunchPad() {
  const [reRender, triggerRerender] = useState(Date.now());
  
  useEffect(() => {
    setInterval(() => { triggerRerender(Date.now()); }, 500);
  }, [])
  
  return (
    <div className="launchpad">
      <FunctionalRocket initialLaunchTime={reRender} />
    </div>
  );
}
