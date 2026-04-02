import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewChecked
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { trigger, style, animate, transition } from '@angular/animations';

// ── Types ──────────────────────────────────────────────
interface ChatMessage {
  type: 'bot' | 'customer';
  message: string;        // displayed HTML (bot) or plain text (user)
}

// OpenAI-compatible message shape sent to the Worker
interface HistoryEntry {
  role: 'user' | 'assistant';
  content: string;        // always plain text for the AI
}

// ── Component ──────────────────────────────────────────
@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.css'],
  animations: [
    trigger('panelSlide', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(16px) scale(0.95)' }),
        animate('250ms cubic-bezier(0.34, 1.56, 0.64, 1)',
          style({ opacity: 1, transform: 'translateY(0) scale(1)' }))
      ]),
      transition(':leave', [
        animate('180ms ease-in',
          style({ opacity: 0, transform: 'translateY(12px) scale(0.95)' }))
      ])
    ])
  ]
})
export class ChatbotComponent implements AfterViewChecked {

  @ViewChild('messagesContainer')
  private messagesContainer!: ElementRef<HTMLDivElement>;

  // ── Your Cloudflare Worker URL ──
  private readonly WORKER_URL = 'https://holy-scene-3416.manavnanda2404.workers.dev/';

  // ── State ──
  chatMessage = '';
  isThinking  = false;

  // Conversation history sent to the worker (plain text only)
  private conversationHistory: HistoryEntry[] = [];

  // What's rendered in the UI
  chatsArray: ChatMessage[] = [
    {
      type: 'bot',
      message: `<p>Hi there! 👋 I'm <strong>MN.AI</strong>, Manav's personal assistant.</p>
                <p>I can answer questions about his <strong>skills</strong>, <strong>projects</strong>,
                <strong>experience</strong>, certifications, or help you get in touch.
                What would you like to know?</p>`
    }
  ];

  // Quick-prompt chips shown on first load
  quickPrompts = [
    'What tech does Manav use?',
    'Tell me about Gecko Portal',
    'Is Manav available for hire?',
    "What's his experience?",
    'What certifications does he have?'
  ];

  // ── Auto-scroll ──────────────────────────────────────
  private shouldScroll = false;

  ngAfterViewChecked() {
    if (this.shouldScroll) {
      this.scrollToBottom();
      this.shouldScroll = false;
    }
  }

  private scrollToBottom() {
    try {
      const el = this.messagesContainer.nativeElement;
      el.scrollTop = el.scrollHeight;
    } catch { /* ignore */ }
  }

  // ── Keyboard handler ─────────────────────────────────
  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.chatWithAgent();
    }
  }

  // ── Quick prompt ─────────────────────────────────────
  sendQuick(prompt: string) {
    this.chatMessage = prompt;
    this.chatWithAgent();
  }

  // ── Main send → Worker call ──────────────────────────
  async chatWithAgent() {
    const msg = this.chatMessage.trim();
    if (!msg || this.isThinking) return;

    // 1. Show user message in UI
    this.chatsArray.push({ type: 'customer', message: msg });
    this.chatMessage   = '';
    this.isThinking    = true;
    this.shouldScroll  = true;

    // 2. Add to history as 'user' turn (plain text)
    this.conversationHistory.push({ role: 'user', content: msg });

    try {
      // 3. Call the Cloudflare Worker
      const response = await fetch(this.WORKER_URL, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: msg,
          // Send history *excluding* the message we just added
          // (worker appends it itself to avoid duplication)
          history: this.conversationHistory.slice(0, -1)
        })
      });

      if (!response.ok) {
        const errBody = await response.text().catch(() => '');
        throw new Error(`Worker responded ${response.status}: ${errBody}`);
      }

      const data = await response.json();

      // Worker returns { reply: string }
      const rawReply: string =
        data?.reply ??
        data?.message ??
        "Sorry, I didn't get a valid response. Please try again.";

      // 4. Format for display and push to UI
      const formattedReply = this.formatReply(rawReply);
      this.chatsArray.push({ type: 'bot', message: formattedReply });

      // 5. Store the plain-text assistant reply in history
      this.conversationHistory.push({ role: 'assistant', content: rawReply });

      // 6. Keep history from growing too large (max 20 turns = 10 exchanges)
      if (this.conversationHistory.length > 20) {
        this.conversationHistory = this.conversationHistory.slice(-20);
      }

    } catch (err: unknown) {
      console.error('Chatbot error:', err);
      this.chatsArray.push({
        type: 'bot',
        message: `<p>Sorry, I ran into a connection issue. You can reach Manav directly at
                  <strong>nandamanav7@gmail.com</strong> 📧</p>`
      });
      // Remove the failed user turn from history so the next retry is clean
      this.conversationHistory.pop();

    } finally {
      this.isThinking   = false;
      this.shouldScroll = true;
    }
  }

  // ── Markdown → safe HTML ─────────────────────────────
  private formatReply(text: string): string {
    // 1. Escape any raw HTML coming from the AI
    let safe = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // 2. Inline markdown
    safe = safe
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')   // **bold**
      .replace(/\*(.+?)\*/g,     '<em>$1</em>')            // *italic*
      .replace(/`(.+?)`/g,       '<code>$1</code>');       // `code`

    // 3. Bullet lines (-, •, *)
    safe = safe.replace(/^[-•*]\s+(.+)$/gm, '<li>$1</li>');

    // 4. Wrap consecutive <li> blocks in <ul>
    safe = safe.replace(/(<li>[\s\S]*?<\/li>\n?)+/g,
      (block) => `<ul>${block}</ul>`);

    // 5. Split on double newlines → paragraphs
    const paragraphs = safe
      .split(/\n{2,}/)
      .map(p => p.trim())
      .filter(Boolean);

    // 6. Lines that are already block elements pass through unwrapped
    return paragraphs
      .map(p => {
        if (p.startsWith('<ul>') || p.startsWith('<li>')) return p;
        return `<p>${p.replace(/\n/g, '<br>')}</p>`;
      })
      .join('');
  }
}