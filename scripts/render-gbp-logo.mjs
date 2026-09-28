import { chromium } from 'playwright-core';
import fs from 'fs'; import path from 'path';
const root = path.join(process.env.LOCALAPPDATA, 'ms-playwright');
const dir = fs.readdirSync(root).filter(d=>d.startsWith('chromium-')).sort().pop();
const exe = path.join(root, dir, 'chrome-win64', 'chrome.exe');
const svg = fs.readFileSync('brand-logo/logo-main.svg','utf8');
const html = (bg)=>`<html><body style="margin:0;width:1080px;height:1080px;background:${bg};display:flex;align-items:center;justify-content:center">
<div style="width:860px">${svg.replace('<svg','<svg style="width:100%;height:auto;display:block"')}</div></body></html>`;
const browser = await chromium.launch({ executablePath: exe });
const page = await browser.newPage({ viewport:{width:1080,height:1080} });
for (const [name,bg] of [['logo-square-snow.png','#faf8f5'],['logo-square-linen.png','#f0ece4']]) {
  await page.setContent(html(bg)); await page.screenshot({ path: 'brand-logo/gbp/'+name });
}
await browser.close(); console.log('done');
