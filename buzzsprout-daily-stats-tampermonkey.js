// ==UserScript==
// @name         Collect Buzzsprout Daily Stats
// @version      1.0
// @description  Collect Buzzsprout Daily Stats
// @author       Thomas Geiger
// @homepage     https://github.com/duracelltomi/buzzsprout-daily-stats-tampermonkey
// @downloadURL  https://raw.githubusercontent.com/duracelltomi/buzzsprout-daily-stats-tampermonkey/main/buzzsprout-daily-stats-tampermonkey.js
// @updateURL    https://raw.githubusercontent.com/duracelltomi/buzzsprout-daily-stats-tampermonkey/main/buzzsprout-daily-stats-tampermonkey.js
// @match        https://www.buzzsprout.com/*/stats/downloads/daily*
// @icon         https://www.buzzsprout.com/favicon.ico
// @run-at       document-end
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function copyStats() {
        const search_params = new URLSearchParams(window.location.search);
        const start_date = search_params.get('start_date');

        let stats = [];
        const stat_rows = document.querySelectorAll('.stats-episode-list__row:not(.stats-episode-list__row--header)');
        stat_rows.forEach((one_row) => {
            const stat_columns = one_row.querySelectorAll('div');

            stats.push([
                start_date,
                stat_columns[0].textContent.trim(),
                stat_columns[1].textContent.trim(),
                stat_columns[3].textContent.trim()
            ].join(';'));
        });

        navigator.clipboard.writeText(stats.join("\n"));
    }

    const stat_table = document.querySelector('#breadcrumb a');

    const download_link = document.createElement('span');
    download_link.textContent = 'Copy to clipboard as CSV';
    download_link.style.textDecoration = 'underline';
    download_link.style.cursor = 'pointer';
    download_link.addEventListener('click', () => {
       copyStats();
    });
    stat_table.after(download_link);

    const separator1_node = document.createTextNode(' | ');
    stat_table.after(separator1_node);

    const next_day_link = document.createElement('span');
    next_day_link.textContent = 'Next day';
    next_day_link.style.textDecoration = 'underline';
    next_day_link.style.cursor = 'pointer';
    next_day_link.addEventListener('click', () => {
      const search_params = new URLSearchParams(window.location.search);
      const start_date = search_params.get('start_date');
      const d = new Date(start_date);
      d.setDate(d.getDate()+1);

      const prev_day = d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate();
      window.location.href = window.location.protocol + '//' + window.location.hostname + window.location.pathname + '?start_date=' + prev_day + '&end_date=' + prev_day;
    });
    stat_table.after(next_day_link);

    const separator2_node = document.createTextNode(' | ');
    stat_table.after(separator2_node);

    const prev_day_link = document.createElement('span');
    prev_day_link.textContent = 'Previous day';
    prev_day_link.style.textDecoration = 'underline';
    prev_day_link.style.cursor = 'pointer';
    prev_day_link.addEventListener('click', () => {
      const search_params = new URLSearchParams(window.location.search);
      const start_date = search_params.get('start_date');
      const d = new Date(start_date);
      d.setDate(d.getDate()-1);

      const prev_day = d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate();
      window.location.href = window.location.protocol + '//' + window.location.hostname + window.location.pathname + '?start_date=' + prev_day + '&end_date=' + prev_day;
    });
    stat_table.after(prev_day_link);

    const separator3_node = document.createTextNode(' | ');
    stat_table.after(separator3_node);
})();
