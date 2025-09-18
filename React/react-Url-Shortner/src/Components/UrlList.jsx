import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

export default function UrlList({ links = [], onDelete, onClick }) {
  const [selectedLink, setSelectedLink] = useState(null);

  const handleCopy = (shortcode) => {
    navigator.clipboard.writeText(`/r/${shortcode}`);
    alert(`Copied: /r/${shortcode}`);
  };

  return (
    <>
      {links.length === 0 ? (
        <Typography>No links created yet.</Typography>
      ) : (
        links.map((link) => (
          <Card key={link.id} sx={{ mb: 2, p: 1 }}>
            <CardContent>
              <Typography>
                Short URL:{" "}
                <a
                  href={`/r/${link.shortcode}`}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => onClick(link.id)}
                >
                  /r/{link.shortcode}
                </a>
              </Typography>
              <Typography>Original URL: {link.url}</Typography>
              <Typography>
                Created: {link.createdAt?.toLocaleString?.() || "N/A"}
              </Typography>
              <Typography>
                Expires: {link.expiresAt?.toLocaleString?.() || "N/A"}
              </Typography>
              <Typography>Total Clicks: {link.clicks?.length || 0}</Typography>

              <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => handleCopy(link.shortcode)}
                >
                  Copy
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  onClick={() => onDelete(link.id)}
                >
                  Delete
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => setSelectedLink(link)}
                >
                  Stats
                </Button>
              </Stack>
            </CardContent>
          </Card>
        ))
      )}

      {/* Stats Modal */}
      <Dialog
        open={!!selectedLink}
        onClose={() => setSelectedLink(null)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>URL Statistics</DialogTitle>
        <DialogContent>
          {selectedLink && (
            <>
              <Typography variant="h6" gutterBottom>
                Short URL: /r/{selectedLink.shortcode}
              </Typography>
              <Typography>Original URL: {selectedLink.url}</Typography>
              <Typography>
                Created: {selectedLink.createdAt?.toLocaleString?.() || "N/A"}
              </Typography>
              <Typography>
                Expires: {selectedLink.expiresAt?.toLocaleString?.() || "N/A"}
              </Typography>
              <Typography>Total Clicks: {selectedLink.clicks?.length || 0}</Typography>

              <Table sx={{ mt: 2 }} size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Timestamp</TableCell>
                    <TableCell>Source</TableCell>
                    <TableCell>Location</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedLink.clicks?.map((click, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{new Date(click.timestamp).toLocaleString()}</TableCell>
                      <TableCell>{click.source}</TableCell>
                      <TableCell>{click.location}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <Button
                variant="contained"
                sx={{ mt: 2 }}
                onClick={() => {
                  onClick(selectedLink.id);
                  // Update modal state to include the new click
                  setSelectedLink((prev) => ({
                    ...prev,
                    clicks: [
                      ...(prev.clicks || []),
                      {
                        timestamp: new Date(),
                        source: ["Direct", "Google", "Twitter", "Facebook"][
                          Math.floor(Math.random() * 4)
                        ],
                        location: ["USA", "India", "Germany", "UK", "Canada"][
                          Math.floor(Math.random() * 5)
                        ],
                      },
                    ],
                  }));
                }}
              >
                Simulate Click
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
