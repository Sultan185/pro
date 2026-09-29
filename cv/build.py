#!/usr/bin/env python3
"""Prints cv/cv-ar.html to public/Mohamed_Ashraf_Sultan_CV_AR.pdf with headless Chromium.

Needs Chromium (or Chrome), pypdf and network access for the web fonts:  python3 cv/build.py
"""
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

from pypdf import PdfReader, PdfWriter

ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / 'cv' / 'cv-ar.html'
TARGET = ROOT / 'public' / 'Mohamed_Ashraf_Sultan_CV_AR.pdf'
PAGES = 2
# If one of these is not embedded, its download failed and Chromium fell back to a system font.
FONTS = ('IBMPlexSansArabic', 'Inter', 'JetBrainsMono')

METADATA = {
    '/Title': 'محمد أشرف سلطان – مطور Full-Stack (Laravel، React، سلة)',
    '/Author': 'محمد أشرف سلطان',
    '/Subject': 'السيرة الذاتية',
    '/Keywords': 'Laravel, React, Inertia, Salla, Multi-tenant SaaS, Full-Stack Developer, سلة, مطور Full-Stack',
}


def embedded_fonts(reader):
    names = set()
    for page in reader.pages:
        for font in page.get('/Resources', {}).get('/Font', {}).values():
            font = font.get_object()
            # Chromium embeds variable fonts such as Inter as Type 3, which keeps its name in the descriptor.
            descriptor = font.get('/FontDescriptor', {})
            names.add(str(font.get('/BaseFont') or descriptor.get_object().get('/FontName', '')))
    return names


def main():
    chromium = next(filter(None, map(shutil.which, ('chromium', 'chromium-browser', 'google-chrome'))), None)
    if not chromium:
        sys.exit('Chromium or Chrome is required to print the CV.')

    with tempfile.TemporaryDirectory() as tmp:
        printed = Path(tmp) / 'cv.pdf'
        subprocess.run(
            [
                chromium, '--headless=new', '--no-sandbox', '--disable-gpu', '--no-pdf-header-footer',
                # Gives the web fonts time to arrive before the page is printed.
                '--virtual-time-budget=20000',
                f'--user-data-dir={tmp}/profile', f'--print-to-pdf={printed}', SOURCE.as_uri(),
            ],
            check=True, capture_output=True, timeout=120,
        )

        reader = PdfReader(printed)
        names = embedded_fonts(reader)
        missing = [font for font in FONTS if not any(font in name for name in names)]
        if missing:
            sys.exit(f'Fonts not embedded: {", ".join(missing)}. Check the network and run again.')
        if len(reader.pages) != PAGES:
            sys.exit(f'The CV is {len(reader.pages)} pages, expected {PAGES}. Shorten the text or adjust the spacing in cv-ar.html.')

        writer = PdfWriter(clone_from=reader)
        writer.add_metadata(METADATA)
        with open(TARGET, 'wb') as out:
            writer.write(out)

    print(f'{TARGET.relative_to(ROOT)}: {len(reader.pages)} pages, {TARGET.stat().st_size // 1024} KB')


if __name__ == '__main__':
    main()
