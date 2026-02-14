// Fake server database
const known = {
    "https://example.com/photos/": { exists: true, kind: "folder" },
    "https://example.com/file.pdf": { exists: true, kind: "file" },
    "https://example.com/": { exists: true, kind: "folder" }
  };
  

  export function checkUrlOnServer(url) {
    return new Promise((resolve) => {
      const delay = 300 + Math.floor(Math.random() * 500);
  
      setTimeout(() => {
        if (known[url]) {
          resolve({
            ok: true,
            exists: true,
            kind: known[url].kind
          });
          return;
        }
  
        // If ends with "/" then folder, if has "." near end then file otherwise unknown
        const looksLikeFolder = url.endsWith("/");
        const looksLikeFile = /\/[^/]+\.[a-z0-9]+$/i.test(url);
  
        resolve({
          ok: true,
          exists: false,
          kind: looksLikeFile ? "file" : (looksLikeFolder ? "folder" : "unknown")
        });
      }, delay);
    });
  }
  