// const getUser = id => {     setTimeout(() => {       console.log("Reading a
// user from database...");       return { id: id, giHubUsername: "galala" }; },
// 2000);   }; // Callbacks // Promises // Async/await console.log("Before");
// const user = getUser(1); console.log(user);  // undefined
// console.log("After"); Callback ------------------------------------------
// Start const getUser = (id, callback) => {   setTimeout(() => {
// console.log("Reading a user from database...");     callback({ id: id,
// giHubUsername: "galala" });   }, 2000); }; const getRepositories = (username,
// callback) => {   setTimeout(() => { console.log("Calling GitHub API...");
// callback(["repo1", "repo2", "repo3"]);   }, 2000); }; console.log("Before");
// getUser(1, user => { console.log("User: ", user);
// getRepositories(user.username, repos => console.log("Repos: ", repos)); });
// console.log("After"); Callback ------------------------------------------ End
// Promises ------------------------------------------ Start const getUser = id
// => {   return new Promise((resolve, reject) => {     setTimeout(() => {
// console.log("Reading a user from database...");       resolve({ id: id,
// giHubUsername: "galala" });     }, 2000);   }); }; const getRepositories =
// username => {   return new Promise((resolve, reject) => {     setTimeout(()
// => {       console.log("Calling GitHub API...");       resolve(["repo1",
// "repo2", "repo3"]);     }, 2000);   }); }; const getCommits = repo => {
// return new Promise((resolve, reject) => {     setTimeout(() => {
// console.log("Calling GitHub API...");       resolve(["commit"]);     },
// 2000);   }); }; console.log("Before"); getUser(1)   .then(user =>
// getRepositories(user.giHubUsername))   .then(repos => getCommits(repos[0]))
// .then(commits => console.log("Commits: ", commits))   .catch(err =>
// console.log("Error: ", err.message)); console.log("After"); Promises
// ------------------------------------------ End Async and Await
// ------------------------------------------ Start

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
