export default {
  async fetch() {
    return new Response("SEDORI API OK", {
      headers: {
        "content-type": "text/plain; charset=UTF-8"
      }
    });
  }
};
