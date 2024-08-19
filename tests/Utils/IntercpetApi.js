async function interceptApi(endPoint, page, delayTime) {
  await page.route(endPoint, async (route) => {
    await new Promise((resolve) => setTimeout(resolve, delayTime));
    await route.continue();
  });
}

export default interceptApi;
