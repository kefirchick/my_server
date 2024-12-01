const axios = require("axios");

const HEADERS = {
    headers: {
        "X-API-KEY": "0cdceb70-6d1b-4fa7-a3a9-a43284cdbae7",
        "Content-Type": "application/json",
    },
};
const BASE_URL = "https://kinopoiskapiunofficial.tech";
const DELAY_TIME = 200; // Increase to avoid error 429
const ENDPOINT = "/api/v2.2/films/top";
const TOTAL_PAGES = 13;

function getURL(endPoint, base, page) {
    const url = new URL(endPoint, base);
    url.searchParams.append("page", `${page}`);

    return url;
}

function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getTop250() {
    const films = [];
    console.log("Fetching, please wait...");
    try {
        for (let i = 1; i <= TOTAL_PAGES; i++) {
            const result = await axios.get(getURL(ENDPOINT, BASE_URL, i), HEADERS);
            films.push(...result.data.films);
            await delay(DELAY_TIME);
        }
    } catch (error) {
        throw new Error(
            `Error: ${error.status ?? ""}\n${
                error.response?.data?.message ?? error.message
            }`
        );
    }

    return films;
}

(async () => {
    try {
        const top250 = await getTop250();
        console.log(top250.map((film) => film.nameRu));
    } catch (error) {
        console.log(error.message);
    }
})();
