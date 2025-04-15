import environment from "@/config/environment";

export async function uploadFile(file: File) {
  const res = await fetch(`${environment.NEXT_PUBLIC_API_URL}/files/get-upload-url`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: file.name,
      type: file.type,
    }),
  });

  if (!res.ok) {
    throw new Error('Failed to get upload URL');
  }

  const data = await res.json();

  const uploadRes = await fetch(data.url, {
    method: 'PUT',
    headers: {
      'Content-Type': file.type,
    },
    body: file,
  });

  if (!uploadRes.ok) {
    throw new Error('File upload failed');
  }

  const publicUrl = data.url.split('?')[0];

  return publicUrl;
}
