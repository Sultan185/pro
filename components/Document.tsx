import { dirOf, type Locale } from '@/lib/locale'
import { buildJsonLd } from '@/lib/seo'
import { LocaleProvider } from '@/lib/i18n'
import SmoothScroll from '@/components/SmoothScroll'
import Cursor from '@/components/Cursor'
import Preloader from '@/components/Preloader'

// Runs before any bundle. Plain ES5 so every browser can execute it.
//  1. marks JS as available and arms the watchdog that un-hides content
//  2. with ?debug in the URL, prints device info and every error on screen
const bootScript = `(function(){
var d=document.documentElement;d.classList.add('js');
setTimeout(function(){if(!window.__motion)d.classList.add('no-motion')},4000);
if(location.search.indexOf('debug')<0)return;
var box=document.createElement('pre');
box.dir='ltr';
box.style.cssText='position:fixed;left:0;right:0;bottom:0;z-index:99999;max-height:60%;overflow:auto;margin:0;padding:10px;background:#000;color:#0f0;font:11px/1.4 monospace;white-space:pre-wrap;word-break:break-all;border-top:2px solid #ff6a00';
function log(m){box.textContent+=m+'\\n';if(!box.parentNode&&document.body)document.body.appendChild(box)}
document.addEventListener('DOMContentLoaded',function(){if(!box.parentNode)document.body.appendChild(box)});
log('UA: '+navigator.userAgent);
log('screen: '+screen.width+'x'+screen.height+' viewport: '+window.innerWidth+'x'+window.innerHeight+' dpr: '+window.devicePixelRatio);
log('reduced-motion: '+(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches)+' pointer-fine: '+(window.matchMedia&&matchMedia('(pointer: fine)').matches));
window.addEventListener('error',function(e){var t=e.target||{};if(t.src||t.href)log('LOAD FAILED: '+(t.src||t.href));else log('ERROR: '+e.message+' @ '+(e.filename||'').split('/').pop()+':'+e.lineno)},true);
window.addEventListener('unhandledrejection',function(e){log('REJECTION: '+(e.reason&&(e.reason.message||e.reason)))});
setTimeout(function(){log('after 5s: motion='+(!!window.__motion)+' classes='+d.className.replace(/__variable_\\w+/g,'').replace(/\\s+/g,' ')+' layoutW='+d.scrollWidth+' preloader='+(!!document.querySelector('[data-bar]')))},5000);
})()`

type Props = { locale: Locale; fonts: string; children: React.ReactNode }

/** The whole document, shared by the root layout of each language. */
export default function Document({ locale, fonts, children }: Props) {
  return (
    <html lang={locale} dir={dirOf(locale)} className={fonts}>
      <body className="noise">
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd(locale)) }} />
        <LocaleProvider locale={locale}>
          <Preloader />
          <SmoothScroll>{children}</SmoothScroll>
          <Cursor />
        </LocaleProvider>
      </body>
    </html>
  )
}
