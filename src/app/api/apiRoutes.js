const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!BASE_URL) {
  throw new Error('NEXT_PUBLIC_API_BASE_URL is not defined');
}

export const fetchFromApi = async (endpoint, options = {}) => {
  const url = `${BASE_URL}${endpoint}`;
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Failed to fetch from ${url}: ${response.statusText}`);
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    } else {
      throw new Error('Response was not JSON');
    }
  } catch (error) {
    console.error('Caught error in fetchFromApi:', error);
    return { error: error.message };
  }
};


export const postToApi = async (endpoint, data) => {
  return fetchFromApi(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};