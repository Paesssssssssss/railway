import http from "http";

const TARGET_BASE = "https://panel.amirsafari.qzz.io:8443";

const server = http.createServer(async (req, res) => {
  try {
    const targetUrl = TARGET_BASE + req.url;

    const upstream = await fetch(targetUrl, {
      method: req.method,
      headers: req.headers,
      body: req.method !== "GET" && req.method !== "HEAD" ? req : undefined,
    });

    res.writeHead(upstream.status, Object.fromEntries(upstream.headers));

    const buffer = Buffer.from(await upstream.arrayBuffer());
    res.end(buffer);

  } catch (err) {
    res.statusCode = 500;
    res.end(JSON.stringify({ error: err.message }));
  }
});

server.listen(process.env.PORT || 3000);