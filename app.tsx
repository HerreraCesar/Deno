import React from "https://deno.land/x/react_deno@17.0.2/react.ts";
import ReactDOMServer from "https://deno.land/x/react_deno@17.0.2/dom_server.ts";
import { createApp } from "https://deno.land/x/servest@v1.3.4/mod.ts";

const app = createApp();

const colors: string[] = [];

app.get("/", async (req) => {
  await req.respond({
    status: 200,
    headers: new Headers({ "content-type": "text/html" }),
    body: ReactDOMServer.renderToString(
      <html>
        <head>
          <meta charSet="utf-8" />
          <title>Colors with Deno</title>
        </head>
        <body
          style={{
            margin: "auto",
            width: 400,
            backgroundColor: "#202020",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h1 style={{ color: "white" }}>Colors with Deno</h1>
          <form
            action="/"
            method="POST"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 20,
              width: "100%",
            }}
          >
            <label style={{ color: "white", fontSize: 20 }}>
              Enter a color:
            </label>
            <input id="color" name="color" type="text" required />
            <button
              style={{ backgroundColor: "grey", color: "white" }}
              type="submit"
            >
              Add to list
            </button>
          </form>
          <ul>
            {colors.map((color) => (
              <li
                style={{ color: `${color}`, fontSize: 30 }}
              >
                {color}
              </li>
            ))}
          </ul>
        </body>
      </html>,
    ),
  });
});

app.post("/", async (req) => {
  const data: string = (await req.formData()).value("color") as string;
  colors.push(data);
  req.redirect("/");
});

app.listen({ port: 8000 });
