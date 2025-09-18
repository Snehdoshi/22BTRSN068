import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

export default function UrlForm({ onAdd }) {
  const [url, setUrl] = useState("");

  const generateShortcode = () => Math.random().toString(36).substring(2, 8);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!url.trim()) return;

    const newLink = {
      id: Date.now(),
      url,
      shortcode: generateShortcode(),
      createdAt: new Date(),
      expiresAt: null,
      clicks: [],
    };

    onAdd(newLink);
    setUrl("");
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", gap: 1, mb: 3 }}
    >
      <TextField
        label="Original URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        fullWidth
        size="small"
      />
      <Button type="submit" variant="contained">
        Shorten
      </Button>
    </Box>
  );
}
