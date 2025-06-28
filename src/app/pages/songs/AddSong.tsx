import { RequestInfo } from "rwsdk/worker";
import { createSong } from "./functions";

export async function AddSong({ ctx, request }: RequestInfo) {
  // Mark this as editor mode for the Document component
  ctx.isEditor = true;
  let error = "";
  let success = false;

  // Handle form submission
  if (request.method === "POST") {
    try {
      const formData = await request.formData();
      const content = formData.get("content") as string;

      // Parse metadata from content
      const lines = content?.split('\n') || [];
      const metadata: Record<string, string> = {};
      let contentStartIndex = 0;

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line.includes(':')) {
          const [key, ...valueParts] = line.split(':');
          const value = valueParts.join(':').trim();
          const normalizedKey = key.trim().toLowerCase();
          
          if (['title', 'artist', 'album', 'year', 'key'].includes(normalizedKey)) {
            if (value) {
              metadata[normalizedKey] = value;
            }
            contentStartIndex = i + 1;
          } else {
            break;
          }
        } else if (line === '') {
          contentStartIndex = i + 1;
        } else {
          break;
        }
      }

      // Extract the actual song content (lyrics/chords)
      const songContent = lines.slice(contentStartIndex).join('\n').trim();

      // Basic validation
      if (!metadata.title) {
        error = "Title is required";
      } else {
        const year = metadata.year ? parseInt(metadata.year, 10) : undefined;
        
        await createSong({
          title: metadata.title,
          artist: metadata.artist || undefined,
          album: metadata.album || undefined,
          year: year && !isNaN(year) ? year : undefined,
          key: metadata.key || undefined,
          content: songContent || undefined,
        });
        
        success = true;
      }
    } catch (err) {
      error = err instanceof Error ? err.message : "Failed to create song";
    }
  }

  // Redirect on success
  if (success) {
    return new Response(null, {
      status: 302,
      headers: { Location: "/" },
    });
  }

  return (
    <div className="editor-container">
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      
      <form method="POST" className="editor-form" id="editor-form">
        <div className="editor-main">
          <textarea
            id="content"
            name="content"
            className="editor-textarea"
            autoFocus
            defaultValue={`Title: 
Artist: 
Album: 
Year: 
Key: 

`}
          />
        </div>

        <input type="hidden" name="title" value="" />
        <input type="hidden" name="artist" value="" />
        <input type="hidden" name="album" value="" />
        <input type="hidden" name="year" value="" />
        <input type="hidden" name="key" value="" />
      </form>
    </div>
  );
}