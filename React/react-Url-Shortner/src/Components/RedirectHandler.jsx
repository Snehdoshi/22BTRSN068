import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const STORAGE_KEY = "shortenedUrls";

export default function RedirectHandler() {
  const { shortcode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const links = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    const link = links.find((l) => l.shortcode === shortcode);

    if (link) {
    
      const newClick = {
        timestamp: new Date(),
        source: document.referrer || "Direct",
        location: "Unknown",
      };

      const updatedLinks = links.map((l) =>
        l.shortcode === shortcode
          ? { ...l, clicks: [...(l.clicks || []), newClick] }
          : l
      );

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedLinks));

    
      window.location.href = link.url;
    } else {
      alert("Short URL not found!");
      navigate("/"); 
    }
  }, [shortcode, navigate]);

  return <p>Redirecting to original URL...</p>;
}
