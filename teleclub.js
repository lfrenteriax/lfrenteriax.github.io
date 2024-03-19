function activarTele(){
  const url = 'https://corsproxy.io/?url=https://tv.teleclub.xyz/activar';
  
  const data = "submit=ACTIVAR%252BAHORA%252521";
  
  const response = await fetch(url, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: data,
  });
}
