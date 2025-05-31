import React, { useState, useRef } from 'react';
import './App.css';
import DeadlineCard from './DeadlineCard';
import DeadlineForm from './DeadlineForm';
import CalendarView from './CalendarView';

/**
 * Deadline object structure:
 * {
 *   id: string,          // Unique ID for each deadline
 *   title: string,       // Title of the deadline
 *   dueDate: string,     // Due date in ISO format (e.g., '2023-06-09')
 *   note: string,        // Optional note for the deadline
 *   progress: number,    // Percentage complete (0-100)
 * }
 */

// PUBLIC_INTERFACE
function App() {
  // State for deadlines, initialized as an empty array or with example data for development
  const [deadlines, setDeadlines] = useState([
    // Sample:
    // {
    //   id: '1',
    //   title: 'Math Exam',
    //   dueDate: '2024-07-04',
    //   note: 'Room 101, bring calculator',
    //   progress: 30
    // },
    // {
    //   id: '2',
    //   title: 'History Paper',
    //   dueDate: '2024-07-10',
    //   note: '',
    //   progress: 50
    // }
  ]);

  // Keep a ref for a monotonically increasing numeric ID counter to ensure unique IDs
  const deadlineIdCounter = useRef(3);

  // PUBLIC_INTERFACE
  /**
   * Adds a new deadline to the list.
   * @param {Object} deadlineData - { title, dueDate, note }
   */
  function addDeadline(deadlineData) {
    setDeadlines(prev => [
      ...prev,
      {
        id: String(deadlineIdCounter.current++),
        title: deadlineData.title,
        dueDate: deadlineData.dueDate,
        note: deadlineData.note || '',
        progress: 0 // Initialize progress for new deadlines
      }
    ]);
  }

  // PUBLIC_INTERFACE
  /**
   * Edits an existing deadline by id.
   * @param {string} id - Deadline ID
   * @param {Object} updates - { title?, dueDate?, note?, progress? }
   */
  function editDeadline(id, updates) {
    setDeadlines(prev =>
      prev.map(deadline =>
        deadline.id !== id
          ? deadline
          : { ...deadline, ...updates }
      )
    );
  }

  // PUBLIC_INTERFACE
  /**
   * Deletes a deadline by id.
   * @param {string} id - Deadline ID
   */
  function deleteDeadline(id) {
    setDeadlines(prev => prev.filter(deadline => deadline.id !== id));
  }

  // State for controlling DeadlineForm modal type and data
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // "add" or "edit"
  const [modalInitial, setModalInitial] = useState(null); // if editing: { id, title, dueDate, note }
  const [editId, setEditId] = useState(null);
  // Calendar/List view state
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'calendar'
  // When clicking deadline in calendar mode, show detail via modal edit
  // ID of deadline to view/edit from calendar:
  // Use App modal for details/edit as used for cards.
  function handleCalendarDeadlineClick(dl) {
    openEditModal(dl);
  }

  // Handle Add FAB button click
  function openAddModal() {
    setModalMode("add");
    setModalInitial(null);
    setModalOpen(true);
    setEditId(null);
  }

  // Handle Edit button click on DeadlineCard
  function openEditModal(deadline) {
    setModalMode("edit");
    setModalInitial({
      title: deadline.title,
      dueDate: deadline.dueDate,
      note: deadline.note ?? ""
    });
    setEditId(deadline.id);
    setModalOpen(true);
  }

  // Handler for Modal form submit
  function handleModalSubmit(data) {
    if (modalMode === "add") {
      addDeadline(data);
    } else if (modalMode === "edit" && editId) {
      editDeadline(editId, data);
    }
    setModalOpen(false);
    setEditId(null);
  }

  // Handler for closing Modal (cancel or submit)
  function handleModalClose() {
    setModalOpen(false);
    setEditId(null);
  }

  // Handler to update progress for a given deadline id
  function handleProgressUpdate(id, newProgress) {
    editDeadline(id, { progress: newProgress });
  }

  // --- Search logic state ---
  const [searchQuery, setSearchQuery] = useState("");

  // Returns true if a deadline matches the query (case-insensitive; searches title, note, dueDate)
  function isDeadlineMatch(deadline, query) {
    if (!query.trim()) return true;
    const q = query.trim().toLowerCase();
    if (deadline.title && deadline.title.toLowerCase().includes(q)) return true;
    if (deadline.note && deadline.note.toLowerCase().includes(q)) return true;
    if (deadline.dueDate && deadline.dueDate.includes(q)) return true;
    // Optionally match against human-readable due date
    if (formatDueDate(deadline.dueDate).toLowerCase().includes(q)) return true;
    return false;
  }

  // Utility: Format ISO date to human-readable string ("Thu, Jul 04, 2024")
  function formatDueDate(dueDateStr) {
    const d = new Date(dueDateStr);
    if (isNaN(d)) return dueDateStr || "";
    return d.toLocaleDateString(undefined, {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }

  // Filter deadlines using search query
  const filteredDeadlines = deadlines.filter(dl => isDeadlineMatch(dl, searchQuery));

  // UI: toggle between list and calendar
  const viewToggle = (
    <div
      style={{
        display: 'flex',
        gap: 0,
        alignItems: 'center',
        margin: '24px 0 8px 0',
        justifyContent: 'center'
      }}
      aria-label="Switch between list view and calendar view"
    >
      <button
        tabIndex={0}
        className="btn"
        onClick={() => setViewMode('list')}
        style={{
          background: viewMode === 'list' ? 'var(--kavia-orange)' : 'rgba(255,235,200,0.08)',
          color: viewMode === 'list' ? '#1A1A1A' : 'var(--text-color)',
          border: `1px solid ${viewMode === 'list' ? 'var(--kavia-orange)' : 'var(--border-color)'}`,
          borderRadius: '9px 0 0 9px',
          fontWeight: 600,
          fontSize: '1.07rem',
          padding: '7px 18px',
          cursor: 'pointer',
          boxShadow: viewMode === 'list' ? '0 3px 8px rgba(234,153,64,0.09)' : undefined,
          outline: 'none'
        }}>
        List View
      </button>
      <button
        tabIndex={0}
        className="btn"
        onClick={() => setViewMode('calendar')}
        style={{
          background: viewMode === 'calendar' ? 'var(--kavia-orange)' : 'rgba(255,235,200,0.08)',
          color: viewMode === 'calendar' ? '#1A1A1A' : 'var(--text-color)',
          border: `1px solid ${viewMode === 'calendar' ? 'var(--kavia-orange)' : 'var(--border-color)'}`,
          borderRadius: '0 9px 9px 0',
          fontWeight: 600,
          fontSize: '1.07rem',
          padding: '7px 18px',
          cursor: 'pointer',
          boxShadow: viewMode === 'calendar' ? '0 3px 8px rgba(234,153,64,0.09)' : undefined,
          outline: 'none',
          borderLeft: '0px'
        }}>
        Calendar View
      </button>
    </div>
  );

  // --- Search input bar, styled for dark theme ---
  const searchBar = (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        background: 'rgba(27,27,33,0.93)',
        borderRadius: 8,
        border: '1.4px solid var(--border-color)',
        padding: '7px 14px',
        marginTop: 28,
        marginBottom: 18,
        boxShadow: '0 2px 6px rgba(20,20,25,0.08)',
        maxWidth: 420,
        width: '100%'
      }}
    >
      <span
        role="img"
        aria-label="Search"
        style={{ fontSize: 19, color: 'var(--kavia-orange)' }}
      >🔍</span>
      <input
        type="text"
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        placeholder="Search deadlines (title, note, date)…"
        aria-label="Search deadlines"
        style={{
          background: 'transparent',
          border: 'none',
          outline: 'none',
          fontSize: '1.08rem',
          color: 'var(--text-color)',
          fontWeight: 500,
          width: '100%',
        }}
      />
      {searchQuery &&
        <button
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-secondary)',
            fontSize: 22,
            cursor: 'pointer',
            marginLeft: 2,
            outline: 'none',
          }}
          aria-label="Clear search"
          onClick={() => setSearchQuery('')}
        >×</button>
      }
    </div>
  );

  // In calendar view: optionally highlight/filter cells that contain matching deadlines.
  // Show only deadlines matching the query on the calendar.
  // We'll pass filteredDeadlines for "search applied" and all for blank search.
  const calendarDeadlines = searchQuery.trim() ? filteredDeadlines : deadlines;

  return (
    <div className="app">
      {/* Top navigation bar */}
      <nav className="navbar" role="navigation" aria-label="Main Navigation">
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 0 }}>
          <div className="logo" style={{ fontWeight: 700 }}>
            <span
              className="logo-symbol"
              aria-hidden="true"
              style={{
                color: 'var(--kavia-orange)',
                fontWeight: 700,
                fontSize: '2rem',
                marginRight: 4
              }}
            >
              ⏳
            </span>
            DeadlineDash
          </div>
        </div>
      </nav>

      <main
        style={{
          flex: 1,
          marginTop: 72, // Leaves space for fixed navbar
          padding: '0 0 64px 0',
          minHeight: '60vh',
          background: 'var(--kavia-dark)',
        }}
        aria-label={viewMode === 'calendar' ? 'Calendar of deadlines' : 'List of deadlines'}
      >
        <div className="container">
          {viewToggle}
          {searchBar}
          {deadlines.length === 0 ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: 56,
                color: 'var(--text-secondary)',
                minHeight: 220,
              }}
            >
              <div style={{ fontSize: '1.16rem', marginBottom: 8 }}>
                <span role="img" aria-label="no deadlines">🎉</span> No deadlines yet
              </div>
              <div style={{ fontSize: '0.98rem' }}>
                Click the <span style={{ color: '#FFB300', fontWeight: 500 }}>+</span> button to add your first deadline.
              </div>
            </div>
          ) : (
            viewMode === 'calendar' ? (
              <CalendarView
                deadlines={calendarDeadlines}
                onDeadlineClick={handleCalendarDeadlineClick}
              />
            ) : (
              <div>
                {/* Map deadlines as cards, sorted by dueDate ascending */}
                {filteredDeadlines.length === 0 ? (
                  <div style={{
                    marginTop: 54,
                    color: 'var(--text-secondary)',
                    fontSize: '1.13rem',
                    textAlign: 'center'
                  }}>
                    <span role="img" aria-label="no match">🔎</span> No matching deadlines found
                  </div>
                ) : (
                  filteredDeadlines
                    .slice()
                    .sort(
                      (a, b) =>
                        new Date(a.dueDate).getTime() -
                        new Date(b.dueDate).getTime()
                    )
                    .map((deadline) => (
                      <DeadlineCard
                        key={deadline.id}
                        title={deadline.title}
                        dueDate={deadline.dueDate}
                        note={deadline.note}
                        progress={typeof deadline.progress === 'number' ? deadline.progress : 0}
                        onEdit={() => openEditModal(deadline)}
                        onDelete={() => deleteDeadline(deadline.id)}
                        onProgressChange={(newProgress) =>
                          handleProgressUpdate(deadline.id, newProgress)
                        }
                      />
                    ))
                )}
              </div>
            )
          )}
        </div>
      </main>
      {/* Deadline Add/Edit Modal */}
      <DeadlineForm
        open={modalOpen}
        mode={modalMode}
        initialData={modalInitial}
        onSubmit={handleModalSubmit}
        onClose={handleModalClose}
      />

      {/* Floating Action Button (FAB) */}
      <button
        className="fab"
        aria-label="Add deadline"
        style={{
          position: 'fixed',
          right: 32,
          bottom: 32,
          zIndex: 120,
          backgroundColor: '#FFB300',
          color: '#1A1A1A',
          border: 'none',
          borderRadius: '50%',
          width: 56,
          height: 56,
          boxShadow: '0 4px 16px rgba(30,30,30,0.22)',
          fontSize: '2.1rem',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'box-shadow 0.2s, background 0.2s',
        }}
        tabIndex={0}
        onClick={openAddModal}
      >
        +
      </button>
    </div>
  );
}

export default App;
