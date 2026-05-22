(() => {
  const DEFAULT_DASHBOARD_URL = './index.html';
  const DEFAULT_GITHUB_URL = 'https://github.com/jameshward3/OrangeBudgetDashboard';

  const indicators = [
    { label: '2026 Budget', value: 94580788, display: '$94.6M', change: '+2.44%', changeLabel: 'from 2025', tone: 'orange', insight: 'Total municipal appropriations' },
    { label: 'Tax Levy', value: 70104881, display: '$70.1M', change: '+4.81%', changeLabel: 'from 2025', tone: 'blue', insight: 'Amount to be raised by taxes' },
    { label: 'PILOT Revenue', value: 2788300, display: '$2.79M', change: '+4.64%', changeLabel: 'from 2025', tone: 'gold', insight: 'Payment-in-lieu-of-taxes forecast' },
    { label: 'Grant Revenue', value: 6946352, display: '$6.95M', change: '+4531%', changeLabel: 'from 2025', tone: 'green', insight: 'Major project funding increase' }
  ];

  const topRisk = {
    label: 'Watch item',
    title: 'Workers compensation insurance',
    value: '$1.50M',
    change: '+50.0%',
    note: 'Largest flagged 2026 operating increase'
  };

  const formatDate = () => new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date());

  class OrangeBudgetWidget extends HTMLElement {
    static get observedAttributes() {
      return ['dashboard-url', 'github-url', 'title', 'compact'];
    }

    connectedCallback() {
      this.render();
    }

    attributeChangedCallback() {
      if (this.isConnected) this.render();
    }

    render() {
      const root = this.shadowRoot || this.attachShadow({ mode: 'open' });
      const dashboardUrl = this.getAttribute('dashboard-url') || DEFAULT_DASHBOARD_URL;
      const githubUrl = this.getAttribute('github-url') || DEFAULT_GITHUB_URL;
      const title = this.getAttribute('title') || 'Orange Budget Snapshot';
      const compact = this.hasAttribute('compact');
      const max = Math.max(...indicators.map(item => item.value));

      root.innerHTML = `
        <style>
          :host {
            --obw-ink: #0f172a;
            --obw-muted: #64748b;
            --obw-line: #dbe3ee;
            --obw-panel: #ffffff;
            --obw-bg: #f8fafc;
            --obw-orange: #c2410c;
            --obw-blue: #075985;
            --obw-green: #166534;
            --obw-gold: #a16207;
            display: block;
            max-width: ${compact ? '420px' : '720px'};
            color: var(--obw-ink);
            font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          }
          * { box-sizing: border-box; }
          .widget {
            overflow: hidden;
            background: var(--obw-panel);
            border: 1px solid var(--obw-line);
            border-radius: 8px;
            box-shadow: 0 14px 36px rgba(15, 23, 42, .10);
          }
          .head {
            display: grid;
            grid-template-columns: minmax(0, 1fr) auto;
            gap: 14px;
            align-items: start;
            padding: 18px;
            background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
            color: #ffffff;
          }
          .eyebrow {
            margin: 0 0 4px;
            color: #fdba74;
            font-size: 11px;
            font-weight: 850;
            letter-spacing: .06em;
            text-transform: uppercase;
          }
          h2 {
            margin: 0;
            color: #ffffff;
            font-size: 20px;
            line-height: 1.1;
            letter-spacing: 0;
          }
          .stamp {
            color: #cbd5e1;
            font-size: 12px;
            text-align: right;
            white-space: nowrap;
          }
          .body {
            display: grid;
            gap: 12px;
            padding: 16px;
            background: var(--obw-bg);
          }
          .metrics {
            display: grid;
            grid-template-columns: repeat(${compact ? 1 : 2}, minmax(0, 1fr));
            gap: 10px;
          }
          .metric,
          .risk {
            background: #ffffff;
            border: 1px solid var(--obw-line);
            border-radius: 8px;
            padding: 14px;
          }
          .metric-top,
          .risk-top,
          .actions {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
          }
          .label {
            color: var(--obw-muted);
            font-size: 11px;
            font-weight: 850;
            letter-spacing: .05em;
            text-transform: uppercase;
          }
          .value {
            margin: 6px 0 2px;
            color: var(--obw-ink);
            font-size: 24px;
            font-weight: 900;
            line-height: 1;
            letter-spacing: 0;
          }
          .insight {
            margin: 0 0 12px;
            color: var(--obw-muted);
            font-size: 12px;
            line-height: 1.35;
          }
          .change {
            display: inline-flex;
            align-items: center;
            gap: 4px;
            border-radius: 999px;
            padding: 5px 8px;
            background: #f1f5f9;
            color: var(--obw-ink);
            font-size: 12px;
            font-weight: 850;
            white-space: nowrap;
          }
          .change span {
            color: var(--obw-muted);
            font-weight: 750;
          }
          .bar {
            height: 6px;
            overflow: hidden;
            background: #e2e8f0;
            border-radius: 999px;
          }
          .fill {
            display: block;
            width: var(--width);
            height: 100%;
            min-width: 10px;
            border-radius: inherit;
            background: var(--tone);
          }
          .tone-orange { --tone: var(--obw-orange); }
          .tone-blue { --tone: var(--obw-blue); }
          .tone-green { --tone: var(--obw-green); }
          .tone-gold { --tone: var(--obw-gold); }
          .risk { border-left: 4px solid #dc2626; }
          .risk h3 {
            margin: 6px 0 4px;
            color: var(--obw-ink);
            font-size: 15px;
            line-height: 1.25;
            letter-spacing: 0;
          }
          .risk .value {
            font-size: 19px;
            text-align: right;
          }
          .risk p {
            margin: 0;
            color: var(--obw-muted);
            font-size: 12px;
            line-height: 1.4;
          }
          .actions {
            flex-wrap: wrap;
            padding-top: 2px;
          }
          a {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            min-height: 38px;
            border-radius: 8px;
            padding: 9px 12px;
            color: #ffffff;
            background: var(--obw-orange);
            font-size: 13px;
            font-weight: 850;
            line-height: 1;
            text-decoration: none;
          }
          a.secondary {
            color: var(--obw-ink);
            background: #ffffff;
            border: 1px solid var(--obw-line);
          }
          @media (max-width: 560px) {
            :host { max-width: 100%; }
            .head { grid-template-columns: 1fr; }
            .stamp { text-align: left; }
            .metrics { grid-template-columns: 1fr; }
            .actions a { flex: 1 1 150px; }
          }
        </style>
        <article class="widget" aria-label="City of Orange budget key indicators">
          <div class="head">
            <div>
              <p class="eyebrow">City of Orange FY2026</p>
              <h2>${title}</h2>
            </div>
            <div class="stamp">Updated ${formatDate()}</div>
          </div>
          <div class="body">
            <div class="metrics">
              ${indicators.map(item => `
                <section class="metric tone-${item.tone}">
                  <div class="metric-top">
                    <span class="label">${item.label}</span>
                    <span class="change">${item.change} <span>${item.changeLabel}</span></span>
                  </div>
                  <div class="value">${item.display}</div>
                  <p class="insight">${item.insight}</p>
                  <div class="bar" aria-hidden="true">
                    <span class="fill" style="--width: ${Math.max(8, (item.value / max) * 100).toFixed(1)}%"></span>
                  </div>
                </section>
              `).join('')}
            </div>
            <section class="risk">
              <div class="risk-top">
                <div>
                  <span class="label">${topRisk.label}</span>
                  <h3>${topRisk.title}</h3>
                  <p>${topRisk.note}</p>
                </div>
                <div>
                  <div class="value">${topRisk.value}</div>
                  <span class="change">${topRisk.change} <span>YoY</span></span>
                </div>
              </div>
            </section>
            <div class="actions" aria-label="Budget widget links">
              <a href="${dashboardUrl}">Open dashboard</a>
              <a class="secondary" href="${githubUrl}">View GitHub</a>
            </div>
          </div>
        </article>
      `;
    }
  }

  if (!customElements.get('orange-budget-widget')) {
    customElements.define('orange-budget-widget', OrangeBudgetWidget);
  }
})();
