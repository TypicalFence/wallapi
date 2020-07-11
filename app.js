const Koa = require("koa");
const KoaRouter = require("@koa/router");
const KoaLogger = require("koa-logger");
const KoaBody = require("koa-body");
const Unsplash = require("unsplash-js").default;

const fetch = require("node-fetch");
global.fetch = fetch;

require("dotenv").config();

const app = new Koa();

app.use(KoaLogger());
app.use(KoaBody());

const router = KoaRouter();

const unsplash = new Unsplash({ accessKey: process.env.UNSPLASH_ACCESS });

router.get("/api/v1/wallpaper/unsplash", async(ctx) => {
    console.log(ctx.query);
    const resp = await unsplash.photos.getRandomPhoto({ query: ctx.query.query });
    const data = await resp.json();
    ctx.body = {
        id: data.id,
        width: data.width,
        height: data.height,
        image: "/api/v1/image/unsplash/" + data.id
    };
});

router.get("/api/v1/image/unsplash/:id", async(ctx) => {
    const resp = await unsplash.photos.getPhoto(ctx.params.id);
    const data = await resp.json();
    if (data.urls.full) {
        ctx.redirect(data.urls.full);
    } else {
        ctx.body = { msg: "not found" };
        ctx.status = 404;
    }
});

app.use(router.routes());

app.listen(process.env.PORT);
