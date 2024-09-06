async function interceptApi(endPoint, page, delayTime) {
  const url = `http://localhost:5173/${endPoint}`;

  
  await page.route(url, async (route) => {
  
    const [response] = await Promise.all([
      page.waitForResponse(
        (res) => res.url().includes(endPoint) && res.status() === 200
      ),
      route.continue(), 
    ]);
if(response.status=== 200){
  console.log('interception sucessfull')
}

  });
}

export default interceptApi;
