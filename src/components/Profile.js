import React, { useEffect, useState } from "react";
import "./Profile.css";

export default function Profile() {
  const [user, setUser] = useState(null);

  const [profileData, setProfileData] = useState({
    stats: {
      currentStreak: 7,
      longestStreak: 21,
      totalDays: 45,
      completionRate: 78,
      totalHabits: 8,
      completedToday: 3
    }
  });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const userObj = JSON.parse(userData);
      setUser(userObj);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const getStreakMessage = (streak) => {
    if (streak >= 21) return "Consistency Master! 🌟";
    if (streak >= 14) return "Amazing Streak! 🚀";
    if (streak >= 7) return "Great Job! 💪";
    return "Keep Going! 🔥";
  };

  if (!user) {
    return (
      <div className="profile-loading">
        <div className="loading-spinner"></div>
        <p>Loading your journey...</p>
      </div>
    );
  }

  return (
    <div className="profile-page">
      {/* Hero Section */}
      <div className="profile-hero">
        <div className="hero-content">
          <div className="user-avatar">
            <div className="avatar-circle">
              <span className="avatar-emoji">👤</span>
            </div>
          </div>
          <div className="user-info">
            <h1 className="user-name">{user.username}</h1>
            <p className="user-email">{user.email}</p>
            <div className="streak-message">
              {getStreakMessage(profileData.stats.currentStreak)}
            </div>
          </div>
        </div>
      </div>

      {/* Main Stats Grid */}
      <section className="main-stats">
        <div className="stats-grid">
          <div className="stat-card primary">
            <div className="stat-icon">🔥</div>
            <div className="stat-content">
              <div className="stat-value">{profileData.stats.currentStreak}</div>
              <div className="stat-label">Current Streak</div>
              <div className="stat-subtitle">Days in a row</div>
            </div>
          </div>

          <div className="stat-card secondary">
            <div className="stat-icon">🏆</div>
            <div className="stat-content">
              <div className="stat-value">{profileData.stats.longestStreak}</div>
              <div className="stat-label">Longest Streak</div>
              <div className="stat-subtitle">Personal best</div>
            </div>
          </div>

          <div className="stat-card accent">
            <div className="stat-icon">📅</div>
            <div className="stat-content">
              <div className="stat-value">{profileData.stats.totalDays}</div>
              <div className="stat-label">Total Days</div>
              <div className="stat-subtitle">Tracking habits</div>
            </div>
          </div>

          <div className="stat-card success">
            <div className="stat-icon">✅</div>
            <div className="stat-content">
              <div className="stat-value">{profileData.stats.completionRate}%</div>
              <div className="stat-label">Completion Rate</div>
              <div className="stat-subtitle">Overall success</div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Stats */}
      <section className="extra-stats">
        <div className="stats-row">
          <div className="mini-stat">
            <div className="mini-icon">📊</div>
            <div className="mini-content">
              <div className="mini-value">{profileData.stats.totalHabits}</div>
              <div className="mini-label">Active Habits</div>
            </div>
          </div>
          <div className="mini-stat">
            <div className="mini-icon">✅</div>
            <div className="mini-content">
              <div className="mini-value">{profileData.stats.completedToday}</div>
              <div className="mini-label">Done Today</div>
            </div>
          </div>
          <div className="mini-stat">
            <div className="mini-icon">⭐</div>
            <div className="mini-content">
              <div className="mini-value">Level 2</div>
              <div className="mini-label">User Level</div>
            </div>
          </div>
        </div>
      </section>

      {/* Action Buttons */}
      <section className="action-section">
        <button className="action-btn edit-btn">
          <span className="btn-icon">✏️</span>
          Edit Profile
        </button>
        <button className="action-btn logout-btn" onClick={handleLogout}>
          <span className="btn-icon">🚪</span>
          Logout
        </button>
      </section>
    </div>
  );
}