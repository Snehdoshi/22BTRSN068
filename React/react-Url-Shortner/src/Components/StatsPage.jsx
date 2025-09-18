import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

export default function StatsPage({ links }) {
  return (
    <div>
      <h2>📊 URL Statistics</h2>
      {links.map((link) => (
        <Card key={link.id} sx={{ mb: 2 }}>
          <CardContent>
            <Typography>Short: /r/{link.shortcode}</Typography>
            <Typography>Original: {link.url}</Typography>
            <Typography>Total Clicks: {link.clicks.length}</Typography>
            <ul>
              {link.clicks.map((c, i) => (
                <li key={i}>
                  {c.timestamp.toLocaleString()} | {c.source} | {c.geo}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
