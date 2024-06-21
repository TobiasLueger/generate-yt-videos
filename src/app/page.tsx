// src/app/page.js

'use client';

import { useState } from 'react';

export default function Home() {
  const [script, setScript] = useState('');
  const [keyword, setKeyword] = useState('');
  const [fileUrl, setFileUrl] = useState('');

  const handleDownload = async (event:any) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/create-file', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ script, keyword }),
      });
      const data = await response.json();
      if (data.fileName) {
        const downloadUrl = `/${data.fileName}`;
        setFileUrl(downloadUrl);

        // Create a temporary anchor element and trigger the download
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.setAttribute('download', data.fileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      console.error('Error creating file:', error);
    }
  };

  return (
    <div>
      <h1>Create and Download a TXT File</h1>
      <form onSubmit={handleDownload}>
        <div>
          <label>
            Script:
            <textarea value={script} onChange={(e) => setScript(e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            Keyword:
            <input type="text" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
          </label>
        </div>
        <button type="submit">Create File</button>
      </form>
    </div>
  );
}