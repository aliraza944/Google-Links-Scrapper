const puppeteer = require("puppeteer");

(async () => {
  const getData = async (url, start = 0) => {
    try {
      const page = await browser.newPage();
      await page.setViewport({ width: 1366, height: 768 });

      const query = `${url}&start=${start}`;
      await page.goto(query, { waitUntil: "load", timeout: 0 });

      await page.waitForSelector('div[class="yuRUbf"] >a', { timeout: 6000 });
      const links = await page.evaluate(() =>
        Array.from(document.querySelectorAll('div[class="yuRUbf"] >a')).map(
          (a) => a.href
        )
      );
      await page.close();
      if (links.length < 1) {
        // return if no link exists
        return links;
      } else {
        return links.concat(await getData(url, (start = start + 10)));
      }
    } catch (error) {
      if (error) console.log(error);
      // return links;
    }
  }; //end get data function

  const browser = await puppeteer.launch({ headless: false });

  const url =
    "https://www.google.com/search?q=Let+You+Love+Me+by+Rita+Ora&sxsrf=ALeKk02Hp5Segi8ShvyrREw3NLZ6p7_BKw:1622526254457&ei=Lsm1YPSzG9WX1fAPvdqTgAg&sa=N&ved=2ahUKEwj0gqSo3fXwAhXVSxUIHT3tBIAQ8tMDegQIARA7&biw=1517&bih=694";

  const allLinks = await getData(url);
  await browser.close();
  console.log(allLinks);
})(); //end musicCrawler function

// getData Function
