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
    const judul = selector.find("h2")
        .text()
        // .replace(/\s\s+/9, '')
        .trim();

    const deskripsi = selector.find(".wrapper-description")
        .find('div[class="wrapper-description"] > div[class="description width-list-market-small2"]')
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
    const sumber = "https://market.bisnis.com/"

    return {
        judul,
        deskripsi,
        gambar,
        link,
        author,
        sumber
    };
};




const api_bisnis = async () => {
    const steamUrl =
        "https://market.bisnis.com/";

    const html = await fethHtml(steamUrl);

    const selector = cheerio.load(html);

    const searchResults = selector(".list-news").find(
        "li"
    );

    const bisnis = searchResults
        .map((idx, el) => {
            const elementSelector = selector(el);
            return extractDeal(elementSelector);
        })
        .get();

    return bisnis;
};

module.exports = api_bisnis;
