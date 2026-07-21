import { toast } from 'sonner';

export async function copyText(text, label = 'Copied to clipboard') {
  try {
    await navigator.clipboard.writeText(String(text ?? ''));
    toast.success(label);
    return true;
  } catch (e) {
    toast.error('Could not copy');
    return false;
  }
}

export function downloadFile(filename, content, mime = 'text/plain') {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  toast.success('File downloaded');
}
