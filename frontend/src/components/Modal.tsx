import { useState } from "react";
import { useNavigate } from "react-router-dom";

type ModalProps = {
  name: string;
  description: string;
  url: string;
};

const Modal = ({ name, description, url }: ModalProps) => {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {/* Link che apre il popup */}
      <button
        onClick={() => setShowPopup((prev) => !prev)}
        className="text-blue-600 underline"
      >
        {name}
      </button>

      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm text-center">
            <h2 className="text-lg font-bold">Informazioni Importanti</h2>
            <p className="mt-2">{description}</p>

            {/* Link per navigare a un'altra pagina */}
            <button
              onClick={() => navigate(url)}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Visualizza dataset
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default Modal;
