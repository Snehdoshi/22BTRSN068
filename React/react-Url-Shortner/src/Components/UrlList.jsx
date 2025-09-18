export default function UrlList({ links = [] }) {
  return (
    <div>
      {links.map((link) => (
         <Card key={link.id} sx={{ mb: 2 }}>
          <CardContent>
            <Typography>
              Short URL:{" "}
              <Link href={`/${link.shortcode}`} underline="hover">
                /{link.shortcode}
              </Link>
            </Typography>
            <Typography>Original: {link.url}</Typography>
            <Typography>
              Created: {new Date(link.createdAt).toLocaleString()}
            </Typography>
            <Typography>
              Expires: {new Date(link.expiresAt).toLocaleString()}
            </Typography>
            <Typography>
              Total Clicks:{" "}
              {Array.isArray(link.clicks) ? link.clicks.length : link.clicks}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
