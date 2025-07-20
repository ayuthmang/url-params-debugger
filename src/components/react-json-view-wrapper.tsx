"use client";

import ReactJsonView from "react-json-view";

export function ReactJsonWrapper(
  props: React.ComponentProps<typeof ReactJsonView>
) {
  return <ReactJsonView {...props} />;
}
