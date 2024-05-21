export const fetchJson = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    if (!data) {
      throw new Error("No data was returned");
    }
    return data;
  } catch {
    console.error("Error fetching data");
    return null;
  }
};
