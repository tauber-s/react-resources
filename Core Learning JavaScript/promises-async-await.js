const fetchUser = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("User fetched");
      resolve({ id, name: "Andy" });
    }, 300);
  });
};

const fetchPosts = (userId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Posts fetched");
      resolve(["Post 1", "Post 2"]);
    }, 500);
  });
};

const fetchRecommendations = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Recommendation failed");
      reject("Recommendation failed");
    }, 400);
  });
};

const withTimeout = (promise, ms) => {
  const timeout = new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), ms));
  return Promise.race([promise, timeout]);
};

const retry = async (fn, attempts = 3) => {
  let lastError;

  for (let i = 0; i < attempts; i++) {
    try {
      return await Promise.resolve(fn());
    } catch (err) {
      lastError = err;
    };
  };
  return Promise.reject(lastError);
};

const search = async () => {
  try {
    const userPromise = Promise.resolve(fetchUser(1));
    const postsPromise = userPromise.then((user) => retry(() => fetchPosts(user.id), 2));
    const recommendationPromise = Promise.any([
      fetchRecommendations(),
      new Promise((resolve) =>
        setTimeout(() => resolve(["Fallback"]), 200)
      ),
    ]);
    const [user, posts] = await Promise.all([
      withTimeout(userPromise, 1000),
      withTimeout(postsPromise, 1000),
    ]);
    const optionalData = await Promise.allSettled([recommendationPromise]);
    const recommendations = optionalData[0].status === "fulfilled" ? optionalData[0].value : [];

    return { user, posts, recommendations };
  } catch (error) {
    return Promise.reject({ message: "Search failed", cause: error });
  };
};

search()
  .then((result) => {
    console.log("Result:", result);
  })
  .catch((err) => {
    console.error("Error:",err);
  });

/*
const fetchUser = userId => {
  return new Promise((resolve) => {
    console.log("Searching user...");

    setTimeout(() => {
      resolve({ id: userId, name: "Andy"});
    }, 1000);
  });
};

const fetchPosts = userId => {
  return new Promise((resolve) => {
    console.log("Searching posts...");

    setTimeout(() => {
      resolve(["Post 1", "Post 2", "Post 3"]);
    }, 1000);
  });
};

const search = async () => {
  try {
    const [user, posts] = await Promise.all([
      fetchUser(1),
      fetchPosts(1),
    ]);

    console.log("User:", user);
    console.log("Posts:", posts);
  } catch (error) {
    console.error("Error:", error);
  };
};

search();
*/
