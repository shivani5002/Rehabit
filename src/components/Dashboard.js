import React, { useState, useEffect } from "react";
import AddHabit from "./AddHabit";
import axios from "axios";

function Dashboard() {
  const [showForm, setShowForm] = useState(false);
  const [habits, setHabits] = useState([]);

  // Fetch habits from backend when component mounts
  useEffect(() => {
    axios.get('http://localhost:5000/api/habits')
      .then(response => {
        setHabits(response.data);
      })
      .catch(error => {
        console.error("Error fetching habits: ", error);
      });
  }, []);

  // Add habit using API
  const handleAddHabit = (habit) => {
    axios.post('http://localhost:5000/api/habits', habit)
      .then(response => {
        setHabits([...habits, response.data]);
        setShowForm(false);
      })
      .catch(error => {
        alert("Error adding habit!");
      });
  };

  return (
    <div className="dashboardPage" style={{ padding: "40px", textAlign: "center" }}>
      <h2 style={{ color: "#1a1a1d", marginBottom: 28 }}>Dashboard</h2>
      {!showForm && (
        <button
          style={{
            padding: "12px 28px",
            background: "#d6304c",
            color: "#fffafe",
            border: "none",
            borderRadius: "5px",
            fontWeight: "bold",
            marginBottom: 20,
            cursor: "pointer",
          }}
          onClick={() => setShowForm(true)}
        >
          Add Habit
        </button>
      )}
      {showForm && <AddHabit onAddHabit={handleAddHabit} onClose={() => setShowForm(false)} />}
      <div style={{ maxWidth: 420, margin: "40px auto 0" }}>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {habits.map((habit, idx) => (
            <li key={habit._id || idx} style={{ padding: "14px", borderBottom: "1px solid #da746f" }}>
              <strong style={{ color: "#d6304c" }}>{habit.habitName}</strong>
              {habit.startDate && (
                <span style={{ marginLeft: 12, color: "#1a1a1d" }}>
                  (Start: {habit.startDate})
                </span>
              )}
              <p style={{ color: "#1a1a1d" }}>{habit.description}</p>
              <p style={{ color: "#1a1a1d", fontStyle: "italic" }}>
                Frequency: {habit.frequency.charAt(0).toUpperCase() + habit.frequency.slice(1)}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
