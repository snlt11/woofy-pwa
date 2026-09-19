import { useNavigate } from "react-router-dom";
import { PawPrint } from "lucide-react";

export default function Onboarding() {
  const navigate = useNavigate();

  return (
    <main className="onboarding">
      {/* Decorative paw prints */}
      <div className="onboarding-paws" aria-hidden="true">
        <img src="/assets/paw.png" alt="" className="paw-decoration paw-1" />
        <img src="/assets/paw.png" alt="" className="paw-decoration paw-2" />
        <img src="/assets/paw.png" alt="" className="paw-decoration paw-3" />
        <img src="/assets/paw.png" alt="" className="paw-decoration paw-4" />
      </div>

      <img
        src="/assets/woofy-logo.png"
        alt="WOOFY"
        className="onboarding-logo"
      />

      <div className="onboarding-mascot">
        <img src="/assets/buddy-master.png" alt="Buddy" />
      </div>

      <button className="onboarding-button" onClick={() => navigate("/home")}>
        <span>Get WOOFY</span>
        <PawPrint size={24} />
      </button>
    </main>
  );
}
