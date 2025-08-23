import dynamic from "next/dynamic";

const ReactJsonViewNoSSR = dynamic(() => import("react-json-view"), {
  ssr: false,
});

export function ReactJsonWrapper(
  props: React.ComponentProps<typeof ReactJsonViewNoSSR>
) {
  return <ReactJsonViewNoSSR {...props} />;
}
