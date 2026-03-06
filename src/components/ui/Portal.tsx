import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
  children: ReactNode;
  containerId?: string;
}

const Portal = ({ children, containerId = "portal-root" }: PortalProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    let element = document.getElementById(containerId);
    if (!element) {
      element = document.createElement("div");
      element.id = containerId;
      document.body.appendChild(element);
    }

    return () => {
      // We don't necessarily want to remove the portal-root on every unmount 
      // if other portals might still be using it, but for a simple app it's often fine.
    };
  }, [containerId]);

  return mounted ? createPortal(children, document.getElementById(containerId)!) : null;
};

export default Portal;
