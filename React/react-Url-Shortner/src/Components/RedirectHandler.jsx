import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

export default function UrlList({ links }) {
  return (
    <div>
      {links.map((link) => (
        <Card key={link.id} sx={{ mb: 2 }}>
          <CardContent>
            <Typography>
              Short URL: <a href={`/r/${link.shortcode}`}>/r/{link.shortcode}</a>
            </Typography>
            <Typography>Original: {link.url}</Typography>
            <Typography>
              Created: {link.createdAt.toLocaleString()}
            </Typography>
            <Typography>
              Expires: {link.expiresAt.toLocaleString()}
            </Typography>
            <Typography>Total Clicks: {link.clicks.length}</Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
