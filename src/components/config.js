
const aliases = {
  myUrl: "VITE_API_BASE_URL",
  
};

export function getConfigValue(alias) {
  const envKey = aliases[alias];
  return import.meta.env[envKey];
}

// so how are we accessing our env .

// => iys done using process.env. Because PROCESS.ENV is an global object that gives access to enviroment Variables .
// it is provided by Node.js
