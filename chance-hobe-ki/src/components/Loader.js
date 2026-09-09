export default function Loader() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#fff",
        zIndex: 9998,
      }}
    >
      <div className="ai-loader-text">
        <span className="ai-loader-admission">ADMISSION</span>{" "}
        <span className="ai-loader-info">INFO</span>
      </div>
    </div>
  );
}
