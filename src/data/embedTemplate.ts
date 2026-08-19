export const STANDALONE_HTML_EMBED = `<!-- ==========================================================================
  THE MENTAL MODELS DECISION COMPANION (Single-File Embed Code)
  Self-contained, responsive cognitive decision-making widget.
  Designed for chungbooks.fr (Vanilla HTML5, CSS3 & JavaScript — Zero Dependencies)
========================================================================== -->

<div id="mental-models-app" class="mm-container">
  <!-- Header Banner -->
  <header class="mm-header">
    <div class="mm-badge">Cognitive Frameworks &bull; chungbooks.fr</div>
    <h2 class="mm-title">The Mental Models Decision Companion</h2>
    <p class="mm-subtitle">
      Step outside cognitive blind spots. Input your current dilemma and draw a proven mental model for immediate perspective.
    </p>
  </header>

  <!-- Dilemma Input Section -->
  <section class="mm-input-card">
    <label for="mm-dilemma-input" class="mm-label">
      <span>What dilemma or decision is on your mind?</span>
      <span class="mm-optional">(Optional)</span>
    </label>
    <textarea 
      id="mm-dilemma-input" 
      class="mm-textarea" 
      rows="2" 
      placeholder="e.g., Should I launch my new project now, or wait for more security?"
    ></textarea>
    
    <div class="mm-presets">
      <span class="mm-presets-label">Quick prompts:</span>
      <button type="button" class="mm-preset-btn" onclick="mmSetPrompt('Should I change career directions or double down on my current trajectory?')">Career choice</button>
      <button type="button" class="mm-preset-btn" onclick="mmSetPrompt('Should I say YES to this new commitment or protect my personal focus?')">Commitment vs Focus</button>
      <button type="button" class="mm-preset-btn" onclick="mmSetPrompt('How can I resolve a difficult interpersonal friction with clarity?')">Interpersonal friction</button>
      <button type="button" class="mm-preset-btn" onclick="mmSetPrompt('Should we pivot our project strategy or persevere through initial resistance?')">Pivot vs Persevere</button>
      <button type="button" class="mm-preset-btn" onclick="mmSetPrompt('Is this bold experiment worth the downside risk?')">Bold Experiment</button>
    </div>

    <!-- Action Buttons -->
    <div class="mm-actions">
      <button id="mm-draw-btn" class="mm-primary-btn" onclick="mmDrawModel()">
        <span class="mm-btn-icon">&#9678;</span>
        <span id="mm-btn-text">Draw a Cognitive Model</span>
      </button>
      <button id="mm-random-btn" class="mm-secondary-btn" onclick="mmDrawRandom()" title="Draw random model directly">
        &#8635; Quick Spin
      </button>
    </div>
  </section>

  <!-- Interactive Result Card / Shuffle Display Area -->
  <div id="mm-result-area" class="mm-result-wrapper">
    <!-- 1. Initial Empty Placeholder State -->
    <div id="mm-empty-state" class="mm-empty-box">
      <div class="mm-compass-icon">&#10022;</div>
      <h3 class="mm-empty-title">Awaiting Your Decision Draw</h3>
      <p class="mm-empty-desc">
        Enter your dilemma above and click <strong>"Draw a Cognitive Model"</strong> to generate an actionable 2-sentence perspective.
      </p>
      <button type="button" class="mm-empty-action-btn" onclick="mmDrawModel()">
        &#10024; Draw a Model Now
      </button>
    </div>

    <!-- 2. Shuffling Animation State -->
    <div id="mm-shuffling-state" class="mm-shuffling-box" style="display: none;">
      <div class="mm-spinner"></div>
      <p class="mm-shuffling-label">Consulting cognitive frameworks...</p>
      <p id="mm-shuffling-name" class="mm-shuffling-text">Inversion...</p>
    </div>

    <!-- 3. Active Revealed Result Card -->
    <article id="mm-active-card" class="mm-card" style="display: none;">
      <!-- Card Eyebrow & Header -->
      <div class="mm-card-header">
        <div class="mm-card-meta">
          <div class="mm-tag-row">
            <span class="mm-accent-line"></span>
            <span id="mm-card-category" class="mm-card-tag">Strategic Thinking</span>
            <span class="mm-meta-dot">&bull;</span>
            <span id="mm-card-thinker" class="mm-card-author">Aristotle &amp; Descartes</span>
          </div>
          <h3 id="mm-card-title" class="mm-card-title">First Principles Thinking</h3>
          <p id="mm-card-subtitle" class="mm-card-subtitle">Reasoning from Fundamental Truths</p>
        </div>

        <!-- Header Quick Action Buttons -->
        <div class="mm-quick-actions">
          <button type="button" id="mm-copy-top-btn" class="mm-icon-btn" onclick="mmCopyInsight()" title="Copy practical application">
            <span id="mm-copy-icon">&#128203;</span>
            <span id="mm-copy-text">Copy Insight</span>
          </button>
          <button type="button" class="mm-icon-btn mm-btn-highlight" onclick="mmOpenShare()" title="Share your insight">
            <span>&#10150;</span>
            <span>Share</span>
          </button>
        </div>
      </div>

      <!-- Applied Dilemma Context Banner -->
      <div id="mm-user-dilemma-box" class="mm-dilemma-quote" style="display: none;">
        <span class="mm-quote-label">Applied Dilemma:</span>
        <span id="mm-user-dilemma-text" class="mm-quote-text"></span>
      </div>

      <!-- Core Principle Definition -->
      <div class="mm-section">
        <h4 class="mm-section-title">The Principle</h4>
        <p id="mm-card-definition" class="mm-definition-text"></p>
      </div>

      <!-- 2-Sentence Actionable Application (Hero Section) -->
      <div class="mm-section mm-highlight-section">
        <div class="mm-section-header-tag">
          <span class="mm-bolt-icon">&#9889;</span>
          <h4 class="mm-highlight-title">2-Sentence Practical Application</h4>
        </div>
        <p id="mm-card-application" class="mm-application-text"></p>
      </div>

      <!-- Reflection Question -->
      <div class="mm-section mm-question-section">
        <h4 class="mm-section-title">&#9670; Core Reflection Question</h4>
        <p id="mm-card-question" class="mm-question-text"></p>
      </div>

      <!-- Micro Action Box -->
      <div class="mm-section mm-microaction-section">
        <h4 class="mm-section-title">&#9656; 2-Minute Concrete Action</h4>
        <p id="mm-card-microaction" class="mm-microaction-text"></p>
      </div>

      <!-- Case Study & Blind Spot Grid -->
      <div class="mm-detail-grid">
        <div class="mm-detail-box">
          <h4 class="mm-detail-title">&#128218; Historical Case Study</h4>
          <p id="mm-card-case-study" class="mm-detail-text"></p>
        </div>
        <div class="mm-detail-box">
          <h4 class="mm-detail-title">&#128737; Cognitive Trap Shielded</h4>
          <p id="mm-card-blind-spot" class="mm-detail-text"></p>
        </div>
      </div>

      <!-- Recommended Book Banner -->
      <div class="mm-book-banner">
        <span>&#128214; <strong>Recommended Treatise:</strong> <em id="mm-card-book"></em></span>
      </div>

      <!-- Card Footer Actions -->
      <div class="mm-card-footer">
        <div class="mm-footer-buttons">
          <button type="button" class="mm-next-btn" onclick="mmDrawModel()">
            &#10024; Draw Another Model for this Dilemma
          </button>
          <button type="button" class="mm-share-insight-btn" onclick="mmOpenShare()">
            &#10150; Share Your Insight
          </button>
        </div>
        <span class="mm-footer-note">Curated for classic decision analysis &bull; chungbooks.fr</span>
      </div>
    </article>
  </div>

  <!-- Built-in Share Modal Dialog -->
  <div id="mm-share-modal" class="mm-modal-overlay" style="display: none;" onclick="if(event.target===this) mmCloseShare()">
    <div class="mm-modal-box">
      <div class="mm-modal-header">
        <div>
          <span class="mm-modal-badge">Share Insight</span>
          <h3 class="mm-modal-title" id="mm-modal-model-title">Mental Model</h3>
        </div>
        <button type="button" class="mm-close-btn" onclick="mmCloseShare()" aria-label="Close">&times;</button>
      </div>
      <div class="mm-modal-body">
        <p class="mm-share-desc">Share this 2-sentence breakdown with your network or team:</p>
        <div class="mm-share-preview" id="mm-share-preview-text"></div>
        
        <!-- Social Channels -->
        <div class="mm-share-channels">
          <a id="mm-share-wa" href="#" target="_blank" rel="noopener noreferrer" class="mm-channel-btn mm-wa-btn">
            <span>&#128172;</span> WhatsApp
          </a>
          <a id="mm-share-tw" href="#" target="_blank" rel="noopener noreferrer" class="mm-channel-btn mm-tw-btn">
            <span>&#120143;</span> X / Twitter
          </a>
          <a id="mm-share-mail" href="#" class="mm-channel-btn mm-mail-btn">
            <span>&#9993;</span> Email
          </a>
        </div>

        <!-- Copy Link Row -->
        <div class="mm-copy-row">
          <input type="text" id="mm-share-url-input" class="mm-share-input" readonly />
          <button type="button" id="mm-modal-copy-btn" class="mm-copy-action-btn" onclick="mmCopyShareLink()">
            Copy Link
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
/* ==========================================================================
   CSS STYLING: Earth-Tones & Minimalist Bookish Aesthetic (chungbooks.fr)
   ========================================================================== */
#mental-models-app {
  --mm-cream: #FDFCF0;
  --mm-charcoal: #2D2C2A;
  --mm-terracotta: #C16657;
  --mm-slate: #718894;
  --mm-stone: #EAE7E0;
  --mm-stone-light: #FAF8F2;
  --mm-card-bg: #FFFFFF;
  --mm-font-serif: Georgia, Cambria, 'Times New Roman', Times, serif;
  --mm-font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  
  font-family: var(--mm-font-sans);
  color: var(--mm-charcoal);
  background-color: var(--mm-cream);
  padding: 32px 24px;
  border-radius: 28px;
  max-width: 760px;
  margin: 0 auto;
  box-sizing: border-box;
  line-height: 1.6;
  border: 1px solid var(--mm-stone);
  box-shadow: 0 10px 30px -4px rgba(45, 44, 42, 0.05);
}

#mental-models-app * {
  box-sizing: border-box;
}

/* Header */
.mm-header {
  text-align: center;
  margin-bottom: 24px;
}
.mm-badge {
  display: inline-block;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-weight: 700;
  color: var(--mm-terracotta);
  background: var(--mm-stone-light);
  padding: 4px 12px;
  border-radius: 999px;
  margin-bottom: 10px;
  border: 1px solid var(--mm-stone);
}
.mm-title {
  font-family: var(--mm-font-serif);
  font-size: 28px;
  font-weight: 700;
  font-style: italic;
  margin: 0 0 8px 0;
  color: var(--mm-charcoal);
  line-height: 1.25;
}
.mm-subtitle {
  font-size: 13px;
  color: var(--mm-slate);
  max-width: 580px;
  margin: 0 auto;
  line-height: 1.5;
}

/* Input Card */
.mm-input-card {
  background: var(--mm-card-bg);
  border: 1px solid var(--mm-stone);
  border-radius: 20px;
  padding: 20px;
  margin-bottom: 24px;
  box-shadow: 0 4px 16px -2px rgba(45, 44, 42, 0.03);
}
.mm-label {
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--mm-slate);
  margin-bottom: 8px;
}
.mm-optional {
  font-weight: 500;
  text-transform: none;
  color: #9C968E;
}
.mm-textarea {
  width: 100%;
  font-family: var(--mm-font-serif);
  font-style: italic;
  font-size: 15px;
  line-height: 1.4;
  padding: 12px 14px;
  border: 1px solid var(--mm-stone);
  border-radius: 12px;
  background: var(--mm-stone-light);
  color: var(--mm-charcoal);
  resize: vertical;
  outline: none;
  transition: all 0.2s ease;
}
.mm-textarea:focus {
  border-color: var(--mm-terracotta);
  background: #FFFFFF;
}

/* Prompt Presets */
.mm-presets {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
  margin-top: 12px;
}
.mm-presets-label {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--mm-slate);
  margin-right: 2px;
}
.mm-preset-btn {
  background: var(--mm-stone-light);
  border: 1px solid var(--mm-stone);
  color: var(--mm-charcoal);
  font-size: 11px;
  padding: 4px 10px;
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.15s ease;
}
.mm-preset-btn:hover {
  border-color: var(--mm-terracotta);
  color: var(--mm-terracotta);
  background: #FFFFFF;
}

/* Action Buttons */
.mm-actions {
  display: flex;
  gap: 10px;
  margin-top: 16px;
}
.mm-primary-btn {
  flex: 1;
  background: var(--mm-terracotta);
  color: #FFFFFF;
  border: none;
  padding: 12px 20px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(193, 102, 87, 0.25);
}
.mm-primary-btn:hover {
  background: #B35849;
  transform: translateY(-1px);
}
.mm-primary-btn:active {
  transform: translateY(0);
}
.mm-primary-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
.mm-secondary-btn {
  background: var(--mm-stone-light);
  color: var(--mm-charcoal);
  border: 1px solid var(--mm-stone);
  padding: 12px 18px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: all 0.15s ease;
}
.mm-secondary-btn:hover {
  background: #EAE7E0;
}

/* Result Area Container */
.mm-result-wrapper {
  position: relative;
  min-height: 260px;
  width: 100%;
}

/* 1. Empty State Box */
.mm-empty-box {
  background: var(--mm-card-bg);
  border: 2px dashed var(--mm-stone);
  border-radius: 24px;
  padding: 36px 20px;
  text-align: center;
}
.mm-compass-icon {
  font-size: 32px;
  color: var(--mm-terracotta);
  margin-bottom: 12px;
}
.mm-empty-title {
  font-family: var(--mm-font-serif);
  font-size: 20px;
  font-style: italic;
  color: var(--mm-charcoal);
  margin: 0 0 6px 0;
}
.mm-empty-desc {
  font-size: 13px;
  color: var(--mm-slate);
  max-width: 420px;
  margin: 0 auto 18px auto;
  line-height: 1.5;
}
.mm-empty-action-btn {
  background: var(--mm-stone-light);
  border: 1px solid var(--mm-stone);
  color: var(--mm-charcoal);
  padding: 8px 18px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: all 0.15s ease;
}
.mm-empty-action-btn:hover {
  background: var(--mm-terracotta);
  color: #FFFFFF;
  border-color: var(--mm-terracotta);
}

/* 2. Shuffling Animation Box */
.mm-shuffling-box {
  background: var(--mm-card-bg);
  border: 1px solid var(--mm-stone);
  border-radius: 24px;
  padding: 48px 20px;
  text-align: center;
}
.mm-spinner {
  width: 32px;
  height: 32px;
  border: 3px solid var(--mm-stone);
  border-top-color: var(--mm-terracotta);
  border-radius: 50%;
  animation: mmSpin 0.6s linear infinite;
  margin: 0 auto 16px auto;
}
@keyframes mmSpin {
  to { transform: rotate(360deg); }
}
.mm-shuffling-label {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-weight: 700;
  color: var(--mm-slate);
  margin: 0 0 6px 0;
}
.mm-shuffling-text {
  font-family: var(--mm-font-serif);
  font-size: 22px;
  font-style: italic;
  color: var(--mm-charcoal);
  margin: 0;
}

/* 3. Revealed Result Card */
.mm-card {
  background: var(--mm-card-bg);
  border: 1px solid var(--mm-stone);
  border-radius: 24px;
  padding: 28px;
  box-shadow: 0 8px 24px -4px rgba(45, 44, 42, 0.06);
  animation: mmFadeIn 0.35s ease-out;
}
@keyframes mmFadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Card Header */
.mm-card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  border-bottom: 1px solid var(--mm-stone);
  padding-bottom: 18px;
  margin-bottom: 18px;
}
.mm-tag-row {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 6px;
}
.mm-accent-line {
  display: inline-block;
  width: 24px;
  height: 1px;
  background: var(--mm-terracotta);
}
.mm-card-tag {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--mm-terracotta);
}
.mm-meta-dot {
  color: var(--mm-stone);
  font-size: 10px;
}
.mm-card-author {
  font-size: 11px;
  font-weight: 600;
  color: var(--mm-slate);
}
.mm-card-title {
  font-family: var(--mm-font-serif);
  font-size: 26px;
  font-weight: 700;
  font-style: italic;
  margin: 0 0 2px 0;
  color: var(--mm-charcoal);
  line-height: 1.25;
}
.mm-card-subtitle {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-weight: 600;
  color: var(--mm-slate);
  margin: 0;
}

/* Quick Action Buttons on Top of Card */
.mm-quick-actions {
  display: flex;
  gap: 6px;
  flex-shrink: 0;
}
.mm-icon-btn {
  background: var(--mm-stone-light);
  border: 1px solid var(--mm-stone);
  color: var(--mm-charcoal);
  padding: 6px 12px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  transition: all 0.15s ease;
}
.mm-icon-btn:hover {
  background: var(--mm-stone);
}
.mm-btn-highlight {
  background: var(--mm-terracotta);
  color: #FFFFFF;
  border-color: var(--mm-terracotta);
}
.mm-btn-highlight:hover {
  background: #B35849;
}

/* Dilemma Quote Banner */
.mm-dilemma-quote {
  background: var(--mm-stone-light);
  border-left: 3px solid var(--mm-terracotta);
  border-radius: 0 12px 12px 0;
  padding: 10px 14px;
  margin-bottom: 18px;
}
.mm-quote-label {
  display: block;
  font-size: 9px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--mm-slate);
  margin-bottom: 2px;
}
.mm-quote-text {
  font-family: var(--mm-font-serif);
  font-style: italic;
  font-size: 14px;
  color: var(--mm-charcoal);
}

/* Sections */
.mm-section {
  margin-bottom: 16px;
}
.mm-section-title {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--mm-slate);
  margin: 0 0 6px 0;
}
.mm-definition-text {
  font-size: 14px;
  color: #55534E;
  margin: 0;
  line-height: 1.6;
}

/* 2-Sentence Hero Section */
.mm-highlight-section {
  background: var(--mm-stone-light);
  border: 1px solid var(--mm-stone);
  border-left: 4px solid var(--mm-terracotta);
  border-radius: 16px;
  padding: 16px;
}
.mm-section-header-tag {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 6px;
}
.mm-bolt-icon {
  color: var(--mm-terracotta);
  font-size: 12px;
}
.mm-highlight-title {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--mm-terracotta);
  margin: 0;
}
.mm-application-text {
  font-size: 15px;
  font-weight: 600;
  color: var(--mm-charcoal);
  margin: 0;
  line-height: 1.55;
}

/* Question & Microaction Section */
.mm-question-section {
  background: #FFFFFF;
  border: 1px solid var(--mm-stone);
  border-radius: 16px;
  padding: 14px 16px;
}
.mm-question-text {
  font-family: var(--mm-font-serif);
  font-size: 17px;
  font-style: italic;
  color: var(--mm-charcoal);
  margin: 0;
  line-height: 1.4;
}
.mm-microaction-section {
  background: var(--mm-stone-light);
  border: 1px solid var(--mm-stone);
  border-radius: 14px;
  padding: 12px 16px;
}
.mm-microaction-text {
  font-size: 13px;
  color: #55534E;
  margin: 0;
}

/* Case Study & Blind Spot Grid */
.mm-detail-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 16px;
}
.mm-detail-box {
  background: var(--mm-stone-light);
  border: 1px solid var(--mm-stone);
  border-radius: 14px;
  padding: 12px 14px;
}
.mm-detail-title {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--mm-slate);
  margin: 0 0 4px 0;
}
.mm-detail-text {
  font-size: 12px;
  color: #55534E;
  margin: 0;
  line-height: 1.5;
}
.mm-book-banner {
  background: #FFFFFF;
  border: 1px solid var(--mm-stone);
  border-radius: 12px;
  padding: 10px 14px;
  font-size: 12px;
  color: var(--mm-slate);
  margin-bottom: 16px;
}

/* Footer Actions */
.mm-card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  border-top: 1px solid var(--mm-stone);
  padding-top: 18px;
  margin-top: 20px;
}
.mm-footer-buttons {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.mm-next-btn {
  background: var(--mm-stone-light);
  border: 1px solid var(--mm-stone);
  color: var(--mm-charcoal);
  padding: 8px 16px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: all 0.15s ease;
}
.mm-next-btn:hover {
  background: #EAE7E0;
}
.mm-share-insight-btn {
  background: var(--mm-terracotta);
  color: #FFFFFF;
  border: none;
  padding: 8px 16px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: opacity 0.15s ease;
}
.mm-share-insight-btn:hover {
  opacity: 0.9;
}
.mm-footer-note {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 600;
  color: var(--mm-slate);
}

/* Share Modal Overlay & Box */
.mm-modal-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(45, 44, 42, 0.65);
  backdrop-filter: blur(3px);
  z-index: 99999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
}
.mm-modal-box {
  background: var(--mm-cream);
  border: 1px solid var(--mm-stone);
  border-radius: 24px;
  max-width: 480px;
  width: 100%;
  padding: 24px;
  box-shadow: 0 16px 40px rgba(0,0,0,0.2);
}
.mm-modal-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 14px;
}
.mm-modal-badge {
  font-size: 9px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--mm-terracotta);
}
.mm-modal-title {
  font-family: var(--mm-font-serif);
  font-size: 20px;
  font-style: italic;
  color: var(--mm-charcoal);
  margin: 2px 0 0 0;
}
.mm-close-btn {
  background: none;
  border: none;
  font-size: 24px;
  color: var(--mm-slate);
  cursor: pointer;
  line-height: 1;
  padding: 0;
}
.mm-share-desc {
  font-size: 12px;
  color: var(--mm-slate);
  margin: 0 0 10px 0;
}
.mm-share-preview {
  background: #FFFFFF;
  border: 1px solid var(--mm-stone);
  border-radius: 14px;
  padding: 12px 14px;
  font-size: 12px;
  color: var(--mm-charcoal);
  margin-bottom: 14px;
  line-height: 1.5;
  white-space: pre-wrap;
  max-height: 150px;
  overflow-y: auto;
}
.mm-share-channels {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-bottom: 14px;
}
.mm-channel-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 10px 6px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  text-decoration: none;
  border: 1px solid var(--mm-stone);
  background: #FFFFFF;
  color: var(--mm-charcoal);
  transition: all 0.15s ease;
}
.mm-channel-btn:hover {
  background: var(--mm-stone-light);
}
.mm-copy-row {
  display: flex;
  gap: 8px;
}
.mm-share-input {
  flex: 1;
  padding: 8px 12px;
  font-size: 11px;
  font-family: monospace;
  border: 1px solid var(--mm-stone);
  border-radius: 10px;
  background: #FFFFFF;
  color: var(--mm-charcoal);
  outline: none;
}
.mm-copy-action-btn {
  background: var(--mm-charcoal);
  color: #FFFFFF;
  border: none;
  padding: 8px 16px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: opacity 0.15s ease;
  white-space: nowrap;
}
.mm-copy-action-btn:hover {
  opacity: 0.9;
}

/* Mobile Responsiveness */
@media (max-width: 540px) {
  #mental-models-app {
    padding: 20px 14px;
    border-radius: 20px;
  }
  .mm-title {
    font-size: 22px;
  }
  .mm-card-header {
    flex-direction: column;
    gap: 12px;
  }
  .mm-quick-actions {
    width: 100%;
  }
  .mm-quick-actions .mm-icon-btn {
    flex: 1;
    justify-content: center;
  }
  .mm-detail-grid {
    grid-template-columns: 1fr;
  }
  .mm-actions {
    flex-direction: column;
  }
  .mm-footer-buttons {
    width: 100%;
  }
  .mm-next-btn, .mm-share-insight-btn {
    flex: 1;
    text-align: center;
  }
}
</style>

<script>
/* ==========================================================================
   JAVASCRIPT LOGIC: Complete Mental Models Database & Engine (22 Models)
   ========================================================================== */
(function() {
  const MENTAL_MODELS = [
    {
      id: "inversion",
      name: "Inversion",
      subtitle: "Thinking Backwards to Avoid Failure",
      category: "Problem Solving",
      thinker: "Carl Jacobi & Charlie Munger",
      definition: "Instead of focusing solely on how to succeed, you focus intently on all the ways you could fail and methodically eliminate those failure modes.",
      twoSentenceApplication: "List the three worst things you could do in this situation that would guarantee disaster, regret, or stagnation. Then, establish strict personal boundaries to actively prevent those specific failure conditions.",
      keyQuestion: "What actions or assumptions would guarantee this decision fails completely, and how do I avoid them?",
      microAction: "Write down the nightmare scenario of this choice. Eliminate the top two habits or risks that lead directly there.",
      caseStudy: "Charlie Munger used Inversion at Berkshire Hathaway to systematically avoid operational complexity and high debt rather than trying to make brilliant stock picks.",
      blindSpot: "Survivorship bias and naive optimism.",
      book: "Poor Charlie's Almanack by Charlie Munger"
    },
    {
      id: "first-principles",
      name: "First Principles Thinking",
      subtitle: "Reasoning from Fundamental Truths",
      category: "Strategic Thinking",
      thinker: "Aristotle & René Descartes",
      definition: "Boiling a problem down to its most foundational, undeniable truths and building upward, rather than reasoning by conventional analogy or copycat habits.",
      twoSentenceApplication: "Strip away every rule, industry norm, or friend’s advice and identify the raw, undeniable facts of your dilemma. Rebuild your decision from these basic truths rather than copying what everyone else seems to be doing.",
      keyQuestion: "What do I know to be 100% true about this situation without relying on assumptions or what others do?",
      microAction: "List 3 assumptions you are making about this choice. Ask: 'Is this factually proven, or just conventional dogma?'",
      caseStudy: "SpaceX reduced rocket costs by 90% by breaking down the price of raw aerospace aluminum, titanium, and carbon fiber instead of accepting supplier quotes.",
      blindSpot: "Analogy trap and herd consensus.",
      book: "Principles by Ray Dalio"
    },
    {
      id: "second-order-thinking",
      name: "Second-Order Thinking",
      subtitle: "Asking: 'And Then What?'",
      category: "Strategic Thinking",
      thinker: "Howard Marks & Garrett Hardin",
      definition: "Evaluating not just the immediate, obvious consequences of an action, but the downstream effects of those consequences over 6 months, 1 year, and 5 years.",
      twoSentenceApplication: "Look beyond the immediate comfort or pain this choice produces today and ask yourself, 'And then what happens in six months?' Pick the path that yields compounding advantages in the second and third order, even if the first step feels uncomfortable.",
      keyQuestion: "What are the consequences of the consequences of this choice over the next 12 to 36 months?",
      microAction: "Map out: Step 1 (immediate effect), Step 2 (effect on relationships/energy in 6 months), Step 3 (long-term trajectory in 3 years).",
      caseStudy: "In colonial Delhi, placing a bounty on cobras caused people to breed cobras. When cancelled, breeders released them, worsening the infestation.",
      blindSpot: "Hyperbolic discounting and short-termism.",
      book: "The Most Important Thing by Howard Marks"
    },
    {
      id: "regret-minimization",
      name: "Regret Minimization Framework",
      subtitle: "Looking Back from Age 80",
      category: "Decision Making",
      thinker: "Jeff Bezos",
      definition: "Projecting yourself into old age and looking backward at your life to choose the path that will minimize future remorse and the agony of 'what if.'",
      twoSentenceApplication: "Fast-forward your life to age 80 and look back at this pivotal moment. Ask yourself which path you will genuinely regret not attempting when you reflect on your courage and life story.",
      keyQuestion: "When I am 80 looking back on this moment, will I regret trying and failing, or never taking the leap at all?",
      microAction: "Close your eyes for 30 seconds. Picture your older self giving current-you advice on this exact choice.",
      caseStudy: "Jeff Bezos left a lucrative Wall Street career in 1994 to found Amazon after realizing he would never regret failing at the internet, but would forever regret not participating.",
      blindSpot: "Loss aversion and fear of temporary social awkwardness.",
      book: "Four Thousand Weeks by Oliver Burkeman"
    },
    {
      id: "circle-of-competence",
      name: "Circle of Competence",
      subtitle: "Knowing What You Don’t Know",
      category: "Decision Making",
      thinker: "Warren Buffett & Charlie Munger",
      definition: "Knowing where your deep expertise begins and ends, allowing you to operate where you hold a genuine advantage and avoid bets where you are an amateur.",
      twoSentenceApplication: "Assess whether this decision relies on areas where you possess proven intuition and skill or whether you are guessing outside your depth. If you are operating outside your circle, partner with a verified domain expert before taking irreversible risks.",
      keyQuestion: "Am I genuinely qualified to evaluate this decision, or am I seduced by surface-level confidence?",
      microAction: "Draw a circle on paper: Inside = things you can prove you understand with data. Outside = assumptions where you need external counsel.",
      caseStudy: "Buffett avoided tech stocks in the late 90s because they were outside his circle, protecting his portfolio when the dot-com bubble burst.",
      blindSpot: "Dunning-Kruger effect.",
      book: "The Great Mental Models by Shane Parrish"
    },
    {
      id: "occams-razor",
      name: "Occam's Razor",
      subtitle: "The Power of the Simplest Explanation",
      category: "Problem Solving",
      thinker: "William of Ockham",
      definition: "When presented with competing explanations or solutions, the one that makes the fewest assumptions is usually the most correct and actionable.",
      twoSentenceApplication: "Look at the convoluted plans or anxious narratives you have built around this situation and strip away the overcomplicated layers. Choose the straightforward, low-friction action that solves the core problem with the least moving parts.",
      keyQuestion: "What is the most direct, uncomplicated explanation or solution that requires the fewest wild assumptions?",
      microAction: "Cut your action plan in half. Eliminate every step that relies on multiple external dependencies going perfectly.",
      caseStudy: "Medical students are taught: 'When you hear hoofbeats, think horses, not zebras' to avoid dangerous over-diagnoses.",
      blindSpot: "Complexity bias (assuming complicated solutions are smarter).",
      book: "Thinking, Fast and Slow by Daniel Kahneman"
    },
    {
      id: "asymmetric-risk",
      name: "Asymmetric Risk & Barbell Strategy",
      subtitle: "Capping Downside, Uncapping Upside",
      category: "Risk & Uncertainty",
      thinker: "Nassim Nicholas Taleb",
      definition: "Seeking opportunities where the potential loss is strictly known and limited, while the potential gain is open-ended, convex, and immense.",
      twoSentenceApplication: "Ensure the absolute worst-case downside of this decision cannot wipe you out financially or emotionally. Once your catastrophic downside is strictly protected, take aggressive bets with huge, unlimited upside potential.",
      keyQuestion: "What is the absolute maximum downside if this goes wrong, and can I easily survive it?",
      microAction: "Calculate the exact worst-case scenario. If it is non-fatal, immediately greenlight the experiment.",
      caseStudy: "Venture capital payoffs are strictly asymmetric: an investor can only lose 1x their check, but can gain 1,000x on a winner.",
      blindSpot: "Conflating volatility with catastrophic risk.",
      book: "Antifragile by Nassim Nicholas Taleb"
    },
    {
      id: "opportunity-cost",
      name: "Opportunity Cost & Trade-offs",
      subtitle: "The Hidden Trade-Off of Every Yes",
      category: "Decision Making",
      thinker: "Frédéric Bastiat & Milton Friedman",
      definition: "Every time you choose to invest your time, money, or attention in one opportunity, you are simultaneously choosing NOT to invest them into the best alternative.",
      twoSentenceApplication: "Remember that saying 'yes' to one option is secretly saying 'no' to every other alternative you could pursue with the same time and energy. Clarify the highest-value thing you must surrender to pursue this path before committing.",
      keyQuestion: "If I say YES to this, what invaluable alternative am I implicitly saying NO to?",
      microAction: "Calculate the literal hours or dollars this option requires. Name the exact competing project that will lose those hours.",
      caseStudy: "Bastiat's Broken Window Parable revealed that repairing glass isn't economic progress because the funds could have bought books or tools.",
      blindSpot: "Ignoring unseen sacrificed alternatives.",
      book: "Essentialism by Greg McKeown"
    },
    {
      id: "via-negativa",
      name: "Via Negativa (Improvement by Subtraction)",
      subtitle: "Achieving Mastery by Removing the Negative",
      category: "Problem Solving",
      thinker: "Ancient Stoics & Nassim Taleb",
      definition: "Gaining clarity, health, and strategic strength not by adding new habits or complications, but by removing harmful elements, distractions, and vulnerabilities.",
      twoSentenceApplication: "Before trying to add another system, tool, or task to solve your dilemma, identify what toxic commitment or distraction you should subtract first. Peak clarity almost always comes from eliminating clutter rather than accumulating more.",
      keyQuestion: "What one harmful behavior, client, or distraction could I completely remove from this equation today?",
      microAction: "Write down your 'Not-To-Do List' for the next 7 days. Cross off 2 low-value obligations immediately.",
      caseStudy: "Michelangelo explained sculpting David by stating: 'I just chip away everything that is not David.'",
      blindSpot: "Addition bias (the instinct to fix problems by adding more).",
      book: "Skin in the Game by Nassim Nicholas Taleb"
    },
    {
      id: "hanlons-razor",
      name: "Hanlon's Razor",
      subtitle: "Never Attribute to Malice What Is Carelessness",
      category: "Human Behavior & Systems",
      thinker: "Robert J. Hanlon",
      definition: "Assuming that misunderstandings, mistakes, or friction from others stem from fatigue, stress, or cognitive overload rather than malicious conspiracy.",
      twoSentenceApplication: "If your dilemma involves tension or conflict with someone else, pause and assume they are overwhelmed or distracted rather than scheming against you. Approach your next communication with curiosity and calm rather than defensive armor.",
      keyQuestion: "How would I react to this situation if I knew the other person had zero bad intentions and was simply stressed?",
      microAction: "Reframe the other person’s behavior in 1 generous sentence before composing your reply.",
      caseStudy: "Emergency room debriefs focus on cognitive overload and system gaps rather than personal malice.",
      blindSpot: "Fundamental Attribution Error.",
      book: "Crucial Conversations by Kerry Patterson"
    },
    {
      id: "map-vs-territory",
      name: "Map vs. Territory",
      subtitle: "The Model Is Not Reality",
      category: "Strategic Thinking",
      thinker: "Alfred Korzybski",
      definition: "Recognizing that our theories, plans, spreadsheets, and mental models are imperfect reductions of reality—never confuse the abstraction with the actual terrain.",
      twoSentenceApplication: "Treat your current plan as a fallible hypothesis rather than rigid gospel. Pay close attention to real-world feedback from your users and daily reality, pivoting swiftly when empirical facts contradict your expectations.",
      keyQuestion: "Where am I clinging to an idealized plan or theory instead of confronting real-world evidence?",
      microAction: "Test one assumption with a real human or live prototype within the next 24 hours.",
      caseStudy: "Military commanders often discover battle conditions bear little resemblance to pristine headquarters map simulations.",
      blindSpot: "Excel spreadsheet fallacy.",
      book: "Superforecasting by Philip Tetlock"
    },
    {
      id: "pareto-principle",
      name: "Pareto Principle (80/20 Rule)",
      subtitle: "Finding the High-Leverage Vital Few",
      category: "Productivity & Focus",
      thinker: "Vilfredo Pareto & Richard Koch",
      definition: "In most systems, roughly 80% of desired outcomes result from just 20% of inputs, efforts, or key decisions.",
      twoSentenceApplication: "Identify the single 20% activity or factor in this dilemma that will generate 80% of your desired outcome or peace of mind. Ruthlessly ignore or delegate the remaining 80% of noisy busywork that yields minimal impact.",
      keyQuestion: "What is the single 20% lever in this dilemma that produces 80% of the long-term impact?",
      microAction: "Write down 5 possible actions you could take. Put a star next to the ONE that makes the other four irrelevant.",
      caseStudy: "Vilfredo Pareto discovered 80% of Italy's land was owned by 20% of the population, matching the 80/20 ratio of peas in his garden pods.",
      blindSpot: "Linear effort illusion.",
      book: "The 80/20 Principle by Richard Koch"
    },
    {
      id: "goodharts-law",
      name: "Goodhart's Law",
      subtitle: "When a Measure Becomes a Target",
      category: "Human Behavior & Systems",
      thinker: "Charles Goodhart & Marilyn Strathern",
      definition: "When a metric is chosen as the primary goal or incentive for performance, it ceases to be a good metric because people game the system.",
      twoSentenceApplication: "Examine if you are optimising for a vanity metric (like hours worked, follower count, or pages written) rather than real substance. Anchor your success on actual underlying impact rather than superficial scorecards.",
      keyQuestion: "Am I optimizing for the appearance of progress (the metric) or actual genuine value (the mission)?",
      microAction: "Define the qualitative truth behind your metric. Ask: 'If this number doubled tomorrow, would my life actually be better?'",
      caseStudy: "When Soviet factories measured nail output by weight, they produced giant useless heavy spikes; when by count, tiny pins.",
      blindSpot: "Gaming metrics at the expense of purpose.",
      book: "The Tyranny of Metrics by Jerry Z. Muller"
    },
    {
      id: "antifragility",
      name: "Antifragility",
      subtitle: "Gaining from Disorder & Stress",
      category: "Risk & Uncertainty",
      thinker: "Nassim Nicholas Taleb",
      definition: "Designing systems, careers, and habits that not only survive unexpected volatility and stress, but actually grow stronger and improve from it.",
      twoSentenceApplication: "Do not seek an artificial environment of zero stress or fragile perfection. Structure this choice so that even if mistakes or surprises occur, the feedback directly upgrades your wisdom, adaptability, and resilience.",
      keyQuestion: "How can I structure this decision so that an unexpected shock makes me stronger instead of breaking me?",
      microAction: "Identify how a setback in this dilemma can be turned into a lasting competitive advantage.",
      caseStudy: "Human bones and muscles strengthen under stress (hormesis); aviation safety improves after every investigated incident.",
      blindSpot: "Over-optimization that removes all protective slack.",
      book: "Antifragile by Nassim Nicholas Taleb"
    },
    {
      id: "eisenhower-matrix",
      name: "Eisenhower Decision Matrix",
      subtitle: "Urgent vs. Important",
      category: "Productivity & Focus",
      thinker: "Dwight D. Eisenhower",
      definition: "Distinguishing between what demands immediate attention (urgent) and what drives lifelong compounding value (important).",
      twoSentenceApplication: "Stop letting the loud, urgent fires of other people dictate your daily calendar. Carve out protected deep-work blocks for the non-urgent, highly important strategic moves that actually define your future.",
      keyQuestion: "Is this demanding my attention because it is genuinely important, or merely because it is loud and urgent?",
      microAction: "Schedule a non-negotiable 60-minute calendar block this week solely for your #1 important task.",
      caseStudy: "Eisenhower organized the D-Day invasion by delegating daily fire-fighting to focus on grand Allied strategy.",
      blindSpot: "Urgency trap and reactive exhaustion.",
      book: "The 7 Habits of Highly Effective People by Stephen Covey"
    },
    {
      id: "sunk-cost-fallacy",
      name: "Sunk Cost Fallacy",
      subtitle: "Honoring the Future, Not Past Losses",
      category: "Decision Making",
      thinker: "Richard Thaler & Amos Tversky",
      definition: "Continuing a suboptimal course of action simply because you have already invested unrecoverable time, money, or emotional effort into it.",
      twoSentenceApplication: "Acknowledge that past time and money are gone forever and cannot be recovered by making further bad decisions. Decide purely based on whether investing your next dollar and next hour from this moment forward makes rational sense.",
      keyQuestion: "If I walked into this situation today with zero prior investment, would I choose to buy into it right now?",
      microAction: "Say out loud: 'That past investment was the tuition I paid for wisdom. Today starts completely fresh.'",
      caseStudy: "The Concorde supersonic airliner was funded for decades after commercial failure simply due to billions already spent.",
      blindSpot: "Commitment and consistency bias.",
      book: "Misbehaving by Richard H. Thaler"
    },
    {
      id: "survivorship-bias",
      name: "Survivorship Bias",
      subtitle: "Studying the Silent Graveyard",
      category: "Problem Solving",
      thinker: "Abraham Wald",
      definition: "Focusing exclusively on the successful individuals, companies, or outcomes that survived a selection process while ignoring the invisible failures.",
      twoSentenceApplication: "Do not base your plan solely on the playbook of the rare unicorn winner who got lucky with risky gambles. Study the silent graveyard of people who tried the exact same strategy and failed, learning what traps to avoid.",
      keyQuestion: "What are the failed examples in this space that nobody is talking about, and why did they go under?",
      microAction: "Search for 2 post-mortems of projects that failed in your space before making your commitment.",
      caseStudy: "Abraham Wald analyzed returning WWII bombers and armored the undamaged sections—because planes shot there had not survived to return.",
      blindSpot: "Copying outlier winners without accounting for luck.",
      book: "The Black Swan by Nassim Nicholas Taleb"
    },
    {
      id: "parkinsons-law",
      name: "Parkinson's Law",
      subtitle: "Work Expands to Fill Time Available",
      category: "Productivity & Focus",
      thinker: "C. Northcote Parkinson",
      definition: "Work expands to fill the time allotted for its completion, leading to bloated complexity when deadlines are unnecessarily generous.",
      twoSentenceApplication: "Cut your timeline for this project in half and impose an aggressive, tight constraint on your next milestone. Forcing a tight container compels you to execute only the critical essentials and discard perfectionist fluff.",
      keyQuestion: "If I was forced to finish this decision or deliverable in 48 hours, what would I do?",
      microAction: "Set a timer for 25 minutes. Produce an imperfect v0.1 draft before looking at any other tabs.",
      caseStudy: "British Admiralty staff grew 5% annually even as naval fleet size decreased dramatically.",
      blindSpot: "Perfectionist procrastination.",
      book: "Make Time by Jake Knapp & John Zeratsky"
    },
    {
      id: "margin-of-safety",
      name: "Margin of Safety",
      subtitle: "Building a Buffer for the Unknown",
      category: "Risk & Uncertainty",
      thinker: "Benjamin Graham & Engineers",
      definition: "Engineering a deliberate financial, emotional, or temporal buffer into your plans so that unforeseen disruptions do not break you.",
      twoSentenceApplication: "Assume that this project or transition will take 50% longer and cost 30% more than your optimistic forecast. Ensure that even if reality hits you with unexpected delays, your baseline wellbeing and financial security remain completely intact.",
      keyQuestion: "If this takes twice as long or yields half the expected return, will I still survive comfortably?",
      microAction: "Add a 30% time or budget buffer to your plan right now before committing.",
      caseStudy: "Structural bridge engineers multiply maximum load capacity by 3x or 4x to survive freak weather.",
      blindSpot: "Brittle over-optimism and tight coupling.",
      book: "The Intelligent Investor by Benjamin Graham"
    },
    {
      id: "chestertons-fence",
      name: "Chesterton's Fence",
      subtitle: "Understand Before You Dismantle",
      category: "Strategic Thinking",
      thinker: "G.K. Chesterton",
      definition: "Before you remove a rule, routine, boundary, or existing system, you must first understand the exact reason why it was constructed in the first place.",
      twoSentenceApplication: "If you are tempted to break an existing habit, quit a role, or dismantle an old protocol, first discover why it was created. Only once you thoroughly understand its original protective purpose can you safely replace it with something superior.",
      keyQuestion: "Why does this existing routine, boundary, or rule exist, and what will break if I tear it down without a replacement?",
      microAction: "Ask someone who created or respects the current system what value it provides before making your decision.",
      caseStudy: "Importing cane toads to Australia in 1935 caused ecological disaster because authorities did not understand why the native ecosystem had evolved its balance.",
      blindSpot: "Reformer's arrogance.",
      book: "Thinking in Systems by Donella Meadows"
    },
    {
      id: "compounding",
      name: "The Power of Compounding",
      subtitle: "Small Incremental Consistency Over Time",
      category: "Productivity & Focus",
      thinker: "Albert Einstein & Charlie Munger",
      definition: "Tiny, unglamorous 1% gains repeated relentlessly over long horizons produce exponential, non-linear returns.",
      twoSentenceApplication: "Do not look for a dramatic overnight breakthrough in this decision; look for the choice that allows you to show up consistently every single day. Choose the path where daily consistency works in your favor rather than exhausting you.",
      keyQuestion: "Which path lets me accumulate quiet, daily 1% advantages that compound exponentially over 5 years?",
      microAction: "Define the smallest possible daily micro-habit (5 minutes) that moves this decision forward every morning.",
      caseStudy: "99% of Warren Buffett's wealth was generated after age 50 because he stayed continuously invested for 65+ years.",
      blindSpot: "Linear extrapolation trap.",
      book: "Atomic Habits by James Clear"
    },
    {
      id: "dunbars-number",
      name: "Dunbar's Number",
      subtitle: "The Limits of Human Connection",
      category: "Human Behavior & Systems",
      thinker: "Robin Dunbar",
      definition: "A cognitive limit to the number of people with whom one can maintain stable, genuine social relationships (typically ~150).",
      twoSentenceApplication: "Recognize that your social and collaborative capacity is strictly finite; you cannot genuinely sustain hundreds of deep relationships at once. Prioritize the core inner circle of 5 to 15 people who truly elevate your wellbeing and mission, letting casual acquaintances stay light.",
      keyQuestion: "Am I spreading my emotional and relational energy across too many shallow contacts instead of nurturing my vital inner circle?",
      microAction: "List your top 5 champions and closest collaborators. Send one of them an appreciative note today.",
      caseStudy: "Gore-Tex keeps individual manufacturing buildings under 150 employees to preserve high trust and spontaneous teamwork.",
      blindSpot: "Network dilution and shallow connection overload.",
      book: "Grooming, Gossip, and Evolution by Robin Dunbar"
    }
  ];

  let lastIndex = -1;

  window.mmSetPrompt = function(text) {
    const input = document.getElementById("mm-dilemma-input");
    if (input) {
      input.value = text;
      input.focus();
    }
  };

  window.mmDrawModel = function() {
    const emptyState = document.getElementById("mm-empty-state");
    const shufflingState = document.getElementById("mm-shuffling-state");
    const activeCard = document.getElementById("mm-active-card");
    const drawBtn = document.getElementById("mm-draw-btn");
    const shufflingName = document.getElementById("mm-shuffling-name");

    if (!emptyState || !shufflingState || !activeCard) return;

    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * MENTAL_MODELS.length);
    } while (nextIndex === lastIndex && MENTAL_MODELS.length > 1);
    lastIndex = nextIndex;

    const selectedModel = MENTAL_MODELS[nextIndex];

    emptyState.style.display = "none";
    activeCard.style.display = "none";
    shufflingState.style.display = "block";
    if (drawBtn) drawBtn.disabled = true;

    let count = 0;
    const interval = setInterval(function() {
      const tempModel = MENTAL_MODELS[Math.floor(Math.random() * MENTAL_MODELS.length)];
      if (shufflingName) shufflingName.textContent = tempModel.name + "...";
      count++;
      if (count > 7) {
        clearInterval(interval);
        renderCard(selectedModel);
        shufflingState.style.display = "none";
        activeCard.style.display = "block";
        if (drawBtn) drawBtn.disabled = false;
      }
    }, 60);
  };

  window.mmDrawRandom = function() {
    window.mmDrawModel();
  };

  function renderCard(model) {
    const title = document.getElementById("mm-card-title");
    const subtitle = document.getElementById("mm-card-subtitle");
    const category = document.getElementById("mm-card-category");
    const thinker = document.getElementById("mm-card-thinker");
    const definition = document.getElementById("mm-card-definition");
    const application = document.getElementById("mm-card-application");
    const question = document.getElementById("mm-card-question");
    const microaction = document.getElementById("mm-card-microaction");
    const caseStudy = document.getElementById("mm-card-case-study");
    const blindSpot = document.getElementById("mm-card-blind-spot");
    const book = document.getElementById("mm-card-book");

    if (title) title.textContent = model.name;
    if (subtitle) subtitle.textContent = model.subtitle;
    if (category) category.textContent = model.category;
    if (thinker) thinker.textContent = model.thinker;
    if (definition) definition.textContent = model.definition;
    if (application) application.textContent = model.twoSentenceApplication;
    if (question) question.textContent = '"' + model.keyQuestion + '"';
    if (microaction) microaction.textContent = model.microAction;
    if (caseStudy) caseStudy.textContent = model.caseStudy || "";
    if (blindSpot) blindSpot.textContent = model.blindSpot || "";
    if (book) book.textContent = model.book || "Treatises in Cognitive Decision Science";

    const input = document.getElementById("mm-dilemma-input");
    const dilemmaBox = document.getElementById("mm-user-dilemma-box");
    const dilemmaText = document.getElementById("mm-user-dilemma-text");

    if (input && dilemmaBox && dilemmaText) {
      const userText = input.value.trim();
      if (userText.length > 0) {
        dilemmaText.textContent = '"' + userText + '"';
        dilemmaBox.style.display = "block";
      } else {
        dilemmaBox.style.display = "none";
      }
    }
  }

  window.mmCopyInsight = function() {
    if (lastIndex < 0 || !MENTAL_MODELS[lastIndex]) return;
    const model = MENTAL_MODELS[lastIndex];
    const input = document.getElementById("mm-dilemma-input");
    const userText = input ? input.value.trim() : "";
    
    const textToCopy = "Mental Model: " + model.name + " (" + model.subtitle + ")\n" +
      "Thinker: " + model.thinker + "\n" +
      (userText ? "Dilemma: \"" + userText + "\"\n" : "") +
      "Principle: " + model.definition + "\n\n" +
      "Practical 2-Sentence Application:\n" + model.twoSentenceApplication + "\n\n" +
      "Core Question: \"" + model.keyQuestion + "\"\n" +
      (model.book ? "Reading: " + model.book + "\n" : "") +
      "\nVia The Mental Models Decision Companion (chungbooks.fr)";

    navigator.clipboard.writeText(textToCopy).then(function() {
      const copyBtn = document.getElementById("mm-copy-text");
      const copyIcon = document.getElementById("mm-copy-icon");
      if (copyBtn) copyBtn.textContent = "Copied!";
      if (copyIcon) copyIcon.textContent = "✓";
      setTimeout(function() {
        if (copyBtn) copyBtn.textContent = "Copy Insight";
        if (copyIcon) copyIcon.textContent = "📋";
      }, 2200);
    });
  };

  window.mmOpenShare = function() {
    if (lastIndex < 0 || !MENTAL_MODELS[lastIndex]) return;
    const model = MENTAL_MODELS[lastIndex];
    const input = document.getElementById("mm-dilemma-input");
    const userText = input ? input.value.trim() : "";
    const modal = document.getElementById("mm-share-modal");
    const title = document.getElementById("mm-modal-model-title");
    const preview = document.getElementById("mm-share-preview-text");
    const urlInput = document.getElementById("mm-share-url-input");
    const wa = document.getElementById("mm-share-wa");
    const tw = document.getElementById("mm-share-tw");
    const mail = document.getElementById("mm-share-mail");

    const currentUrl = window.location.href.split("?")[0] + "?model=" + model.id + (userText ? "&dilemma=" + encodeURIComponent(userText) : "");
    const snippet = "🧠 Mental Model: " + model.name + (userText ? "\n🎯 Dilemma: \"" + userText + "\"" : "") + "\n💡 Application: " + model.twoSentenceApplication;

    if (title) title.textContent = model.name;
    if (preview) preview.textContent = snippet;
    if (urlInput) urlInput.value = currentUrl;
    if (wa) wa.href = "https://api.whatsapp.com/send?text=" + encodeURIComponent(snippet + "\n\n" + currentUrl);
    if (tw) tw.href = "https://twitter.com/intent/tweet?text=" + encodeURIComponent("Mental Model: " + model.name + " — " + model.twoSentenceApplication.slice(0, 140) + "...") + "&url=" + encodeURIComponent(currentUrl);
    if (mail) mail.href = "mailto:?subject=" + encodeURIComponent("Cognitive Insight: " + model.name) + "&body=" + encodeURIComponent(snippet + "\n\n" + currentUrl);

    if (modal) modal.style.display = "flex";
  };

  window.mmCloseShare = function() {
    const modal = document.getElementById("mm-share-modal");
    if (modal) modal.style.display = "none";
  };

  window.mmCopyShareLink = function() {
    const urlInput = document.getElementById("mm-share-url-input");
    const copyBtn = document.getElementById("mm-modal-copy-btn");
    if (urlInput) {
      navigator.clipboard.writeText(urlInput.value).then(function() {
        if (copyBtn) {
          copyBtn.textContent = "Copied!";
          setTimeout(function() { copyBtn.textContent = "Copy Link"; }, 2200);
        }
      });
    }
  };
})();
</script>
`;
