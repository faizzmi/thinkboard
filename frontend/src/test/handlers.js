// frontend/src/test/handlers.js
import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("*/api/notes/", () => {
    return HttpResponse.json([
      { _id: "1", title: "test", content: "hi", createdAt: new Date().toISOString() },
    ]);
  }),

  http.get("*/api/notes/:id", ({ params }) => {
    return HttpResponse.json({
      _id: params.id,
      title: "test",
      content: "hi",
      createdAt: new Date().toISOString(),
    });
  }),

  http.post("*/api/notes/", async () => {
    return HttpResponse.json({ message: "Note created successfully!" }, { status: 201 });
  }),

  http.put("*/api/notes/:id", async () => {
    return HttpResponse.json({ message: "Note updated successfully!" });
  }),

  http.delete("*/api/notes/:id", () => {
    return HttpResponse.json({ message: "Note deleted successfully!" });
  }),
];