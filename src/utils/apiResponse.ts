export default async function apiResponse(urlRequest: string) {

  try {
    const rawData = await fetch(urlRequest);
    const response = await rawData.json();

    return response.bpi;

  } catch (error) {
    console.error(error);
  }

}
