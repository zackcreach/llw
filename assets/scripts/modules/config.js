const config = {};

config.custom = {
    api_url: process.env.API_URL || "https://inboxlab-api-prod.herokuapp.com",
    brand_id: process.env.BRAND_ID || "5a3bf5243f05d8000f28696d",
    // api_url: process.env.API_URL || "https://inboxlab-api-dev.herokuapp.com",
    // brand_id: process.env.BRAND_ID || "5a0cb27f09666a000f743cfa",
};

export default config;
