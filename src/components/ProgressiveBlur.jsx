import "../styles/progressive-blur.css";

export default function ProgressiveBlur() {
  return (
    <div className="woofy-progressive-blur" aria-hidden="true">
      <span className="woofy-progressive-blur-layer layer-1" />
      <span className="woofy-progressive-blur-layer layer-2" />
      <span className="woofy-progressive-blur-layer layer-3" />
      <span className="woofy-progressive-blur-layer layer-4" />
      <span className="woofy-progressive-blur-layer layer-5" />
    </div>
  );
}
