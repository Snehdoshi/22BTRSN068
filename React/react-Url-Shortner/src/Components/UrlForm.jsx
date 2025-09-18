import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { isValidUrl, isValidMinutes } from "../utils/validators";
import { logEvent } from "../utils/logger";

export default function UrlForm({ onAdd }) {
  const [url, setUrl] = useState("");
  const [validity, setValidity] = useState("");
  const [shortcode, setShortcode] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValidUrl(url)) {
      setError("Invalid URL");
      logEvent("ValidationError", { url });
      return;
    }
    if (validity && !isValidMinutes(validity)) {
      setError("Validity must be a positive integer");
      return;
    }
    setError("");
    const newLink = {
      id: Date.now(),
      url,
      shortcode: shortcode || Math.random().toString(36).substring(2, 8),
      createdAt: new Date(),
      expiresAt: validity
        ? new Date(Date.now() + Number(validity) * 60000)
        : new Date(Date.now() + 30 * 60000), // default 30 min
      clicks: []
    };
    onAdd(newLink);
    logEvent("UrlCreated", newLink);
    setUrl("");
    setValidity("");
    setShortcode("");
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 2 }}>
      <TextField
        label="Original URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        fullWidth
        sx={{ mb: 1 }}
      />
      <TextField
        label="Validity (minutes, optional)"
        value={validity}
        onChange={(e) => setValidity(e.target.value)}
        fullWidth
        sx={{ mb: 1 }}
      />
      <TextField
        label="Preferred Shortcode (optional)"
        value={shortcode}
        onChange={(e) => setShortcode(e.target.value)}
        fullWidth
        sx={{ mb: 1 }}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Button type="submit" variant="contained">
        Shorten
      </Button>
    </Box>
  );
}
