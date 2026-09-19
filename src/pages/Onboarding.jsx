import { useNavigate } from "react-router-dom";
import { PawPrint } from "lucide-react";

export default function Onboarding() {
  const navigate = useNavigate();

  return (
    <main className="onboarding">
      {/* Decorative paw prints */}
      <img src="/assets/paw.png" alt="" className="paw-decoration paw-1" />
      <img src="/assets/paw.png" alt="" className="paw-decoration paw-2" />
      <img src="/assets/paw.png" alt="" className="paw-decoration paw-3" />
      <img src="/assets/paw.png" alt="" className="paw-decoration paw-4" />

      {/* Logo */}
      <div className="logo-wrapper">
        <img src="/assets/woofy-logo.png" alt="WOOFY" className="woofy-logo" />
      </div>

      {/* Buddy */}
      <div className="buddy-wrapper">
        <img
          src="/assets/buddy-master.png"
          alt="Buddy"
          className="buddy-image"
        />
      </div>

      {/* CTA */}
      <button className="get-woofy-button" onClick={() => navigate("/home")}>
        <span>Get WOOFY</span>
        <PawPrint size={24} />
      </button>
    </main>
  );
}
