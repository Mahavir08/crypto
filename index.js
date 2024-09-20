const { chromium } = require("playwright");
const express = require("express");

const app = express();

app.get("/", async (req, res) => {
  try {
    console.time("CRYPTO");
    const list = [
      "https://coinmarketcap.com/currencies/fio-protocol/",
      "https://coinmarketcap.com/currencies/dodo/",
      "https://coinmarketcap.com/currencies/coti/",
      "https://coinmarketcap.com/currencies/bluzelle/",
      "https://coinmarketcap.com/currencies/bella-protocol/",
      "https://coinmarketcap.com/currencies/balancer/",
      "https://coinmarketcap.com/currencies/ardor/",
      "https://coinmarketcap.com/currencies/catizen/",
      "https://coinmarketcap.com/currencies/ark/",
      "https://coinmarketcap.com/currencies/rei-network/",
    ];
    const browser = await chromium.launch();
    const page = await browser.newPage();

    const cryptoDetails = [];

    for (let url of list) {
      await page.goto(url);

      const element = await page.locator(`#section-coin-overview`);

      const paragraphsInfo = await element.evaluate((el) => {
        const paragraphs = el.querySelectorAll("p");
        const spanTags = el.querySelectorAll("span");

        const span = Array.from(spanTags).map((s) => s.textContent.trim());

        return {
          paragraphs: Array.from(paragraphs).map((p) => ({
            attributes: Array.from(p.attributes).reduce((acc, attr) => {
              acc[attr.name] = attr.value;
              return acc;
            }, {}),
            textContent: p.textContent.trim(),
          })),
          spans: span,
        };
      });

      cryptoDetails.push({
        Coin: paragraphsInfo?.spans?.[2],
        CoinName: paragraphsInfo?.spans?.[0],
        PeopleLike: paragraphsInfo?.spans?.[3],
        CoinPrice: paragraphsInfo?.spans?.[4],
        Graph:
          paragraphsInfo?.paragraphs?.[0]?.attributes?.color === "green"
            ? "POSITIVE"
            : "NEGATIVE",
        PercentGrowth: paragraphsInfo?.paragraphs?.[0]?.textContent,
      });
    }

    console.log("cryptoDetails: ", cryptoDetails);
    console.timeEnd("CRYPTO");

    await browser.close();
    return res.status(200).send({
      success: true,
      data: cryptoDetails,
      message: "Fetched Successfully",
    });
  } catch (error) {
    console.log("ERROR: ", error);
    return res.status(400).send({
      success: false,
      data: [],
      message: "Failed To Fetch",
    });
  }
});

app.listen(8000, () => {
  console.log("Connected To Port 8000");
});

// await page.goto("https://coinmarketcap.com/currencies/dodo/");
