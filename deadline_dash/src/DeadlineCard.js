import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

/**
 * A visually styled card to display deadline information,
 * with an auto-updating (minimum: daily) days-left countdown,
 * note, and edit/delete buttons.
 * Uses dark theme / Kavia palette via App.css variables.
 */

// PUBLIC_INTERFACE
function DeadlineCard({ title, dueDate, note, progress = 0, onEdit, onDelete, onProgressChange }) {
  // State: days left, auto-recomputed at least daily
  const [daysLeft, setDaysLeft] = useState(() => calculateDaysLeft(dueDate));

  // On mount and when dueDate changes, set up daily update timer.
  useEffect(() => {
    setDaysLeft(calculateDaysLeft(dueDate));
    // Update at the next midnight so days left always reflects local date change
    const msUntilMidnight = getMsUntilMidnight();
    const midnightTimeout = setTimeout(() => {
      setDaysLeft(calculateDaysLeft(dueDate));
      // Set up daily update from then on
      const daily = setInterval(() => {
        setDaysLeft(calculateDaysLeft(dueDate));
      }, 24 * 60 * 60 * 1000);
      // Clean up interval on unmount or dueDate change
      return () => clearInterval(daily);
    }, msUntilMidnight);

    return () => {
      clearTimeout(midnightTimeout);
    };
  }, [dueDate]);

  // Calculate formatted due date in readable way
  const formattedDueDate = formatDueDate(dueDate);

  return (
    <div
      className="deadline-card"
      style={{
        background: 'var(--kavia-dark)',
        border: '1.5px solid var(--border-color)',
        borderRadius: 12,
        boxShadow: '0 2px 10px rgba(20,20,25,0.07)',
        marginBottom: 20,
        padding: '24px 20px 18px 20px',
        color: 'var(--text-color)',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        position: 'relative',
      }}
      aria-label={`Deadline card: ${title}`}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 14 }}>
        <div>
          <div
            style={{
              fontWeight: 600,
              fontSize: '1.22rem',
              color: 'var(--text-color)',
              lineHeight: 1.22,
              marginBottom: 5,
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              maxWidth: 340,
              whiteSpace: 'nowrap'
            }}
            title={title}
          >
            {title}
          </div>
          <div style={{ color: 'var(--kavia-orange)', fontWeight: 500, fontSize: '1.08rem' }}>
            <span role="img" aria-label="Due date" style={{marginRight:4}}>📅</span>
            {formattedDueDate}
          </div>
        </div>
        <div style={{
          minWidth: 110,
          textAlign: 'right',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'end'
        }}>
          <span
            style={{
              fontSize: '1.45rem',
              fontWeight: 700,
              color: daysLeft <= 2 ? '#FFB300' : 'var(--kavia-orange)', // accent for urgency
              letterSpacing: '0.01em'
            }}
            aria-label={`Days left until deadline: ${daysLeft}`}
          >
            {daysLeft > 0
              ? `${daysLeft} Day${daysLeft === 1 ? '' : 's'} Left`
              : daysLeft === 0
                ? "Due Today!"
                : "Past Due"}
          </span>
        </div>
      </div>
      {note && note.trim() && (
        <div
          style={{
            color: 'var(--text-secondary)',
            fontSize: '1rem',
            marginTop: 8,
            marginBottom: 2,
            paddingLeft: 2,
            lineHeight: 1.5,
            wordBreak: 'break-word'
          }}
        >
          <span style={{ color: 'var(--kavia-orange)', marginRight: 4 }}>📝</span>
          {note}
        </div>
      )}
      {/* Progress Tracker */}
      <div style={{ marginTop: 14, marginBottom: 4 }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          marginBottom: 2
        }}>
          <span style={{
            fontSize: '1.03rem',
            color: 'var(--text-secondary)',
            fontWeight: 500
          }}>
            Progress
          </span>
          <span
            style={{
              fontSize: '1rem',
              color: 'var(--kavia-orange)',
              fontWeight: 600,
              marginLeft: 4
            }}
            aria-label={`Progress: ${progress}%`}
          >
            {progress}%
          </span>
        </div>
        <div style={{
          width: '100%',
          background: 'rgba(255,255,255,0.10)',
          borderRadius: 6,
          height: 10,
          marginBottom: 6
        }}>
          <div style={{
            width: `${progress}%`,
            height: 10,
            background: 'linear-gradient(90deg, var(--kavia-orange), #FFD384 80%)',
            borderRadius: 6,
            transition: 'width 0.27s'
          }} />
        </div>
        {/* Slider control: visually styled input */}
        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={progress}
          aria-valuetext={`${progress}%`}
          aria-label="Progress percentage"
          onChange={e => {
            if (onProgressChange) onProgressChange(Number(e.target.value));
          }}
          style={{
            width: '95%',
            accentColor: '#E87A41',
            height: 3,
            background: 'none',
            marginTop: -4,
            marginLeft: 2,
            marginBottom: 8,
            cursor: 'pointer'
          }}
        />
      </div>
      <div style={{
        display: 'flex',
        gap: 10,
        marginTop: 8,
        alignSelf: 'flex-end'
      }}>
        <button
          className="btn"
          aria-label="Edit deadline"
          onClick={onEdit}
          style={{
            background: 'transparent',
            color: 'var(--kavia-orange)',
            border: '1.2px solid var(--kavia-orange)',
            borderRadius: 6,
            fontWeight: 500,
            padding: '6px 16px',
            fontSize: '1rem',
            transition: 'background 0.16s,color 0.16s',
            outline: 'none',
            cursor: 'pointer'
          }}
        >
          Edit
        </button>
        <button
          className="btn"
          aria-label="Delete deadline"
          onClick={onDelete}
          style={{
            background: '#F44336',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            fontWeight: 500,
            padding: '6px 16px',
            fontSize: '1rem',
            outline: 'none',
            cursor: 'pointer'
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

DeadlineCard.propTypes = {
  title: PropTypes.string.isRequired,
  dueDate: PropTypes.string.isRequired,
  note: PropTypes.string,
  progress: PropTypes.number, // Percentage, 0-100
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onProgressChange: PropTypes.func, // Handler for changing progress
};

// Utility: Calculate integer days left (round up if in future)
function calculateDaysLeft(dueDateStr) {
  const now = new Date();
  const due = new Date(dueDateStr + 'T23:59:59'); // deadline is end-of-day local
  // Calculate difference in calendar days
  const msPerDay = 1000 * 60 * 60 * 24;
  // Remove time portion
  due.setHours(23, 59, 59, 999);
  now.setHours(0, 0, 0, 0);
  const diff = Math.ceil((due - now) / msPerDay);
  return diff;
}

// Utility: How many ms until local midnight
function getMsUntilMidnight() {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);
  return midnight - now;
}

// Utility: Format ISO date to "EEE, MMM dd, yyyy"
function formatDueDate(dueDateStr) {
  const d = new Date(dueDateStr);
  // Options: "Thu, Jul 04, 2024"
  if (isNaN(d)) return dueDateStr;
  return d.toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

export default DeadlineCard;
