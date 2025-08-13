import React, { useState } from "react";
import "../styles/global.css";

export default function About() {
  const [formData, setFormData] = useState({
    feature: "",
    name: "",
    surname: "",
    email: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thanks for your feedback! 🙌");
  };

  return (
    <div className="container">
      <h1>About This App</h1>
      <p>This app lets you explore features based on your mood.</p>

      <form className="mood-form" onSubmit={handleSubmit}>
        <label className="form-main-label">We want to hear from you</label>
        <h2>Which mood app feature would you like next:</h2>

        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="feature"
              value="Movies by Mood"
              checked={formData.feature === "Movies by Mood"}
              onChange={handleChange}
              required
            />
            Movies by Mood
          </label>
          <label>
            <input
              type="radio"
              name="feature"
              value="Food by Mood"
              checked={formData.feature === "Food by Mood"}
              onChange={handleChange}
            />
            Food by Mood
          </label>
        </div>

        <div className="name-surname">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="surname"
            placeholder="Surname"
            value={formData.surname}
            onChange={handleChange}
            required
          />
        </div>

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <button type="submit" className="btn-submit">
          SUBMIT
        </button>
      </form>
    </div>
  );
}
