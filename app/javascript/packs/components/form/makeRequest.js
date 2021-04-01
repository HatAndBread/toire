const makeRequest = async (requestBody, requestUrl, requestType, onError, onSubmit) => {
  if (!Object.keys(requestBody).length) return;
  const res = await fetch(requestUrl, {
    method: requestType,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-CSRF-Token': document.getElementsByName('csrf-token')[0].content
    },
    credentials: 'same-origin',
    body: JSON.stringify(requestBody)
  });
  const data = await res.json();
  if (!data || data.errors || data.error) {
    if (typeof onError === 'function') {
      if (data.errors) {
        onError(data.errors);
      } else if (data.error) {
        onError(data.error);
      } else {
        onError('Something went wrong');
      }
      return;
    } else {
      return console.error('Error in ReactForm Component. No error callback given.');
    }
  }
  if (typeof onSubmit === 'function') onSubmit(data);
};

export default makeRequest;
