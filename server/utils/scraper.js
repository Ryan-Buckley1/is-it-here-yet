const puppeteer = require("puppeteer");

const trackingScraper = async function (inputTrackingNumber) {
  let packageData = {
    trackingNumber: inputTrackingNumber,
    urlToTracking: "",
    expectedDelDate: "",
    carrier: "",
  };

  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const context = await browser.createIncognitoBrowserContext();
  const page = await context.newPage();
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36"
  );

  await page.goto(`https://www.bing.com/search?q=${inputTrackingNumber}`, {
    waitUntil: "networkidle0",
  });

  let trackingStart = inputTrackingNumber.substring(0, 2);

  //Figures out carrier via tracking number format
  let carrier = "";
  if (trackingStart === "1Z") {
    carrier = "UPS";
  }

  if (inputTrackingNumber.length >= 20) {
    carrier = "USPS";
  }

  if (inputTrackingNumber.length <= 22 && trackingStart == 92) {
    carrier = "Fedex";
  }

  if (inputTrackingNumber.length <= 16) {
    carrier = "Fedex";
  }

  const expectedDeliveryDate = await page.$eval(
    `#rpt_lz${carrier} > div > div > div:nth-child(1) > div`,
    (el) => el.textContent
  );

  let url = "";
  if (carrier === "Fedex") {
    url = await page.$eval(
      `#package_tr_ans > div.b_vPanel > div:nth-child(1) > div > div.p_tr_v2_container > div > div.pt_link_header > div.b_focusLabel.b_promoteText > a`,
      (el) => el.getAttribute("href")
    );
  }

  if (carrier === "USPS") {
    url = await page.$eval(
      `#package_tr_ans > div.b_rich > div.p_tr_v2_container > div > div.pt_link_header > div.b_focusLabel.b_promoteText > a`,
      (el) => el.getAttribute("href")
    );
  }

  if (carrier === "UPS") {
    url = await page.$eval(
      `#package_tr_ans > div.b_rich > div.p_tr_v2_container > div > div.pt_link_header > div.b_focusLabel.b_promoteText > a`,
      (el) => el.getAttribute("href")
    );
  }

  packageData.urlToTracking = url;
  packageData.expectedDelDate = expectedDeliveryDate;
  packageData.carrier = carrier;

  await browser.close();

  return packageData;
};

module.exports = { trackingScraper };
