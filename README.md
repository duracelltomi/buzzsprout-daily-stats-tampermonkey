# Access daily stats on Buzzsproud - A Tampermonkey script

This is a Tampermonkey script that injects 3 links into the daily stat pages on Buzzsproud:

- Previous day: clicking on it will load the stats of the previous day
- Next day: clicking on it will load the stats of the next day
- Copy to clipboard as CSV: parses the currently visible stat table and copies the content to your clipboard using CSV formatting

This allows you to paste the content into any spreadsheet application. CSV will use semicolon as column separator so that comma in episode titles do not mess things when converting the CSV data into real columns in your spreadsheet app.

## Installation

1. Download and install Tampermonkey into your favorite browser: https://www.tampermonkey.net/
1. Download buzzsprout-daily-stats-tampermonkey.js from this repository
1. Open Tampermonkey in your browser and click on "Create a new script"
1. Paste the content of buzzsprout-daily-stats-tampermonkey.js into the editor and save

## Issues

Please open a ticket in this repository to report any issues. I cannot guaranty that I can respond fast but I will do my best to reply as soon as possible.
