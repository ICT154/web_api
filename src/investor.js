const cheerio = require("cheerio");
const axios = require("axios").default;


const fethHtml = async url => {
    try {
        const { data } = await axios.get(url);
        return data;
    } catch {
        console.error(
            `ERROR: An error occurred while trying to fetch the URL: ${url}`
        );
    }
};

const extractDeal = selector => {
    const judul = selector.find(".col-md-9")
        .find('p[class="font-summary-semibold mb5"]')
        .text()
        // .replace(/\s\s+/9, '')
        .trim();

    const deskripsi = selector.find(".col-md-9")
        .find('p[class="font-summary mb10"]')
        .text()
        // .replace(/\s\s+/9, '')
        .trim();

    const gambar = selector.find("img")
        .attr('src')
        // .replace(/\s\s+/9, '')
        .trim();

    const link = selector.find("a")
        .attr('href')
        // .replace(/\s\s+/9, '')
        .trim();
    const author = "GOZAL"
    const sumber = "https://investor.id/market"

    return {
        judul,
        deskripsi,
        gambar,
        link,
        author,
        sumber
    };
};



const api_investor = async () => {
    const steamUrl =
        "https://investor.id/market";

    const html = await fethHtml(steamUrl);

    const selector = cheerio.load(html);

    const searchResults = selector(".loadarticles").find(
        "div[class='row']"
    );

    const investor = searchResults
        .map((idx, el) => {
            const elementSelector = selector(el);
            return extractDeal(elementSelector);
        })
        .get();

    return investor;
};

module.exports = api_investor;
