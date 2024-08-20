async function interceptApi(endPoint, page, delayTime) {
  const url = `http://localhost:5173/${endPoint}`;
  await page.route(url, async (route) => {
    await route.continue();
  });
}

export default interceptApi;
