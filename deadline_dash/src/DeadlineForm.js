import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

/** 
 * DEADLINE FORM MODAL COMPONENT
 * Used for both adding and editing deadlines.
 * Fields: title (required), due date (required), note (optional)
 * Props:
 *   - open: boolean (controls modal visibility)
 *   - mode: "add" | "edit"
 *   - initialData: { title, dueDate, note } for edit, or undefined/add
 *   - onSubmit: function({ title, dueDate, note }) => void
 *   - onClose: function() => void
 */
function DeadlineForm({ open, mode, initialData, onSubmit, onClose }) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [dueDate, setDueDate] = useState(initialData?.dueDate || "");
  const [note, setNote] = useState(initialData?.note || "");
  const [errors, setErrors] = useState({});
  const titleRef = useRef(null);

  // Autofocus when modal opens
  useEffect(() => {
    if (open) {
      setTitle(initialData?.title || "");
      setDueDate(initialData?.dueDate || "");
      setNote(initialData?.note || "");
      setErrors({});
      setTimeout(() => titleRef.current && titleRef.current.focus(), 90);
    }
  }, [open, initialData]);

  // Validate before submit
  function validate() {
    const errs = {};
    if (!title.trim()) errs.title = "Title is required";
    if (!dueDate) errs.dueDate = "Due date is required";
    return errs;
  }

  // Handle form submit
  function handleSubmit(ev) {
    ev.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    onSubmit({ title: title.trim(), dueDate, note: note.trim() });
  }

  // Modal closes on overlay click or Esc
  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape" && open) onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
    // eslint-disable-next-line
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="deadline-modal-overlay"
      tabIndex={-1}
      aria-modal="true"
      role="dialog"
      style={{
        position: "fixed",
        zIndex: 10000,
        inset: 0,
        background: "rgba(24,22,27,0.68)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        animation: "fadeIn 0.18s",
      }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <form
        className="deadline-modal-form"
        onSubmit={handleSubmit}
        style={{
          background: "var(--kavia-dark)",
          borderRadius: 14,
          boxShadow: "0 6px 24px rgba(20,20,25,0.23)",
          width: "95vw",
          maxWidth: 380,
          padding: "28px 24px 22px",
          color: "var(--text-color)",
          display: "flex",
          flexDirection: "column",
          gap: 16,
          border: "1.3px solid var(--border-color)"
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ fontSize: "1.36rem", fontWeight: 600, letterSpacing: 0.01, color: "var(--kavia-orange)", marginBottom: 2, textAlign: "center" }}>
          {mode === "add" ? "Add Deadline" : "Edit Deadline"}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <label htmlFor="deadline-title" style={{ fontWeight: 500, fontSize: "1rem" }}>
            Title<span style={{ color: "#FFB300", marginLeft: 2 }}>*</span>
          </label>
          <input
            id="deadline-title"
            ref={titleRef}
            type="text"
            placeholder="Enter title (e.g. Math Exam)"
            value={title}
            onChange={e => setTitle(e.target.value)}
            maxLength={70}
            style={{
              background: "rgba(27,27,33,0.93)",
              border: errors.title
                ? "1.7px solid #FFB300"
                : "1px solid var(--border-color)",
              borderRadius: 5,
              color: "var(--text-color)",
              padding: "10px 12px",
              fontSize: "1.05rem",
              outline: "none",
              marginBottom: 0,
              boxShadow: errors.title ? "0 0 3px #FFB300" : "none"
            }}
            aria-invalid={!!errors.title}
            required
          />
          {errors.title && (
            <div style={{ color: "#FFB300", fontSize: "0.97rem", marginTop: -2 }}>
              {errors.title}
            </div>
          )}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <label htmlFor="deadline-dueDate" style={{ fontWeight: 500, fontSize: "1rem" }}>
            Due Date<span style={{ color: "#FFB300", marginLeft: 2 }}>*</span>
          </label>
          <input
            id="deadline-dueDate"
            type="date"
            value={dueDate}
            onChange={e => setDueDate(e.target.value)}
            style={{
              background: "rgba(27,27,33,0.93)",
              border: errors.dueDate
                ? "1.7px solid #FFB300"
                : "1px solid var(--border-color)",
              borderRadius: 5,
              color: "var(--text-color)",
              padding: "10px 12px",
              fontSize: "1.02rem",
              outline: "none",
              appearance: "none"
            }}
            aria-invalid={!!errors.dueDate}
            required
          />
          {errors.dueDate && (
            <div style={{ color: "#FFB300", fontSize: "0.97rem", marginTop: -2 }}>
              {errors.dueDate}
            </div>
          )}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <label htmlFor="deadline-note" style={{ fontWeight: 500, fontSize: "1rem" }}>
            Note <span style={{ color: "var(--text-secondary)", fontWeight: 400 }}>(optional)</span>
          </label>
          <textarea
            id="deadline-note"
            value={note}
            onChange={e => setNote(e.target.value)}
            placeholder="Extra info, location, instructions…"
            rows={3}
            maxLength={120}
            style={{
              background: "rgba(27,27,33,0.93)",
              border: "1px solid var(--border-color)",
              borderRadius: 5,
              color: "var(--text-color)",
              padding: "10px 12px",
              fontSize: "1.01rem",
              resize: "vertical"
            }}
          />
        </div>
        <div style={{
          marginTop: 10,
          display: "flex",
          gap: 8,
          justifyContent: "center"
        }}>
          <button
            type="button"
            onClick={() => onClose()}
            style={{
              background: "transparent",
              color: "var(--text-color)",
              border: "1.2px solid var(--border-color)",
              borderRadius: 5,
              padding: "8px 20px",
              fontWeight: 500,
              fontSize: "1.05rem",
              cursor: "pointer",
              transition: "background 0.18s"
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            style={{
              background: "#FFB300",
              color: "#1A1A1A",
              border: "none",
              borderRadius: 5,
              padding: "8px 24px",
              fontWeight: 600,
              fontSize: "1.05rem",
              cursor: "pointer",
              marginLeft: 2,
              transition: "background 0.18s"
            }}
            aria-label={mode === "add" ? "Add deadline" : "Save deadline"}
          >
            {mode === "add" ? "Add" : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}

DeadlineForm.propTypes = {
  open: PropTypes.bool.isRequired,
  mode: PropTypes.oneOf(["add", "edit"]).isRequired,
  initialData: PropTypes.shape({
    title: PropTypes.string,
    dueDate: PropTypes.string,
    note: PropTypes.string,
  }),
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default DeadlineForm;
