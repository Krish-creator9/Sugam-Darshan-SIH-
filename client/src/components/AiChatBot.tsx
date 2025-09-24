import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AiChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ from: 'user' | 'bot'; text: string }>>([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const send = async () => {
    if (!text.trim()) return;
    const userText = text.trim();
    setMessages((m) => [...m, { from: 'user', text: userText }]);
    setText("");
    setLoading(true);
    try {
      // send last N messages for context
      const recent = [...messages.slice(-6), { from: 'user', text: userText }];
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: recent }),
      });
      const ct = res.headers.get('content-type') || '';
      const txt = await res.text();
      if (!res.ok) throw new Error(txt || 'Chat failed');
      const data = ct.includes('application/json') ? JSON.parse(txt) : { answer: txt };
      // add quick-reply suggestions if provided
      setMessages((m) => [...m, { from: 'bot', text: data.answer }]);
      if (data.suggestions) setSuggestions(data.suggestions);
      // persist
      try { localStorage.setItem('temple_chat_history', JSON.stringify([...messages, { from: 'user', text: userText }, { from: 'bot', text: data.answer }].slice(-50))); } catch {}
    } catch (err: any) {
      setMessages((m) => [...m, { from: 'bot', text: 'Sorry, I could not fetch an answer right now.' }]);
    } finally {
      setLoading(false);
    }
  };

  // persisted history and suggestions
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // load history once
  useState(() => {
    try {
      const raw = localStorage.getItem('temple_chat_history');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setMessages(parsed.slice(-50));
      }
    } catch (e) {}
  });

  const sendQuick = (s: string) => {
    setText(s);
    setSuggestions([]);
    // small delay to allow input change
    setTimeout(() => send(), 100);
  };

  return (
    <div style={{ position: 'fixed', right: 18, bottom: 18, zIndex: 60 }}>
      {/* Compact circular robot button */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
        <button
          aria-label={open ? 'Close Temple Assistant' : 'Open Temple Assistant'}
          onClick={() => setOpen((v) => !v)}
          style={{
            width: 56,
            height: 56,
            borderRadius: '50%',
            border: 'none',
            boxShadow: '0 6px 18px rgba(0,0,0,0.18)',
            background: 'linear-gradient(180deg, #fff 0%, #f8fafc 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          {/* Cute robot SVG with a traditional dhoti and shawl (inline, small) */}
          <svg width="36" height="36" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="g1" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%" stopColor="#FDE68A" />
                <stop offset="100%" stopColor="#FB923C" />
              </linearGradient>
            </defs>
            <rect x="8" y="12" width="48" height="36" rx="8" fill="#E6EEF8" />
            <circle cx="32" cy="24" r="8" fill="#fff" />
            <circle cx="28" cy="22" r="1.6" fill="#374151" />
            <circle cx="36" cy="22" r="1.6" fill="#374151" />
            <rect x="28" y="26" width="8" height="2" rx="1" fill="#94A3B8" />
            {/* Traditional shawl */}
            <path d="M20 38 C28 46, 36 46, 44 38 L44 44 L20 44 Z" fill="url(#g1)" opacity="0.95" />
            {/* Dhoti */}
            <path d="M18 44 L46 44 L40 58 L24 58 Z" fill="#F59E0B" opacity="0.9" />
            {/* Small tilak on forehead */}
            <rect x="31" y="16" width="2" height="4" rx="1" fill="#DC2626" />
          </svg>
        </button>

        {/* Compact panel */}
        {open && (
          <div style={{
            marginTop: 10,
            width: 300,
            borderRadius: 12,
            background: 'white',
            boxShadow: '0 12px 40px rgba(2,6,23,0.2)',
            overflow: 'hidden',
            fontSize: 13,
          }}>
            <div style={{ padding: '8px 10px', borderBottom: '1px solid #eef2ff', display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: '#EEF2FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="8" r="3" fill="#fff" />
                  <rect x="8" y="11" width="8" height="2" rx="1" fill="#fff" />
                </svg>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600 }}>Temple Assistant</div>
                <div style={{ color: '#6b7280', fontSize: 12 }}>Ask about timings, parking or puja</div>
              </div>
            </div>
            <div style={{ padding: 8, maxHeight: 220, overflow: 'auto' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {messages.length === 0 && (
                  <div style={{ color: '#6b7280', fontSize: 13 }}>Hi! I'm your temple assistant. Try: "Prasad timings"</div>
                )}
                {messages.map((m, i) => (
                  <div key={i} style={{ alignSelf: m.from === 'user' ? 'flex-end' : 'flex-start', maxWidth: '80%' }}>
                    <div style={{ padding: '6px 8px', borderRadius: 8, background: m.from === 'user' ? '#2563EB' : '#F3F4F6', color: m.from === 'user' ? 'white' : '#111827' }}>{m.text}</div>
                  </div>
                ))}
                {loading && (
                  <div style={{ alignSelf: 'flex-start' }}><div style={{ padding: '6px 8px', borderRadius: 8, background: '#F3F4F6', color: '#374151' }}>Typing...</div></div>
                )}
                {suggestions.length > 0 && (
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {suggestions.map((s, idx) => (
                      <button key={idx} onClick={() => sendQuick(s)} style={{ background: '#EEF2FF', borderRadius: 999, padding: '6px 10px', border: 'none', cursor: 'pointer', fontSize: 12 }}>{s}</button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div style={{ padding: 8, borderTop: '1px solid #f1f5f9', display: 'flex', gap: 8 }}>
              <Input value={text} onChange={(e) => setText(e.target.value)} placeholder="Ask about timings, parking..." />
              <Button onClick={send} disabled={loading}>
                {loading ? '...' : 'Ask'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
