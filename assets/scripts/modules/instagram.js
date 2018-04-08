console.log("Starting instagram..");

const instagramContainer = document.querySelector(".instagram__container");
const fetchData = (url) => {
  return fetch(url)
    .then((data) => data.json())
    .then((json) => {
      if (json) {
        return Promise.resolve(json);
      } else {
        return Promise.reject(Error("json is undefined!"));
      }
    });
};
const addPost = (container, src, href, caption) => {
  const link = document.createElement("a");
  link.classList.add("instagram__link");
  link.setAttribute("href", href);
  link.setAttribute("target", "_blank");

  const post = document.createElement("img");
  post.classList.add("instagram__image");
  post.setAttribute("src", src);
  post.setAttribute("alt", caption);

  link.appendChild(post);
  container.appendChild(link);
};
const createPosts = ({ data }) => {
  instagramContainer.textContent = "";
  data.map((post, index) => {
    if (index <= 4) {
      addPost(
        instagramContainer,
        post.images.thumbnail.url,
        post.link,
        post.caption.text,
      );
    }
  });
};

const base = "https://api.instagram.com/v1/users/self/media/recent/";
const token = "7287561625.27aa922.66b1900e83104eafb449d1081fdc03b6";

fetchData(`${base}?access_token=${token}`)
  .then((data) => createPosts(data))
  .catch((error) => console.error(error));
