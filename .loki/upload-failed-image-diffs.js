/**
 * Upload failed snapshot diffs to imgur on test failure so that it's easy to
 * see why a test failed on CI
 */

const fs = require("fs");
const fetch = require("node-fetch");
const FormData = require("form-data");

const { IMGUR_API_KEY } = process.env;

const failures = getFailures();
if (failures.length === 0) {
  process.exit(0);
}

if (!IMGUR_API_KEY) {
  console.log("No credentials available for imgur, aborting image upload");
  process.exit(1);
}

handleFailures(failures)
  .then(() => process.exit(0))
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

async function handleFailures(failures) {
  const album = await createAlbum();
  await uploadToImgur(album, failures);
}

async function createAlbum() {
  const body = new FormData();
  body.append("title", `Wobbly test run on ${new Date().toUTCString()}`);
  body.append("privacy", "hidden");

  const response = await fetch("https://api.imgur.com/3/album", {
    method: "POST",
    body,
    headers: {
      ...body.getHeaders(),
      authorization: `Client-ID ${IMGUR_API_KEY}`
    }
  });

  if (!response.ok) {
    throw Error(`failed to create failures album. reason: ${await response.text()}`);
  }

  const { data } = await response.json();
  console.log(`*** TEST DIFFS VIEWABLE AT https://imgur.com/a/${data.id} ***`);

  return data;
}

async function uploadToImgur(album, failures) {
  for (const f of failures) {
    const body = new FormData();
    body.append("image", fs.createReadStream(f));
    body.append("album", album.deletehash);
    body.append("type", "file");
    const res = await fetch("https://api.imgur.com/3/image", {
      method: "POST",
      body,
      headers: {
        ...body.getHeaders(),
        authorization: `Client-ID ${IMGUR_API_KEY}`
      }
    });

    if (!res.ok) {
      console.error("failed to upload failure", f, "reason:", await res.text());
    }
  }
}

function getFailures() {
  return fs.readdirSync(".loki/difference").map(f => ".loki/difference/" + f);
}
