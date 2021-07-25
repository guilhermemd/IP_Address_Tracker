const btnIpSearch = document.getElementById("btn_ip_search");

async function fetchApi(param) {
  let url = `
  https://geo.ipify.org/api/v1?apiKey=at_LDZhbJcnGgV7mnIZ9vV0E82Ubm429&ipAddress=${param}`;

  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  return data;
}

btnIpSearch.addEventListener("click", () => {
  let inputIpSearch = document.getElementById("input_search_ipAddress").value;
  const dataFromIP = fetchApi(inputIpSearch);
  console.log(dataFromIP);
});

