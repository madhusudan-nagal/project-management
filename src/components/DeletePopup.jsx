export default function DeletePopup({ name, onConfirm, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-sm p-5 flex flex-col gap-4 bg-white rounded-2xl">
        <h2 className="text-lg font-semibold">Confirm Delete</h2>

        <p className="text-sm text-gray-600">
          Are you sure you want to delete "{name}"? This cannot be undone.
        </p>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-3 py-1 text-xs border border-gray-300 rounded-xl"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-3 py-1 text-xs text-white bg-red-600 rounded-xl"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
