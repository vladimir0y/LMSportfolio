"use client";
import { useEffect, useRef } from 'react';

export default function LaunchScorm({ params }: { params: { id: string } }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Placeholder: load a SCORM player URL when backend endpoint is ready
    // For unauthenticated playback per requirements
  }, []);

  return (
    <main className="container-responsive py-6">
      <div className="aspect-video w-full">
        <iframe ref={iframeRef} className="w-full h-full rounded-lg border" srcDoc="<html><body style='display:flex;align-items:center;justify-content:center;font-family:sans-serif'>SCORM player placeholder</body></html>"></iframe>
      </div>
    </main>
  );
}


