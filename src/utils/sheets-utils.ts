// Fetch a Google Sheet's data. Assume first row is the header.
const fetchSheet = async (apiKey: string, sheetId: string, range = "Sheet1!A:Z") => {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;
  const res = await fetch(url);
  const data = await res.json();

  if (!data.values || data.values.length === 0) {
    return [];
  }

  const [header, ...rows] = data.values;

  return rows.map((row: { [x: string]: any; }) =>
    Object.fromEntries(
      header.map((key: any, i: string | number) => [key, row[i] || null])
    )
  );
}

export {
  fetchSheet,
}