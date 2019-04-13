Promise.resolve("test")
  .then(data => {
    console.log(data);
    return "test2";
  })
  .then(data => {
    console.log(data);
  })
  .then(data => {
    console.log(data);
    return "test4";
  });
