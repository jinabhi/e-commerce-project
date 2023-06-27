import React, { useEffect } from "react";

import { Fancybox as NativeFancybox } from "@fancyapps/ui/dist/fancybox.esm";
import "@fancyapps/ui/dist/fancybox.css";

function Fancybox(props) {
  const { delegate, options, children } = props;
  const delegates = delegate || "[data-fancybox]";

  useEffect(() => {
    const opts = options || {};

    NativeFancybox.bind(delegates, opts);

    return () => {
      NativeFancybox.destroy();
    };
  }, []);

  return <>{children}</>;
}

export default Fancybox;
