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

const withTimeout = (ms) => (promise) => {
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Timeout")), ms)
  );
  return Promise.race([promise, timeout]);
};

const withRetry = (attempts = 3) => async (fn) => {
  let lastError;

  for (let i = 0; i < attempts; i++) {
    try {
      return await Promise.resolve(fn());
    } catch (err) {
      lastError = err;
    };
  };

  throw lastError;
};

const withFallback = (fallbackPromise) => (promise) => {
  return Promise.any([promise, fallbackPromise]);
};

const result = async (promise) => {
  const [result] = await Promise.allSettled([promise]);
  return result.status === "fulfilled" ? result.value : null;
};

const search = async () => {
  try {
    const timeout = withTimeout(1000);
    const retry = withRetry(2);
    const userPromise = timeout(fetchUser(1));
    const postsPromise = userPromise.then((user) =>
      timeout(retry(() => fetchPosts(user.id)))
    );
    const recommendationPromise = withFallback(
      new Promise((resolve) => setTimeout(() => resolve(["Fallback"]), 200))
    )(fetchRecommendations());
    const [user, posts] = await Promise.all([userPromise, postsPromise]);
    const recommendations = await result(recommendationPromise);

    return {user, posts, recommendations};
  } catch (error) {
    throw {message: "Search failed", cause: error};
  };
};

search()
  .then((result) => {
    console.log("Result:", result);
  })
  .catch((err) => {
    console.error("Error:",err);
  });
