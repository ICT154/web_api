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

    const judul = selector.find(".ket")
        .find('div[class="sp-hl linkto-black"] > h1')
        .text()
        .trim();

    const gambar = selector.find("img")
        // .find('div[class="lozad imgnya-listberita"] > img')
        // .attr('src')
        .attr('data-src')
        // .text();
        .trim();

    const link = selector.find("a")
        .attr('href')
        .trim();

    const author = "GOZAL"
    const sumber = "kontan.co.id"
    return {
        judul,
        // deskripsi,
        gambar,
        link,
        author,
        sumber
    };
};


const api_kontan = async () => {
    const steamUrl =
        "https://investasi.kontan.co.id/";

    const html = await fethHtml(steamUrl);

    const selector = cheerio.load(html);

    const searchResults = selector(".list-berita").find(
        "#list-news > li"
    );

    const kontan = searchResults
        .map((idx, el) => {
            const elementSelector = selector(el);
            return extractDeal(elementSelector);
        })
        .get();

    return kontan;
};

module.exports = api_kontan;
