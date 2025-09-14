export default function NeonButton({ children, onClick }) {
  return (
    <button className="neon-button" onClick={onClick}>
      <span></span>
      {children}
    </button>
  );
}
