import React, { useState, useEffect } from "react";
import { Container, Typography } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UrlForm from "./Components/urlForm";
import UrlList from "./Components/UrlList";
import RedirectHandler from "./Components/RedirectHandler";

const STORAGE_KEY = "shortenedUrls";

function MainPage() {
  const [links, setLinks] = useState([]);

  
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setLinks(JSON.parse(saved));
  }, []);

  
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(links));
  }, [links]);

  const handleAddLink = (newLink) => {
    setLinks((prev) => [...prev, newLink]);
  };

  const handleDeleteLink = (id) => {
    setLinks((prev) => prev.filter((link) => link.id !== id));
  };

  const handleClickLink = (id) => {
    const sources = ["Direct", "Google", "Twitter", "Facebook"];
    const locations = ["USA", "India", "Germany", "UK", "Canada"];

    const newClick = {
      timestamp: new Date(),
      source: sources[Math.floor(Math.random() * sources.length)],
      location: locations[Math.floor(Math.random() * locations.length)],
    };

    setLinks((prev) =>
      prev.map((link) =>
        link.id === id
          ? { ...link, clicks: [...(link.clicks || []), newClick] }
          : link
      )
    );
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        URL Shortener
      </Typography>
      <UrlForm onAdd={handleAddLink} />
      <UrlList
        links={links}
        onDelete={handleDeleteLink}
        onClick={handleClickLink}
      />
    </Container>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/r/:shortcode" element={<RedirectHandler />} />
      </Routes>
    </Router>
  );
}
