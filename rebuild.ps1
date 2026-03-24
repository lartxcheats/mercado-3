$path = Join-Path $PSScriptRoot "mp.css"
$css = @'
* { margin: 0; padding: 0; box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
html { overflow-x: hidden; width: 100%; }
body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; background-color: #FFE600; color: #1A1A1A; overflow-x: hidden; width: 100%; margin: 0; padding: 0; -webkit-overflow-scrolling: touch; }
.app { max-width: 430px; width: 100%; margin: 0 auto; background-color: #f0f0f0; min-height: 100vh; padding-bottom: 88px; overflow-x: hidden; position: relative; }
.header { background: #FFE600; padding: 16px 20px 0; margin: 0; width: 100%; }
.header-content { display: flex; justify-content: space-between; align-items: center; padding-bottom: 14px; }
.user-info { display: flex; align-items: center; gap: 10px; }
.logo-mp { height: 26px; width: auto; }
.greeting { font-size: 15px; font-weight: 600; color: #1A1A1A; letter-spacing: -0.2px; }
.header-actions { display: flex; gap: 8px; }
.icon-btn { width: 38px; height: 38px; border-radius: 50%; background-color: rgba(0,0,0,0.08); border: none; display: flex; align-items: center; justify-content: center; cursor: pointer; position: relative; transition: background 0.15s; }
.icon-btn:active { background-color: rgba(0,0,0,0.15); }
.notification .badge { position: absolute; top: 2px; right: 2px; background-color: #E53E3E; color: white; font-size: 9px; font-weight: 700; width: 15px; height: 15px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 1.5px solid #FFE600; }
.tabs { background: #FFE600; display: flex; gap: 2px; padding: 0 20px 0; overflow-x: auto; position: relative; margin: 0; width: 100%; scrollbar-width: none; }
.tabs::-webkit-scrollbar { display: none; }
.tab { padding: 11px 18px; border-radius: 20px 20px 0 0; border: none; background-color: transparent; font-size: 13.5px; font-weight: 500; color: rgba(0,0,0,0.5); cursor: pointer; white-space: nowrap; position: relative; z-index: 2; font-family: 'Inter', sans-serif; transition: color 0.15s; }
.tab.active { background-color: #f0f0f0; color: #1A1A1A; font-weight: 700; border-radius: 20px 20px 0 0; }
.content { padding: 0; background-color: #f0f0f0; position: relative; z-index: 0; }
.content::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 80px; background: #FFE600; z-index: 0; }
.balance-card { background-color: #fff; padding: 22px 20px 20px; border-radius: 0 20px 20px 20px; margin: 0 12px 12px; box-shadow: 0 1px 6px rgba(0,0,0,0.07), 0 4px 16px rgba(0,0,0,0.05); position: relative; z-index: 1; }
.balance-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 2px; gap: 8px; width: 100%; }
.balance-amount { display: flex; align-items: center; gap: 6px; cursor: pointer; flex: 1; min-width: 0; }
.currency { font-size: 22px; font-weight: 600; color: #1A1A1A; line-height: 1; flex-shrink: 0; margin-top: 6px; }
.value { font-size: 44px; font-weight: 700; color: #1A1A1A; letter-spacing: -2px; line-height: 1; white-space: nowrap; }
.eye-btn { background: none; border: none; cursor: pointer; padding: 4px; display: flex; align-items: center; margin-left: 2px; opacity: 0.5; }
.eye-btn svg { width: 22px; height: 22px; }
.extract-link { color: #4361EE; text-decoration: none; font-size: 13px; font-weight: 600; margin-top: 6px; white-space: nowrap; }
.cdi-info { color: #00A650; font-size: 13px; font-weight: 600; margin-top: 10px; display: flex; align-items: center; gap: 4px; }
.quick-actions { display: flex; justify-content: space-between; gap: 8px; margin: 16px 0 0; }
.quick-btn { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 7px; background: #F7F7F7; border: none; border-radius: 16px; padding: 14px 6px 12px; cursor: pointer; font-size: 12px; font-weight: 600; color: #1A1A1A; font-family: 'Inter', sans-serif; transition: background 0.15s; }
.quick-btn:active { background: #EFEFEF; }
.quick-icon { width: 44px; height: 44px; border-radius: 14px; background: #EEF1FF; display: flex; align-items: center; justify-content: center; }
.quick-img { width: 24px; height: 24px; object-fit: contain; }
.pix-teal { filter: brightness(0) saturate(100%) invert(55%) sepia(60%) saturate(500%) hue-rotate(130deg); }
.promo-card { background: linear-gradient(135deg, #DCFCE7 0%, #BBF7D0 100%); padding: 16px; border-radius: 16px; margin-top: 16px; }
.promo-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
.promo-header h3 { font-size: 15px; font-weight: 700; color: #14532D; line-height: 1.3; margin: 0; }
.progress-bar { width: 100%; height: 5px; background-color: rgba(0,0,0,0.08); border-radius: 99px; margin-bottom: 12px; overflow: hidden; }
.progress-fill { width: 30%; height: 100%; background: linear-gradient(90deg, #00A650, #00C060); border-radius: 99px; }
.promo-bottom { display: flex; justify-content: space-between; align-items: flex-end; gap: 12px; }
.promo-text { font-size: 13px; color: #166534; line-height: 1.45; font-weight: 400; flex: 1; margin: 0; }
.promo-text .highlight { color: #00A650; font-weight: 700; }
.btn-primary { background: #4361EE; color: white; border: none; padding: 11px 20px; border-radius: 12px; font-size: 14px; font-weight: 700; cursor: pointer; white-space: nowrap; flex-shrink: 0; font-family: 'Inter', sans-serif; letter-spacing: -0.2px; transition: opacity 0.15s; }
.btn-primary:active { opacity: 0.85; }
.credit-section { margin: 0 12px 12px; background: #fff; border-radius: 20px; padding: 18px 16px; box-shadow: 0 1px 6px rgba(0,0,0,0.07); }
.section-title { font-size: 16px; font-weight: 700; margin-bottom: 14px; display: flex; align-items: center; gap: 8px; color: #1A1A1A; letter-spacing: -0.3px; }
.visa-logo { font-size: 13px; font-weight: 800; color: #1A1F71; letter-spacing: 1px; background: #EEF0FF; padding: 2px 7px; border-radius: 5px; }
.card-icon-img { height: 24px; width: auto; margin-left: 4px; vertical-align: middle; }
.credit-card-banner { border-radius: 14px; overflow: hidden; }
.credit-card-banner-img { width: 100%; height: auto; display: block; border-radius: 14px; }
.loan-section { margin: 0 12px 12px; background: #fff; border-radius: 20px; padding: 18px 16px; box-shadow: 0 1px 6px rgba(0,0,0,0.07); display: flex; justify-content: space-between; align-items: center; }
.link-primary { color: #4361EE; text-decoration: none; font-size: 13px; font-weight: 600; }
.credit-line-card { background: #fff; padding: 18px 16px; border-radius: 20px; display: flex; justify-content: space-between; align-items: center; gap: 14px; box-shadow: 0 1px 6px rgba(0,0,0,0.07); margin: 0 12px 12px; }
.credit-line-card p { flex: 1; font-size: 13.5px; line-height: 1.45; color: #1A1A1A; font-weight: 400; }
.bottom-nav { position: fixed; bottom: 0; left: 0; right: 0; max-width: 430px; margin: 0 auto; background-color: #fff; display: flex; justify-content: space-around; align-items: center; padding: 10px 4px 20px; border-top: 1px solid rgba(0,0,0,0.07); box-shadow: 0 -4px 20px rgba(0,0,0,0.06); z-index: 9999; }
.nav-item { display: flex; flex-direction: column; align-items: center; gap: 4px; background: none; border: none; color: #9E9E9E; cursor: pointer; font-size: 11px; font-weight: 500; padding: 2px 6px; flex: 1; position: relative; font-family: 'Inter', sans-serif; transition: color 0.15s; }
.nav-item.active { color: #4361EE; }
.nav-item.active::after { content: ''; position: absolute; top: -10px; left: 50%; transform: translateX(-50%); width: 28px; height: 3px; background: #4361EE; border-radius: 0 0 3px 3px; }
.nav-icon-img { width: 26px; height: 26px; object-fit: contain; }
.nav-center { position: relative; margin-top: -28px; }
.nav-circle { width: 60px; height: 60px; background: linear-gradient(135deg, #4DD4C0 0%, #2AADA0 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 2px; box-shadow: 0 4px 14px rgba(50,188,173,0.45); }
.pix-icon { width: 32px; height: 32px; object-fit: contain; filter: brightness(0) saturate(100%) invert(100%); }
'@
[System.IO.File]::WriteAllText($path, $css)
Write-Host "DONE - lines: $((Get-Content $path).Count)"
