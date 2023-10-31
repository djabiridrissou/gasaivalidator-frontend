export function DetailsModal({ onClose }) {
    return (
      <div className="modal-overlay">
        <div className="modal">
          <div className="modal-header"></div>
          <div className="modal-content flex flex-col">
            <h3 className="text-center mb-4 text-red-500 font-semibold">Provide in all the information before continuing</h3>
            <button className="confirm-button" onClick={onClose}>
              I understand
            </button>
          </div>
        </div>
      </div>
    );
}