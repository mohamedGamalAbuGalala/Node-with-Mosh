const getUser = id => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Reading a user from database...");
      resolve({ id: id, giHubUsername: "galala" });
    }, 2000);
  });
};

const getRepositories = username => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Calling GitHub API...");
      //   resolve(["repo1", "repo2", "repo3"]);
      reject(new Error("couldn't get repos"));
    }, 2000);
  });
};

const getCommits = repo => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Calling GitHub API...");
      resolve(["commit"]);
    }, 2000);
  });
};

// must be a function not a const
async function displayCommits() {
  try {
    const user = await getUser(1);
    const repos = await getRepositories(user.giHubUsername);
    const commit = await getCommits(repos[0]);
    console.log(commit);
  } catch (err) {
    console.log("Error", err.message);
  }
}

console.log("Before");

displayCommits();

console.log("After");

// Async and Await ------------------------------------------ End
