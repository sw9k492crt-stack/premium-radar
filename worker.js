export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    const headers = {
      "content-type": "application/json; charset=UTF-8",
      "access-control-allow-origin": "*"
    };

    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          ...headers,
          "access-control-allow-methods": "GET, OPTIONS"
        }
      });
    }

    // 動作確認
    if (url.pathname === "/health") {
      return Response.json(
        {
          ok: true,
          service: "SEDORI API",
          status: "running"
        },
        { headers }
      );
    }

    // KVに保存された商品データを取得
    if (url.pathname === "/data") {
      try {
        const raw = await env.SEDORI_KV.get("items");

        if (!raw) {
          return Response.json(
            {
              ok: true,
              items: [],
              message: "まだ商品データは登録されていません"
            },
            { headers }
          );
        }

        return new Response(raw, { headers });
      } catch (error) {
        return Response.json(
          {
            ok: false,
            error: "KVへの接続を確認してください"
          },
          {
            status: 500,
            headers
          }
        );
      }
    }

    return Response.json(
      {
        ok: true,
        name: "SEDORI API",
        endpoints: {
          health: "/health",
          data: "/data"
        }
      },
      { headers }
    );
  }
};
