export default async function apiResponse(urlRequest: string) {
  const request = urlRequest;
  const rawData = await fetch(request);
  const response = await rawData.json();

  return response.bpi;
}
