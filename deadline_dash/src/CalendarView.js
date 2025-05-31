import React, { useState } from 'react';
import PropTypes from 'prop-types';

/**
 * CalendarView component: Monthly grid showing deadlines per day.
 * Reuses all CSS dark theme and color variables. No extra dependencies.
 * @param deadlines Array of deadline objects: { id, title, dueDate, note, progress }
 * @param onDeadlineClick function(deadline) - show details for the deadline
 */
function CalendarView({ deadlines, onDeadlineClick }) {
  // Determine the month and year to display (default: current month)
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth()); // 0-indexed: 0 = Jan
  const [year, setYear] = useState(today.getFullYear());

  // Prepare a map: date (yyyy-mm-dd) -> [deadlines]
  const dayMap = {};
  deadlines.forEach(dl => {
    if (!dl.dueDate) return;
    const d = new Date(dl.dueDate);
    if (d.getFullYear() === year && d.getMonth() === month) {
      const k = dl.dueDate;
      if (!dayMap[k]) dayMap[k] = [];
      dayMap[k].push(dl);
    }
  });

  // Utilities for building the calendar grid
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const firstWeekday = firstDay.getDay(); // 0=Sunday, 1=Monday...
  // For Mon-Sun: (firstWeekday+6)%7, but we keep Sunday start for now

  // Build grid: pre-pad with empty days if necessary
  const calendarDays = [];
  for (let i = 0; i < firstWeekday; i++) {
    calendarDays.push(null); // Empty before 1st
  }
  for (let d = 1; d <= daysInMonth; d++) {
    calendarDays.push(new Date(year, month, d));
  }
  // Pad to make 5-6 full weeks
  while (calendarDays.length % 7 !== 0) {
    calendarDays.push(null);
  }

  // Month/year navigation
  function prevMonth() {
    if (month === 0) {
      setYear(y => y - 1);
      setMonth(11);
    } else setMonth(m => m - 1);
  }
  function nextMonth() {
    if (month === 11) {
      setYear(y => y + 1);
      setMonth(0);
    } else setMonth(m => m + 1);
  }
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  function isToday(date) {
    if (!date) return false;
    return date.getFullYear() === today.getFullYear() 
      && date.getMonth() === today.getMonth()
      && date.getDate() === today.getDate();
  }

  return (
    <div style={{ padding: '32px 0', minHeight: 450 }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 18,
        marginBottom: 12
      }}>
        <button 
          aria-label="Previous month"
          onClick={prevMonth}
          style={{
            background: 'none',
            color: 'var(--kavia-orange)',
            border: 'none',
            fontSize: 22,
            cursor: 'pointer',
            padding: 4
          }}
        >‹</button>
        <div style={{
          fontWeight: 600,
          fontSize: '1.18rem',
          color: 'var(--text-color)'
        }}>
          {monthNames[month]} {year}
        </div>
        <button 
          aria-label="Next month"
          onClick={nextMonth}
          style={{
            background: 'none',
            color: 'var(--kavia-orange)',
            border: 'none',
            fontSize: 22,
            cursor: 'pointer',
            padding: 4
          }}
        >›</button>
      </div>
      {/* Calendar grid */}
      <div className="calendar-view-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: '6px',
        background: 'var(--kavia-dark)',
        border: '1.5px solid var(--border-color)',
        borderRadius: 12,
        margin: 'auto',
        maxWidth: 720,
        boxShadow: '0 2px 11px rgba(20,20,25,0.08)'
      }}>
        {/* Weekday headers */}
        {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(wd => (
          <div key={wd} style={{
            padding: '11px 0 6px 0',
            textAlign: 'center',
            fontWeight: 500,
            color: 'var(--kavia-orange)',
            fontSize: '1.02rem',
            borderRadius: '8px 8px 0 0'
          }}>{wd}</div>
        ))}
        {/* Calendar days */}
        {calendarDays.map((date, idx) => {
          if (!date) {
            return <div key={'empty-' + idx} style={{ height: 76 }} />;
          }
          // ISO yyyy-mm-dd
          const key = date.toISOString().slice(0, 10);
          const todayFlag = isToday(date);
          const cellDeadlines = dayMap[key] || [];
          return (
            <div
              key={key}
              style={{
                background: todayFlag ? 'rgba(232,122,65,0.15)' : 'rgba(40, 40, 45, 0.92)',
                border: todayFlag ? '1.5px solid var(--kavia-orange)' : '1px solid var(--border-color)',
                borderRadius: 8,
                padding: 6,
                minHeight: 76,
                fontSize: 15,
                position: 'relative',
                cursor: cellDeadlines.length ? 'pointer' : undefined,
                boxShadow: todayFlag ? '0 2px 8px #EA9940' : 'none'
              }}
              tabIndex={cellDeadlines.length ? 0 : undefined}
              aria-label={`${date.toLocaleDateString(undefined, {weekday: 'short', month: 'short', day:'numeric'})}${cellDeadlines.length ? ', ' + cellDeadlines.length + ' deadlines' : ''}`}
            >
              {/* Day number */}
              <div style={{
                color: todayFlag ? 'var(--kavia-orange)' : 'var(--text-color)',
                fontWeight: 600,
                fontSize: '1.05rem',
                marginBottom: 2,
                letterSpacing: 0.01,
              }}>
                {date.getDate()}
                {todayFlag && <span style={{marginLeft: 2, fontSize: 13}}>●</span>}
              </div>
              {/* Deadlines for this day */}
              {cellDeadlines.length === 0 ? null : (
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0
                }}>
                  {cellDeadlines.slice(0,3).map(dl => (
                    <li
                      key={dl.id}
                      style={{
                        background: 'rgba(232,122,65,0.23)',
                        color: '#fff',
                        fontWeight: 500,
                        fontSize: '0.99rem',
                        borderRadius: 4,
                        padding: '1.5px 5px',
                        margin: '2.5px 0',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        cursor: 'pointer'
                      }}
                      title={dl.title}
                      onClick={e => {
                        e.stopPropagation();
                        if (onDeadlineClick) onDeadlineClick(dl);
                      }}
                      tabIndex={0}
                      aria-label={"Show details for " + dl.title}
                    >
                      <span style={{
                        color: 'var(--kavia-orange)',
                        marginRight: 2,
                        fontWeight: 600,
                        fontSize: '1.02em'
                      }}>•</span>
                      {dl.title.length > 23 ? dl.title.slice(0, 22) + '…' : dl.title}
                    </li>
                  ))}
                  {/* If more deadlines, show '+N more' and expandable? */}
                  {cellDeadlines.length > 3 && (
                    <li style={{
                      color: 'var(--text-secondary)',
                      fontSize: '0.98em',
                      marginTop: 1,
                      paddingLeft: 4,
                    }}>
                      +{cellDeadlines.length - 3} more
                    </li>
                  )}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

CalendarView.propTypes = {
  deadlines: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    dueDate: PropTypes.string.isRequired,
    note: PropTypes.string,
    progress: PropTypes.number,
  })).isRequired,
  onDeadlineClick: PropTypes.func
};

export default CalendarView;
