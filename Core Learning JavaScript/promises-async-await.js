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
